"""Vendor the static, latin-subset font cuts the resume build inlines.

Usage:
  pip install fonttools brotli
  curl -sL 'https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf' -o /tmp/Inter.ttf
  curl -sL 'https://github.com/google/fonts/raw/main/ofl/newsreader/Newsreader%5Bopsz,wght%5D.ttf' -o /tmp/Newsreader.ttf
  python3 scripts/build_resume_fonts.py /tmp

Why this exists rather than using the variable fonts directly:

Chrome cannot emit a usable sfnt for a variable-font instance, so it falls back
to Type3, re-encoding every glyph as its own drawing program. That is how the
previous designed resume ended up with 89 Type3 fonts and weighed 1.05 MB for
two pages. Pinning each weight to a static instance and subsetting to latin
produces real embedded TrueType subsets instead: the same two pages come out
around 16 KB, and the text stays extractable for applicant tracking systems.

Output lands in scripts/resume/fonts/ and is committed. Both families are
OFL, so redistribution is fine; see NOTICE.md.
"""

import os
import sys

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'resume', 'fonts')

# Printable ASCII plus the design marks the resume is allowed to use. Keeping
# the subset this tight is what holds the whole kit under 100 KB.
CHARS = ''.join(chr(c) for c in range(0x20, 0x7F)) + '·→×®•é'

# (family, source file, [(style, weight)], optical size)
JOBS = [
    ('Inter', 'Inter.ttf', [('Regular', 400), ('SemiBold', 600), ('Bold', 700)], 14),
    ('Newsreader', 'Newsreader.ttf', [('Regular', 400)], 18),
]


def build(src_dir):
    os.makedirs(OUT_DIR, exist_ok=True)
    total = 0

    for family, filename, cuts, opsz in JOBS:
        src = os.path.join(src_dir, filename)
        if not os.path.exists(src):
            raise SystemExit(f'missing {src}. See the curl commands in this file\'s docstring.')

        for style, weight in cuts:
            font = TTFont(src)
            location = {'wght': weight}
            if any(a.axisTag == 'opsz' for a in font['fvar'].axes):
                location['opsz'] = opsz

            # updateFontNames rewrites the name table from the STAT axis values,
            # which is what makes Chrome treat the cuts as distinct faces rather
            # than deduplicating them. Newsreader has no STAT entry for opsz 18,
            # so it is skipped there; a single weight needs no disambiguation.
            font = instantiateVariableFont(
                font, location, updateFontNames=(family != 'Newsreader')
            )

            options = Options()
            options.layout_features = ['*']
            options.name_IDs = ['*']
            options.notdef_outline = True
            subsetter = Subsetter(options=options)
            subsetter.populate(text=CHARS)
            subsetter.subset(font)

            font.flavor = 'woff2'
            out = os.path.join(OUT_DIR, f'{family}-{style}.woff2')
            font.save(out)

            size = os.path.getsize(out)
            total += size
            print(f'  {family}-{style}.woff2  {size // 1024} KB')

    print(f'  total {total // 1024} KB -> {os.path.relpath(OUT_DIR)}')


if __name__ == '__main__':
    build(sys.argv[1] if len(sys.argv) > 1 else '/tmp')
