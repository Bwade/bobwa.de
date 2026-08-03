/**
 * Character policy for anything a human will read: site copy, resume data,
 * generated HTML, and the text extracted back out of a generated PDF.
 *
 * This is an allowlist, not a blocklist. A blocklist only catches the
 * characters someone thought to ban, and the ones that actually cause trouble
 * are the ones nobody anticipated: U+2011 non-breaking hyphen, U+2009 thin
 * space, U+FE0F variation selectors, stray C1 controls. Anything outside the
 * allowlist is a violation, so the rule does not rot.
 *
 * The marks below are kept because they are deliberate typography in the
 * designed resume, not accidents. Everything else above ASCII is out.
 */

/** Printable ASCII plus the whitespace we actually use. */
const ASCII_MIN = 0x20;
const ASCII_MAX = 0x7e;

/** Deliberate design marks, allowed in prose and in the designed resume. */
export const DESIGN_MARKS = new Set([
  '·', // MIDDLE DOT, separator in the tagline and meta lines
  '→', // RIGHTWARDS ARROW, as in Salesforce→Zendesk→Jira
  '×', // MULTIPLICATION SIGN, as in 2.6× planned peak
  '®', // REGISTERED SIGN, as in ITIL®
  '•', // BULLET
  'é', // e-acute, needed by "résumé" in content.ts and the README
]);

/**
 * Named so violations read as something a person can act on. Anything not
 * listed still fails; it just gets a generic message.
 */
const OFFENDERS = new Map<string, { name: string; fix: string }>([
  ['—', { name: 'EM DASH', fix: 'rewrite the sentence, or use a comma or colon' }],
  ['–', { name: 'EN DASH', fix: "use a plain hyphen '-'" }],
  ['‒', { name: 'FIGURE DASH', fix: "use a plain hyphen '-'" }],
  ['−', { name: 'MINUS SIGN', fix: "use a plain hyphen '-'" }],
  ['‘', { name: 'LEFT SINGLE QUOTE', fix: "use a straight apostrophe '" }],
  ['’', { name: 'RIGHT SINGLE QUOTE', fix: "use a straight apostrophe '" }],
  ['“', { name: 'LEFT DOUBLE QUOTE', fix: 'use a straight double quote "' }],
  ['”', { name: 'RIGHT DOUBLE QUOTE', fix: 'use a straight double quote "' }],
  ['…', { name: 'HORIZONTAL ELLIPSIS', fix: 'use three periods' }],
  [' ', { name: 'NO-BREAK SPACE', fix: 'use a normal space, or CSS margin for spacing' }],
  [' ', { name: 'NARROW NO-BREAK SPACE', fix: 'use a normal space' }],
  [' ', { name: 'THIN SPACE', fix: 'use a normal space, or CSS letter-spacing' }],
  ['‑', { name: 'NON-BREAKING HYPHEN', fix: "use a plain hyphen '-'" }],
  ['​', { name: 'ZERO WIDTH SPACE', fix: 'delete it' }],
  ['‌', { name: 'ZERO WIDTH NON-JOINER', fix: 'delete it' }],
  ['‍', { name: 'ZERO WIDTH JOINER', fix: 'delete it' }],
  ['﻿', { name: 'ZERO WIDTH NO-BREAK SPACE (BOM)', fix: 'delete it' }],
  ['­', { name: 'SOFT HYPHEN', fix: 'delete it' }],
  ['️', { name: 'VARIATION SELECTOR-16', fix: 'delete it' }],
]);

export type Violation = {
  line: number;
  column: number;
  char: string;
  codepoint: string;
  name: string;
  fix: string;
  context: string;
};

export type ScanOptions = {
  /**
   * ASCII only. Used for the ATS resume and cover letter, where the reader is
   * a parser rather than a person and the design marks buy nothing.
   */
  strictAscii?: boolean;
};

function allowed(ch: string, strictAscii: boolean): boolean {
  if (ch === '\n' || ch === '\t') return true;
  const cp = ch.codePointAt(0) ?? 0;
  if (cp >= ASCII_MIN && cp <= ASCII_MAX) return true;
  return strictAscii ? false : DESIGN_MARKS.has(ch);
}

/** Every disallowed character in `text`, with 1-based line and column. */
export function scanText(text: string, options: ScanOptions = {}): Violation[] {
  const strictAscii = options.strictAscii ?? false;
  const out: Violation[] = [];

  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    // Iterate by code point so astral characters report as one violation.
    let column = 1;
    for (const ch of line) {
      if (!allowed(ch, strictAscii)) {
        const known = OFFENDERS.get(ch);
        const cp = ch.codePointAt(0) ?? 0;
        out.push({
          line: i + 1,
          column,
          char: ch,
          codepoint: `U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
          name: known?.name ?? 'disallowed character',
          fix: known?.fix ?? 'replace with an ASCII equivalent',
          context: line.slice(Math.max(0, column - 30), column + 30).trim(),
        });
      }
      column += ch.length;
    }
  }
  return out;
}

/**
 * HTML entities and CSS escapes that smuggle banned characters past a scan of
 * the source, then reappear in the PDF. The current designed resume's nine
 * no-break spaces got in exactly this way, as &nbsp; padding around the
 * tagline separators.
 */
const BANNED_ENTITY =
  /&(nbsp|ensp|emsp|thinsp|zwnj|zwj|mdash|ndash|hellip|lsquo|rsquo|ldquo|rdquo|shy);|&#(x?)(00a0|a0|8194|8195|8201|8203|8211|8212|8216|8217|8220|8221|8230|173);/gi;

const BANNED_CSS_ESCAPE = /\\(00a0|a0|2014|2013|2018|2019|201c|201d|2026|200b|feff|00ad)\b/gi;

/** Entity and escape violations, reported the same shape as `scanText`. */
export function scanMarkup(html: string): Violation[] {
  const out: Violation[] = [];
  const lines = html.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? '';
    for (const re of [BANNED_ENTITY, BANNED_CSS_ESCAPE]) {
      re.lastIndex = 0;
      let m: RegExpExecArray | null = re.exec(line);
      while (m !== null) {
        out.push({
          line: i + 1,
          column: m.index + 1,
          char: m[0],
          codepoint: 'entity',
          name: `escaped character ${m[0]}`,
          fix: 'write the ASCII character directly, or use CSS for spacing',
          context: line.slice(Math.max(0, m.index - 30), m.index + 30).trim(),
        });
        m = re.exec(line);
      }
    }
  }
  return out;
}

/** One-line-per-violation rendering, `path:line:col` so editors can jump to it. */
export function formatViolations(path: string, violations: Violation[]): string {
  return violations
    .map(
      (v) =>
        `${path}:${v.line}:${v.column}  ${v.codepoint} ${v.name}\n` +
        `    ${v.fix}\n` +
        `    ...${v.context}...`,
    )
    .join('\n');
}
