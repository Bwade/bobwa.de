/**
 * The designed two-page resume.
 *
 * Pages are explicit fixed-height sections rather than content that Chrome
 * fragments on its own. Chrome fragmenting a two-column layout is what put the
 * previous version's page-two content at y=0.55pt, flush against the paper
 * edge and inside the non-printable margin of most printers. Declaring the
 * pages removes the whole class of problem, at the cost of choosing where the
 * split falls, which `pageBreak` does.
 *
 * `overflow: hidden` on each page guarantees the page count. It trades
 * "content ran onto a third page" for "content was silently clipped", which is
 * only safe because verify.py checks every bullet is present in the extracted
 * text and names the ones that are not.
 */

import { fontFaceCss } from '../fonts.mts';
import type { DocGroup, DocRole, ResumeDoc } from '../model.mts';

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Typographic marks belong to the design, not the copy, so `content.ts` stays
 * plain ASCII and readable and the ATS variant stays parseable.
 */
function marks(text: string): string {
  return text
    .replace(/ \| /g, ' &#183; ') // tagline and meta separators become middots
    .replace(/(\d)x\b/g, '$1&#215;') // 2.6x -> 2.6 times
    .replace(/\bITIL\b/g, 'ITIL&#174;')
    .replace(/ to Zendesk to /g, '&#8594;Zendesk&#8594;')
    .replace(/\bSupport to Data to Core\b/g, 'Support&#8594;Data&#8594;Core');
}

/** Wraps each emphasis span in <b>. Spans are validated to occur exactly once. */
function emphasize(text: string, spans: string[]): string {
  if (spans.length === 0) return marks(esc(text));
  let out = esc(text);
  for (const span of spans) {
    const needle = esc(span);
    const at = out.indexOf(needle);
    if (at === -1) continue; // validated upstream; skip rather than corrupt
    out = `${out.slice(0, at)}<b>${needle}</b>${out.slice(at + needle.length)}`;
  }
  return marks(out);
}

const CSS = `
@page { size: 8.5in 11in; margin: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, sans-serif; color: #17191c; }

.page {
  width: 8.5in; height: 11in;
  padding: 0.4in 0.5in 0.34in;
  overflow: hidden;
  position: relative;
}
.page + .page { border-top: 0 solid transparent; }

/* Header */
.head { display: flex; justify-content: space-between; align-items: flex-start; }
.name { font-family: Newsreader, serif; font-weight: 400; font-size: 31pt; line-height: 1; margin: 0; }
.tagline {
  color: #0d5c63; font-size: 8pt; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  margin: 8pt 0 0; max-width: 4.6in; line-height: 1.4;
}
.contact { text-align: right; font-size: 8pt; line-height: 13.2pt; color: #17191c; }
.contact .muted { color: #5b616b; }
.rule { height: 1.5pt; background: #0d5c63; margin: 12pt 0 0; }

/* Metric strip */
.metrics { display: flex; border: 0.75pt solid #dcd8ce; margin-top: 8pt; }
.metric { flex: 1 1 0; padding: 6pt 9pt 7pt; }
.metric + .metric { border-left: 0.75pt solid #dcd8ce; }
.metric .value { font-family: Newsreader, serif; font-size: 12.5pt; color: #0d5c63; line-height: 1.1; }
.metric .label {
  font-size: 6.5pt; letter-spacing: 0.11em; text-transform: uppercase;
  color: #5b616b; margin-top: 2pt; line-height: 1.3;
}

/* Two columns */
.cols { display: flex; gap: 0.3in; margin-top: 11pt; }
.side { width: 2.22in; flex: 0 0 2.22in; }
.page-2 .side { width: 1.5in; flex: 0 0 1.5in; }
/* No header on page two, so it starts higher. */
.page-2 { padding-top: 0.32in; }
.page-2 .cols { margin-top: 0; }
/* Page two carries the tail of the experience section and no header, so it
   runs tighter than page one to keep the resume to two pages. */
.page-2 .role { margin-top: 7pt; }
.page-2 .role + .role { padding-top: 6pt; }
.page-2 ul.bullets li { margin-bottom: 2.1pt; }
.page-2 .glabel { margin: 5pt 0 2pt; }
.page-2 .rsummary { margin-bottom: 3.5pt; }
.main { flex: 1 1 auto; }

.sec { font-size: 8pt; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 5pt; }
.sec + .secrule { height: 0.6pt; background: #17191c; margin-bottom: 8pt; }
.side .block + .block { margin-top: 10pt; }
.side .blabel {
  color: #0d5c63; font-size: 7pt; font-weight: 600;
  letter-spacing: 0.13em; text-transform: uppercase; margin: 0 0 3pt;
}
.side .items { font-size: 8.1pt; line-height: 11.6pt; color: #17191c; margin: 0; }
.side .compact { font-size: 8.1pt; line-height: 11.4pt; margin: 0 0 5pt; }
.side .compact .t { display: block; }
.side .compact .m { display: block; color: #5b616b; }
.side .group + .group { margin-top: 9pt; }

/* Main column */
.profile { font-size: 8.5pt; line-height: 11.5pt; margin: 0; }
.role { margin-top: 9pt; }
.role + .role { border-top: 0.6pt solid #dcd8ce; padding-top: 8pt; }
.rtitle { font-size: 10.3pt; font-weight: 600; margin: 0; line-height: 1.2; }
.rmeta { font-size: 7.9pt; color: #5b616b; margin: 2pt 0 5pt; }
.rmeta b { color: #17191c; font-weight: 600; }
.rsummary { font-size: 8.15pt; line-height: 10.6pt; margin: 0 0 4pt; }
.glabel {
  color: #0d5c63; font-size: 7.2pt; font-weight: 600;
  letter-spacing: 0.11em; text-transform: uppercase; margin: 6pt 0 2.5pt;
}
ul.bullets { margin: 0; padding: 0; list-style: none; }
ul.bullets li {
  font-size: 8.15pt; line-height: 10.2pt; margin: 0 0 2.6pt;
  padding-left: 9pt; position: relative;
}
/* Drawn, not a glyph. A bullet character would fall outside the latin subset,
   so Chrome would fetch a system font for that one mark and embed it as Type3. */
ul.bullets li::before {
  content: ""; position: absolute; left: 0; top: 4pt;
  width: 3pt; height: 3pt; background: #0d5c63;
}
b { font-weight: 600; }
`;

