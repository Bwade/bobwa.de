/**
 * The applicant-tracking-system resume.
 *
 * Its reader is a parser, so every decision here is about extraction rather
 * than looks: one column, no tables, no images, no colour, no multi-column
 * flow, and plain hyphen bullets.
 *
 * Two rules are load-bearing and easy to break by accident:
 *
 *   - No `letter-spacing`, anywhere. Chrome writes each glyph at its own
 *     offset, so letterspaced text extracts as "E N G I N E E R I N G" and a
 *     parser reads it as separate letters. This is why the designed resume's
 *     tagline is unusable here.
 *   - ASCII only. The design marks are dropped, so the tagline's separators
 *     come out as pipes rather than middots.
 */

import type { ResumeDoc } from '../model.mts';

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const CSS = `
@page { size: 8.5in 11in; margin: 0.6in 0.7in; }
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 10pt;
  line-height: 1.38;
  color: #000;
}
h1 { font-size: 18pt; margin: 0 0 2pt; }
h2 {
  font-size: 11pt;
  margin: 14pt 0 5pt;
  padding-bottom: 2pt;
  border-bottom: 0.75pt solid #000;
}
h3 { font-size: 10.5pt; margin: 10pt 0 1pt; }
p { margin: 0 0 6pt; }
.meta { margin: 0 0 1pt; }
.role-meta { margin: 0 0 4pt; }
ul { margin: 0 0 6pt; padding-left: 0; list-style: none; }
li { margin: 0 0 3pt; padding-left: 12pt; text-indent: -12pt; }
`;

/** Company, location and dates on one line, the order a parser expects. */
function roleMeta(company: string, location: string, dates: string): string {
  return [company, location, dates].filter(Boolean).join(' | ');
}

/** The ATS variant prints its text verbatim, so expectations are the source. */
export function expectedAtsStrings(doc: ResumeDoc): string[] {
  return [
    doc.profile,
    ...doc.roles.flatMap((r) => r.groups.flatMap((g) => g.bullets.map((b) => b.text))),
  ];
}

export function renderAts(doc: ResumeDoc): string {
  const sections: string[] = [];

  sections.push(
    `<h1>${esc(doc.legalName)}</h1>`,
    `<p class="meta">${esc(doc.tagline)}</p>`,
    `<p class="meta">${esc(doc.contact.location)} | ${esc(doc.contact.email)} | ${esc(doc.contact.phone)}</p>`,
    `<p class="meta">${doc.contact.links.map(esc).join(' | ')}</p>`,
  );

  sections.push('<h2>PROFESSIONAL SUMMARY</h2>', `<p>${esc(doc.profile)}</p>`);

  sections.push('<h2>CORE COMPETENCIES</h2>');
  for (const group of doc.expertise) {
    sections.push(`<p class="meta">${esc(group.label)}: ${esc(group.items.join(', '))}</p>`);
  }

  sections.push('<h2>PROFESSIONAL EXPERIENCE</h2>');
  for (const role of doc.roles) {
    sections.push(
      `<h3>${esc(role.title)}</h3>`,
      `<p class="role-meta">${esc(roleMeta(role.company, role.location, role.dates))}</p>`,
    );
    if (role.summary) sections.push(`<p>${esc(role.summary)}</p>`);
    for (const group of role.groups) {
      // Group labels are dropped: they are a visual device on the designed
      // resume, and a parser reads them as unattributed noise between bullets.
      const items = group.bullets.map((b) => `<li>- ${esc(b.text)}</li>`).join('');
      sections.push(`<ul>${items}</ul>`);
    }
  }

  for (const section of [doc.earlier, doc.education, doc.certifications]) {
    sections.push(`<h2>${esc(section.label.toUpperCase())}</h2>`);
    for (const item of section.items) {
      const line = [item.title, item.company, item.dates].filter(Boolean).join(', ');
      sections.push(`<p class="meta">${esc(line)}</p>`);
    }
  }

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(doc.legalName)}</title>
<style>${CSS}</style></head>
<body>
${sections.join('\n')}
</body></html>`;
}
