/**
 * Fails the build on "AI tell" characters in source copy.
 *
 * Usage: npm run chars
 *
 * Runs in CI, where it is the check that must never regress. It is pure Node
 * with no Chrome and no Python, so it is cheap enough to sit in the same gate
 * as typecheck and lint.
 *
 * The resume pipeline scans generated HTML and extracted PDF text separately;
 * this covers what a human types.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatViolations, scanText } from './resume/hygiene.mts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/** Directories whose text ships to a reader, plus the docs people actually read. */
const ROOTS = ['data', 'app', 'components', 'lib', 'scripts', 'applications'];
const FILES = ['README.md', 'AGENTS.md', 'NOTICE.md'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.mts', '.md', '.css', '.json']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'out', 'build', 'fonts']);

function walk(dir: string, found: string[] = []): string[] {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found; // Optional directory, e.g. applications/ before the first job.
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(full, found);
    } else if (EXTENSIONS.has(entry.name.slice(entry.name.lastIndexOf('.')))) {
      found.push(full);
    }
  }
  return found;
}

const targets = [
  ...ROOTS.flatMap((d) => walk(join(ROOT, d))),
  ...FILES.map((f) => join(ROOT, f)).filter((f) => {
    try {
      return statSync(f).isFile();
    } catch {
      return false;
    }
  }),
];

let total = 0;
for (const file of targets) {
  // hygiene.mts documents the banned characters by quoting them, so scanning
  // it would report itself. Its own tests live in the resume build.
  if (file.endsWith('hygiene.mts')) continue;

  const violations = scanText(readFileSync(file, 'utf8'));
  if (violations.length > 0) {
    total += violations.length;
    console.error(formatViolations(relative(ROOT, file), violations));
    console.error('');
  }
}

if (total > 0) {
  console.error(`${total} disallowed character${total === 1 ? '' : 's'} found.`);
  process.exit(1);
}

console.log(`chars: clean (${targets.length} files)`);
