"""Regenerate brand/bw-lockup-*.svg.

Usage:
  curl -sL 'https://github.com/google/fonts/raw/main/ofl/newsreader/Newsreader%5Bopsz,wght%5D.ttf' -o /tmp/Newsreader.ttf
  python3 scripts/build_lockups.py /tmp brand

The font is not vendored here: it is only needed to regenerate the lockups, and
the committed SVGs already carry the letterforms as outlines.

Composes the bw monogram with "Bob Wade" set in Newsreader.

The wordmark is converted to outlines so the file carries no font dependency:
anyone opening it gets the right letterforms without Newsreader installed.
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

SRC, OUT = sys.argv[1], sys.argv[2]
TEXT, CAP = 'Bob Wade', 1340
MONO_W, MONO_H, MONO_ASC, MONO_BASE = 103.0, 101.0, 92.0, 96.5

font = instantiateVariableFont(TTFont(f'{SRC}/Newsreader.ttf'), {'wght': 400, 'opsz': 18})
glyphs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']

MONO = (
    '<g transform="translate(-11.5 4.5)" fill="none" stroke="{c}" stroke-width="9"'
    ' stroke-linecap="round" stroke-linejoin="round">'
    '<path d="M 16 0 L 16 92"/>'
    '<path d="M 16 46 C 58 46 58 92 16 92"/>'
    '<path d="M 70 46 L 79 92 L 90 64 L 101 92 L 110 46"/>'
    '</g>'
)

def word(scale, tracking=0.0):
    """Outlined glyphs on a baseline at y=0. Returns (paths, advance width)."""
    out, x = [], 0.0
    for ch in TEXT:
        name = cmap[ord(ch)]
        pen = SVGPathPen(glyphs)
        # Font space is y-up, SVG is y-down, so the Y scale is negated.
        glyphs[name].draw(TransformPen(pen, Transform(scale, 0, 0, -scale, x, 0)))
        if (d := pen.getCommands()):
            out.append(d)
        x += hmtx[name][0] * scale + tracking
    return out, x - tracking

def svg(vb_w, vb_h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.1f} {vb_h:.1f}" '
            f'width="{vb_w:.0f}" height="{vb_h:.0f}" role="img" aria-label="Bob Wade">'
            f'{body}</svg>\n')

def horizontal(colour):
    # Cap height at 46% of the monogram's ascender, so the mark leads.
    scale = (MONO_ASC * 0.46) / CAP
    paths, w = word(scale)
    gap, pad = 30.0, 6.0
    body = (f'<g transform="translate({pad} 0)">{MONO.format(c=colour)}'
            f'<g transform="translate({MONO_W + gap:.1f} {MONO_BASE:.1f})" fill="{colour}">'
            + ''.join(f'<path d="{d}"/>' for d in paths) + '</g></g>')
    return svg(MONO_W + gap + w + pad * 2, MONO_H, body)

def stacked(colour):
    # Name set a touch wider than the mark. Scale is derived from that target
    # first and tracking takes up the remainder, so tracking is always positive:
    # solving it the other way round squeezes the letters together.
    target = MONO_W * 1.30
    base_scale = (MONO_ASC * 0.46) / CAP
    _, natural = word(base_scale)
    scale = base_scale * (target * 0.92) / natural
    _, raw = word(scale)
    tracking = (target - raw) / (len(TEXT) - 1)
    paths, w = word(scale, tracking)
    gap, pad = 22.0, 6.0
    total_w = max(MONO_W, w) + pad * 2
    baseline = MONO_H + gap + CAP * scale
    body = (f'<g transform="translate({(total_w - MONO_W) / 2:.1f} 0)">{MONO.format(c=colour)}</g>'
            f'<g transform="translate({(total_w - w) / 2:.1f} {baseline:.1f})" fill="{colour}">'
            + ''.join(f'<path d="{d}"/>' for d in paths) + '</g>')
    return svg(total_w, baseline + pad, body)


for kind, fn in (('lockup', horizontal), ('lockup-stacked', stacked)):
    for name, colour in (('black', '#0c0d0e'), ('white', '#ffffff')):
        p = f'{OUT}/bw-{kind}-{name}.svg'
        open(p, 'w').write(fn(colour))
        print('  wrote', p)
