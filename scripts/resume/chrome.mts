/**
 * Prints an HTML file to PDF with headless Chrome.
 *
 * Chrome is the right renderer here because it is what produced the original
 * designed resume, so CSS behaves the way the design already assumes.
 */

import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

export function resolveChrome(override?: string): string {
  const found = override ?? CANDIDATES.find((p) => existsSync(p));
  if (!found || !existsSync(found)) {
    throw new Error(
      'Chrome not found. Install Google Chrome, or pass --chrome <path>.\n' +
        `Looked in:\n${CANDIDATES.map((c) => `  ${c}`).join('\n')}`,
    );
  }
  return found;
}

export async function printToPdf(
  htmlPath: string,
  pdfPath: string,
  options: { chrome?: string; timeoutMs?: number } = {},
): Promise<void> {
  const binary = resolveChrome(options.chrome);
  const timeoutMs = options.timeoutMs ?? 60_000;

  // A dedicated profile is not optional. Without it, headless Chrome contends
  // with any running Chrome for the default profile and either reuses it or
  // refuses to start, which shows up as an intermittent hang.
  const profile = mkdtempSync(join(tmpdir(), 'resume-chrome-'));

  const args = [
    '--headless',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    // Chrome's updater can keep the process alive after the PDF is written,
    // so the component is disabled and the run is bounded by a timeout below.
    '--disable-component-update',
    '--disable-background-networking',
    `--user-data-dir=${profile}`,
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=5000',
    `--print-to-pdf=${resolve(pdfPath)}`,
    `file://${resolve(htmlPath)}`,
  ];

  try {
    await new Promise<void>((resolvePromise, reject) => {
      const child = spawn(binary, args, { stdio: ['ignore', 'ignore', 'pipe'] });
      let stderr = '';
      child.stderr?.on('data', (chunk) => {
        stderr += String(chunk);
      });

      const timer = setTimeout(() => {
        child.kill('SIGKILL');
        // The PDF is written before Chrome finishes shutting down, so a
        // timeout with the file present is a successful render.
        if (existsSync(pdfPath)) resolvePromise();
        else reject(new Error(`Chrome timed out after ${timeoutMs}ms\n${stderr}`));
      }, timeoutMs);

      child.on('error', (error) => {
        clearTimeout(timer);
        reject(error);
      });
      child.on('exit', (code) => {
        clearTimeout(timer);
        if (existsSync(pdfPath)) resolvePromise();
        else reject(new Error(`Chrome exited ${code} without writing a PDF\n${stderr}`));
      });
    });
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }
}