/** Where each column stops on page one. */
export type PageBreak = { side: string; main: string };

export const DEFAULT_BREAK: PageBreak = { side: 'stack', main: 'button/scale' };

function sideBlock(label: string, items: string[]): string {
  return `<div class="group"><p class="blabel">${esc(label)}</p><p class="items">${marks(
    esc(items.join(' · ')),
  )}</p></div>`;
}

function compact(items: { title: string; company: string; dates: string }[]): string {
  return items
    .map(
      (i) =>
        `<p class="compact"><span class="t">${esc(i.title)}</span>` +
        `<span class="m">${esc([i.company, i.dates].filter(Boolean).join(' · '))}</span></p>`,
    )
    .join('');
}

function renderGroups(groups: DocGroup[]): string {
  return groups
    .map(
      (group) =>
        (group.label ? `<p class="glabel">${marks(esc(group.label))}</p>` : '') +
        `<ul class="bullets">${group.bullets
          .map((b) => `<li>${emphasize(b.text, b.emphasis)}</li>`)
          .join('')}</ul>`,
    )
    .join('');
}

function renderRole(role: DocRole, groups: DocGroup[], withHead: boolean): string {
  const head = withHead
    ? `<p class="rtitle">${esc(role.title)}</p>` +
      `<p class="rmeta"><b>${esc(role.company)}</b> &#8226; ${esc(
        [role.dates, role.location].filter(Boolean).join(' · '),
      )}</p>` +
      (role.summary ? `<p class="rsummary">${marks(esc(role.summary))}</p>` : '')
    : '';
  return `<div class="role">${head}${renderGroups(groups)}</div>`;
}

/** Splits the roles at `role/group`, returning the page-one and page-two halves. */
function splitRoles(roles: DocRole[], at: string): [DocRole[], DocRole[]] {
  const [stopRole, stopGroup] = at.split('/');
  const first: DocRole[] = [];
  const second: DocRole[] = [];
  let past = false;

  for (const role of roles) {
    if (past) {
      second.push(role);
      continue;
    }
    if (role.id !== stopRole) {
      first.push(role);
      continue;
    }
    const index = role.groups.findIndex((g) => g.id === stopGroup);
    if (index === -1) {
      first.push(role);
      past = true;
      continue;
    }
    first.push({ ...role, groups: role.groups.slice(0, index + 1) });
    const rest = role.groups.slice(index + 1);
    if (rest.length > 0) second.push({ ...role, groups: rest });
    past = true;
  }
  return [first, second];
}

