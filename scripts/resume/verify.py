"""Checks a generated resume PDF, and renders a contact sheet to look at.

Usage:
  pip install pymupdf
  python3 scripts/resume/verify.py <pdf> --expect-text <doc.json> [--ats] [--pages N] [--sheet out.png]

The character scan in the Node build covers what goes in. This covers what
comes out, which is not the same thing: the previous designed resume picked up
nine no-break spaces from &nbsp; padding that was invisible in the source and
only appeared in the PDF.

The substring check is the most valuable one here. The designed layout pins
each page to a fixed height and clips overflow, which guarantees the page count
but converts "too much content" into "content silently vanished". This turns
that back into a loud, named failure.
"""

import argparse
import json
import os
import re
import sys
import unicodedata

import fitz

DESIGN_MARKS = set('·→×®•é')


def allowed(ch, ascii_only):
    if ch in '\n\t\r ':
        return True
    if 0x20 <= ord(ch) <= 0x7E:
        return True
    return False if ascii_only else ch in DESIGN_MARKS


def normalise(s):
    s = re.sub(r'\s+', ' ', s).strip()
    # A line broken at an existing hyphen extracts as "AI- augmented". That is a
    # rendering artifact, not missing content, so rejoin it before comparing.
    # Only where a letter sits immediately before the hyphen, so genuine spaced
    # hyphens such as "2013 - 2014" are left alone. The letter after may be
    # capital: "post-COVID" breaks as "post- COVID".
    return re.sub(r'(?<=[A-Za-z])-\s+(?=[A-Za-z])', '-', s)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('pdf')
    ap.add_argument('--expect-text', help='doc.json whose prose must all appear')
    ap.add_argument('--ats', action='store_true', help='require pure ASCII')
    ap.add_argument('--pages', type=int, help='exact page count')
    ap.add_argument('--max-kb', type=int)
    ap.add_argument('--sheet', help='write a contact sheet PNG here')
    args = ap.parse_args()

    doc = fitz.open(args.pdf)
    text = ''.join(p.get_text() for p in doc)
    failures = []

    if args.pages is not None and doc.page_count != args.pages:
        failures.append(f'expected {args.pages} pages, got {doc.page_count}')

    size_kb = os.path.getsize(args.pdf) // 1024
    if args.max_kb and size_kb > args.max_kb:
        failures.append(f'{size_kb} KB exceeds the {args.max_kb} KB budget (Type3 fonts?)')

    bad = sorted({c for c in text if not allowed(c, args.ats)})
    if bad:
        named = ', '.join(f'U+{ord(c):04X} {unicodedata.name(c, "?")}' for c in bad)
        failures.append(f'disallowed characters in the PDF text: {named}')

    # Type3 means Chrome could not embed a real font, which bloats the file and
    # degrades copy-paste and ATS extraction.
    types = {f[2] for i in range(doc.page_count) for f in doc.get_page_fonts(i)}
    if 'Type3' in types:
        failures.append('Type3 fonts present: use static, non-variable font instances')

    # Letterspacing writes each glyph separately, so parsers read the run as
    # individual letters. Tolerable in the designed variant, fatal in the ATS one.
    if args.ats and re.search(r'\b([A-Z] ){4,}[A-Z]\b', text):
        failures.append('letterspaced text found: an ATS reads this as separate letters')

    if args.expect_text:
        with open(args.expect_text, encoding='utf-8') as fh:
            expected = json.load(fh)
        haystack = normalise(text)
        missing = [s for s in expected if normalise(s) not in haystack]
        missing = [s[:70] + ('...' if len(s) > 70 else '') for s in missing]
        if missing:
            failures.append(
                'content missing from the PDF (clipped or dropped):\n    '
                + '\n    '.join(missing)
            )

    # Ink in the outer margin means something overflowed the page box.
    for i, page in enumerate(doc):
        rect = page.rect
        band = 18  # a quarter inch, inside most printers' non-printable edge
        for name, clip in (
            ('top', fitz.Rect(0, 0, rect.x1, band)),
            ('bottom', fitz.Rect(0, rect.y1 - band, rect.x1, rect.y1)),
            ('left', fitz.Rect(0, 0, band, rect.y1)),
            ('right', fitz.Rect(rect.x1 - band, 0, rect.x1, rect.y1)),
        ):
            pix = page.get_pixmap(clip=clip, colorspace=fitz.csGRAY)
            if pix.samples and min(pix.samples) < 200:
                failures.append(f'page {i + 1}: content in the {name} margin')

    if args.sheet:
        pages = [p.get_pixmap(matrix=fitz.Matrix(1.6, 1.6)) for p in doc]
        gap, width = 16, sum(p.width for p in pages) + 16 * (len(pages) + 1)
        height = max(p.height for p in pages) + 32
        sheet = fitz.Pixmap(fitz.csRGB, fitz.IRect(0, 0, width, height), False)
        sheet.clear_with(220)
        x = gap
        for p in pages:
            p.set_origin(x, gap)
            sheet.copy(p, p.irect)
            x += p.width + gap
        sheet.save(args.sheet)
        print(f'  contact sheet: {args.sheet}')

    label = os.path.basename(args.pdf)
    if failures:
        print(f'FAIL {label}')
        for f in failures:
            print(f'  {f}')
        sys.exit(1)

    print(f'  ok {label}: {doc.page_count} pages, {size_kb} KB, fonts {sorted(types)}')


if __name__ == '__main__':
    main()
