/**
 * Inlines the vendored font subsets as base64 `@font-face` rules.
 *
 * Inlining rather than linking matters: Chrome prints the PDF as soon as
 * layout settles, and a font still in flight becomes a silent fallback to
 * Times. A data URI cannot be late.
 *
 * Regenerate the files with scripts/build_resume_fonts.py.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = fileURLToPath(new URL('./fonts/', import.meta.url));

const FACES = [
  { family: 'Inter', file: 'Inter-Regular.woff2', weight: 400 },
  { family: 'Inter', file: 'Inter-SemiBold.woff2', weight: 600 },
  { family: 'Inter', file: 'Inter-Bold.woff2', weight: 700 },
  { family: 'Newsreader', file: 'Newsreader-Regular.woff2', weight: 400 },
];

let cached: string | null = null;

export function fontFaceCss(): string {
  if (cached !== null) return cached;
  cached = FACES.map(({ family, file, weight }) => {
    const base64 = readFileSync(join(DIR, file)).toString('base64');
    return (
      `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};` +
      `font-display:block;src:url(data:font/woff2;base64,${base64}) format('woff2')}`
    );
  }).join('\n');
  return cached;
}
