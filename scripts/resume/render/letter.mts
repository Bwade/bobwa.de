/**
 * The cover letter.
 *
 * Shares the resume's letterhead so the two read as one application rather
 * than two documents that happen to arrive together.
 *
 * The body is per application and lives in the gitignored applications/
 * directory, never in content.ts. A letter naming a target employer must not be
 * committed to a public repo, and it is not site copy.
 */

import { content } from '../../../data/content.ts';
import { fontFaceCss } from '../fonts.mts';
import type { ResumeDoc, Tailor } from '../model.mts';

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const CSS = `
@page { size: 8.5in 11in; margin: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, sans-serif; color: #17191c; }

.page { width: 8.5in; height: 11in; padding: 0.55in 0.75in 0.6in; overflow: hidden; }

.head { display: flex; justify-content: space-between; align-items: flex-start; }
.name { font-family: Newsreader, serif; font-weight: 400; font-size: 26pt; line-height: 1; margin: 0; }
.tagline {
  color: #0d5c63; font-size: 7.5pt; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase; margin: 7pt 0 0; max-width: 4in; line-height: 1.4;
}
.contact { text-align: right; font-size: 8.5pt; line-height: 13pt; }
.contact .muted { color: #5b616b; }
.rule { height: 1.5pt; background: #0d5c63; margin: 11pt 0 0; }

.meta { font-size: 9.5pt; line-height: 14pt; margin: 26pt 0 0; color: #5b616b; }
.to { font-size: 9.5pt; line-height: 14pt; margin: 14pt 0 0; }
.to .co { font-weight: 600; color: #17191c; }
.salutation { font-size: 10pt; margin: 20pt 0 0; }
.body p { font-size: 10pt; line-height: 15.5pt; margin: 11pt 0 0; }
.signoff { font-size: 10pt; margin: 22pt 0 0; }
.signature { font-family: Newsreader, serif; font-size: 15pt; margin: 6pt 0 0; }
`;

export function renderLetter(doc: ResumeDoc, tailor: Tailor): string {
  const letter = tailor.letter;
  if (!letter) throw new Error(`${tailor.slug}: no letter block in the application file`);

  const paragraphs = letter.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(doc.legalName)} cover letter</title>
<style>${fontFaceCss()}
${CSS}</style></head>
<body><section class="page">
  <div class="head">
    <div>
      <h1 class="name">${esc(doc.legalName.replace(/\s*\(.*?\)\s*/, ' '))}</h1>
      <p class="tagline">${esc(doc.tagline.replace(/ \| /g, ' · '))}</p>
    </div>
    <div class="contact">
      <div>${esc(doc.contact.email)}</div>
      <div class="muted">${esc(doc.contact.phone)}</div>
      <div class="muted">${esc(doc.contact.location)}</div>
    </div>
  </div>
  <div class="rule"></div>

  <p class="meta">${esc(letter.date)}</p>
  <p class="to"><span class="co">${esc(tailor.company)}</span><br>Re: ${esc(tailor.role)}</p>
  <p class="salutation">${esc(letter.salutation)}</p>
  <div class="body">${paragraphs}</div>
  <p class="signoff">${esc(content.resume.letter.signoff)}</p>
  <p class="signature">${esc(content.resume.letter.signature)}</p>
</section></body></html>`;
}

/** What verify.py asserts is present in the printed letter. */
export function expectedLetterStrings(tailor: Tailor): string[] {
  return tailor.letter ? [...tailor.letter.paragraphs] : [];
}