/**
 * The plain text the rendered PDF should contain, after mark substitution.
 *
 * Comparing the PDF against the raw data would report false failures, because
 * `marks()` rewrites "2.6x" as "2.6 times" and so on at render time. The
 * verifier needs what was actually printed.
 */
export function expectedStrings(doc: ResumeDoc): string[] {
  const plain = (text: string): string =>
    marks(esc(text))
      .replace(/<[^>]+>/g, '')
      .replace(/&#183;/g, '\u00b7')
      .replace(/&#215;/g, '\u00d7')
      .replace(/&#174;/g, '\u00ae')
      .replace(/&#8594;/g, '\u2192')
      .replace(/&#8226;/g, '\u2022')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

  return [
    plain(doc.profile),
    ...doc.roles.flatMap((r) => r.groups.flatMap((g) => g.bullets.map((b) => plain(b.text)))),
  ];
}

export function renderDesigned(doc: ResumeDoc, pageBreak: PageBreak = DEFAULT_BREAK): string {
  // The first six toolkit groups are capability, the last three are stack.
  const expertise = doc.expertise.slice(0, 6);
  const stack = doc.expertise.slice(6);

  const [mainOne, mainTwo] = splitRoles(doc.roles, pageBreak.main);

  const header = `<div class="head">
    <div>
      <h1 class="name">${esc(doc.legalName.replace(/\s*\(.*?\)\s*/, ' '))}</h1>
      <p class="tagline">${marks(esc(doc.tagline))}</p>
    </div>
    <div class="contact">
      <div>${esc(doc.contact.location)}</div>
      <div class="muted">${esc(doc.contact.phone)}</div>
      <div>${esc(doc.contact.email)}</div>
      ${doc.contact.links.map((l) => `<div class="muted">${esc(l)}</div>`).join('')}
    </div>
  </div>
  <div class="rule"></div>
  <div class="metrics">${doc.metrics
    .map(
      (m) =>
        `<div class="metric"><div class="value">${esc(m.value)}</div>` +
        `<div class="label">${esc(m.label)}</div></div>`,
    )
    .join('')}</div>`;

  const sideOne =
    `<p class="sec">Expertise</p><div class="secrule"></div>` +
    expertise.map((g) => sideBlock(g.label, g.items)).join('') +
    `<div class="block"><p class="sec" style="margin-top:12pt">Stack</p><div class="secrule"></div>` +
    stack.map((g) => sideBlock(g.label, g.items)).join('') +
    `</div>`;

  const sideTwo =
    `<p class="sec">${esc(doc.education.label)}</p><div class="secrule"></div>` +
    compact(doc.education.items) +
    `<div class="block"><p class="sec" style="margin-top:12pt">${esc(
      doc.certifications.label,
    )}</p><div class="secrule"></div>` +
    compact(doc.certifications.items) +
    `</div><div class="block"><p class="sec" style="margin-top:12pt">${esc(
      doc.earlier.label,
    )}</p><div class="secrule"></div>${compact(doc.earlier.items)}</div>`;

  const pageOne = `<section class="page">
    ${header}
    <div class="cols">
      <aside class="side">${sideOne}</aside>
      <main class="main">
        <p class="sec">Profile</p><div class="secrule"></div>
        <p class="profile">${marks(esc(doc.profile))}</p>
        <p class="sec" style="margin-top:13pt">Experience</p><div class="secrule"></div>
        ${mainOne.map((r) => renderRole(r, r.groups, true)).join('')}
      </main>
    </div>
  </section>`;

  const continuing = mainTwo.length > 0 && mainTwo[0]?.id === mainOne.at(-1)?.id;
  const pageTwo = `<section class="page page-2">
    <div class="cols">
      <aside class="side">${sideTwo}</aside>
      <main class="main">
        ${mainTwo.map((r, i) => renderRole(r, r.groups, !(i === 0 && continuing))).join('')}
      </main>
    </div>
  </section>`;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(doc.legalName)}</title>
<style>${fontFaceCss()}
${CSS}</style></head>
<body>${pageOne}${pageTwo}</body></html>`;
}
