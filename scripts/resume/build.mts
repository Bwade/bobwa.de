/**
 * Builds the resume PDFs.
 *
 * Usage:
 *   npm run resume                      canonical pair, into public/
 *   npm run resume -- --app <slug>      tailored set, into build/resume/<slug>/
 *   npm run resume -- --only ats        one document
 *   npm run resume -- --html-only       skip Chrome, for CSS iteration
 *
 * Tailored output never reaches public/. This repo is public and public/ is
 * deployed, so a cover letter naming an employer must not be able to land
 * there by accident; the output directory is chosen here, not by the caller.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { printToPdf } from './chrome.mts';
import { formatViolations, scanMarkup, scanText } from './hygiene.mts';
import { allProse, buildDoc, type ResumeDoc, type Tailor } from './model.mts';
import { renderAts } from './render/ats.mts';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));

type Kind = 'designed' | 'ats' | 'letter';

type Args = {
  app: string | null;
  only: Kind[];
  htmlOnly: boolean;
  json: boolean;
  chrome: string | undefined;
};

function parseArgs(argv: string[]): Args {
  const args: Args = { app: null, only: [], htmlOnly: false, json: false, chrome: undefined };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    if (flag === '--app' && value) {
      args.app = value;
      i += 1;
    } else if (flag === '--only' && value) {
      args.only.push(value as Kind);
      i += 1;
    } else if (flag === '--chrome' && value) {
      args.chrome = value;
      i += 1;
    } else if (flag === '--html-only') {
      args.htmlOnly = true;
    } else if (flag === '--json') {
      args.json = true;
    } else if (flag) {
      throw new Error(`unknown argument: ${flag}`);
    }
  }
  return args;
}

/** Fails the build on disallowed characters, in the data and in the markup. */
function checkDocument(label: string, doc: ResumeDoc, html: string, strictAscii: boolean): void {
  const prose = scanText(allProse(doc), { strictAscii });
  const markup = scanMarkup(html);
  if (prose.length === 0 && markup.length === 0) return;

  if (prose.length > 0) console.error(formatViolations(`${label} (content)`, prose));
  if (markup.length > 0) console.error(formatViolations(`${label} (markup)`, markup));
  throw new Error(`${label}: ${prose.length + markup.length} disallowed characters`);
}

async function emit(
  name: string,
  html: string,
  pdfDir: string,
  workDir: string,
  args: Args,
): Promise<string | null> {
  // The HTML is an intermediate and stays under build/. Only the PDF is
  // allowed into public/, which is deployed.
  mkdirSync(workDir, { recursive: true });
  const htmlPath = join(workDir, `${name}.html`);
  writeFileSync(htmlPath, html, 'utf8');

  if (args.htmlOnly) {
    console.log(`  wrote ${htmlPath.replace(ROOT, '')}  (--html-only)`);
    return null;
  }

  mkdirSync(pdfDir, { recursive: true });
  const pdfPath = join(pdfDir, `${name}.pdf`);
  await printToPdf(htmlPath, pdfPath, args.chrome ? { chrome: args.chrome } : {});
  return pdfPath;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const kinds: Kind[] = args.only.length > 0 ? args.only : ['designed', 'ats'];

  let tailor: Tailor | undefined;
  if (args.app !== null) {
    const loaded = (await import(join(ROOT, 'applications', `${args.app}.mts`))) as {
      default: Tailor;
    };
    tailor = loaded.default;
  }

  const doc = buildDoc(tailor);
  const workDir = join(ROOT, 'build', 'resume', tailor?.slug ?? 'canonical');
  const outDir = tailor ? workDir : join(ROOT, 'public');

  // Always under build/, never public/: doc.json is a verification artifact,
  // and anything written to public/ is deployed to bobwa.de.
  if (args.json) {
    mkdirSync(workDir, { recursive: true });
    writeFileSync(join(workDir, 'doc.json'), JSON.stringify(doc, null, 2), 'utf8');
    console.log(`  wrote build/resume/${tailor?.slug ?? 'canonical'}/doc.json`);
  }

  const written: string[] = [];

  if (kinds.includes('ats')) {
    const html = renderAts(doc);
    checkDocument('ats', doc, html, true);
    const name = tailor ? 'resume-ats' : 'Robert_Wade_Resume_ATS';
    const pdf = await emit(name, html, outDir, workDir, args);
    if (pdf) written.push(pdf);
  }

  if (kinds.includes('designed')) {
    console.log('  designed: not implemented yet');
  }

  for (const path of written) {
    console.log(`  wrote ${path.replace(ROOT, '')}`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
