"""Regenerate the whole brand kit from the source render of the bw mark.

Usage:
  python3 scripts/build_brand.py path/to/bw-render.jpeg
  curl -sL 'https://github.com/google/fonts/raw/main/ofl/newsreader/Newsreader%5Bopsz,wght%5D.ttf' -o /tmp/Newsreader.ttf   # only for the lockups

Everything downstream is derived here, so the mark is defined once:

  brand/*.svg, brand/*.png   the kit
  public/icon.svg            favicon, cut from the dark tile
  public/apple-touch-icon.png
  lib/brand-mark.ts          the path data the nav inlines

The source is a lit 3D render. Only the bright top face is the true silhouette:
the extruded side faces sit at mid grey and would fatten the outline, and the
generator's sparkle watermark peaks at 97, so a threshold on the face drops it.
The JPEG's edges carry compression noise that potrace would faithfully
reproduce as ragged diagonals, so the image is upsampled and then blurred below
the threshold. A symmetric blur leaves the 50% crossing where it was, which
smooths the contour without moving the edge.
"""

import os
import subprocess
import sys

import numpy as np
import potrace
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRAND = os.path.join(ROOT, 'brand')
PUBLIC = os.path.join(ROOT, 'public')

INK, PAPER, WHITE = '#0c0d0e', '#fbfaf8', '#ffffff'
UP, BLUR, THRESHOLD, TOLERANCE = 4, 3.0, 200, 2.0


def trace(src):
    """Return (path_d, width, height) with the mark normalised to 1000 wide."""
    g = Image.open(src).convert('L')
    g = g.resize((g.width * UP, g.height * UP), Image.LANCZOS)
    g = g.filter(ImageFilter.GaussianBlur(BLUR))
    mask = np.asarray(g) > THRESHOLD

    ys, xs = np.where(mask)
    mask = mask[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    h, w = mask.shape

    # potracer treats zero as the shape, so the mark is passed inverted.
    path = potrace.Bitmap(~mask).trace(
        turdsize=8 * UP, alphamax=1.0, opticurve=True, opttolerance=TOLERANCE
    )

    k = 1000.0 / w

    def p(pt):
        return f'{pt.x * k:.0f} {pt.y * k:.0f}'

    parts = []
    for curve in path:
        d = [f'M {p(curve.start_point)}']
        for seg in curve:
            d.append(
                f'L {p(seg.c)} L {p(seg.end_point)}'
                if seg.is_corner
                else f'C {p(seg.c1)} {p(seg.c2)} {p(seg.end_point)}'
            )
        parts.append(' '.join(d) + ' Z')

    return ' '.join(parts), 1000.0, h * k


def svg(vb_w, vb_h, body, label='bw'):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.0f} {vb_h:.0f}" '
        f'width="{vb_w:.0f}" height="{vb_h:.0f}" role="img" aria-label="{label}">'
        f'{body}</svg>\n'
    )


def mark(d, colour, dx=0.0, dy=0.0, scale=1.0):
    t = f' transform="translate({dx:.1f} {dy:.1f}) scale({scale:.4f})"' if (dx or dy or scale != 1) else ''
    return f'<path{t} fill="{colour}" fill-rule="evenodd" d="{d}"/>'


def write(path, text):
    open(path, 'w').write(text)
    print('  ', os.path.relpath(path, ROOT))


def png(src_svg, out, width=None, height=None):
    cmd = ['rsvg-convert']
    if width:
        cmd += ['-w', str(width)]
    if height:
        cmd += ['-h', str(height)]
    cmd += [src_svg, '-o', out]
    subprocess.run(cmd, check=True)
    print('  ', os.path.relpath(out, ROOT))


def build_lockups(d, mw, mh, font_dir):
    """Mark plus "Bob Wade", with the name converted to outlines.

    Outlining means the files carry no font dependency and render correctly for
    anyone without Newsreader installed. The tradeoff is that the text stops
    being editable, which is why this script exists.
    """
    from fontTools.misc.transform import Transform
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    from fontTools.ttLib import TTFont
    from fontTools.varLib.instancer import instantiateVariableFont

    ttf = os.path.join(font_dir, 'Newsreader.ttf')
    if not os.path.exists(ttf):
        print(f'  (skipping lockups: {ttf} not found)')
        return

    font = instantiateVariableFont(TTFont(ttf), {'wght': 400, 'opsz': 18})
    glyphs, cmap, hmtx, cap = font.getGlyphSet(), font.getBestCmap(), font['hmtx'], 1340
    text = 'Bob Wade'

    def word(scale, tracking=0.0):
        out, x = [], 0.0
        for ch in text:
            name = cmap[ord(ch)]
            pen = SVGPathPen(glyphs)
            # Font space is y-up, SVG is y-down, so the Y scale is negated.
            glyphs[name].draw(TransformPen(pen, Transform(scale, 0, 0, -scale, x, 0)))
            if (g := pen.getCommands()):
                out.append(g)
            x += hmtx[name][0] * scale + tracking
        return out, x - tracking

    pad = 40.0

    for colour, suffix in ((INK, 'black'), (WHITE, 'white')):
        # Horizontal: cap height at 34% of the mark, so the mark leads.
        scale = (mh * 0.34) / cap
        paths, w = word(scale)
        gap = mh * 0.30
        body = (
            mark(d, colour, dx=pad, dy=pad)
            + f'<g transform="translate({pad + mw + gap:.1f} {pad + mh:.1f})" fill="{colour}">'
            + ''.join(f'<path d="{g}"/>' for g in paths)
            + '</g>'
        )
        write(f'{BRAND}/bw-lockup-{suffix}.svg',
              svg(mw + gap + w + pad * 2, mh + pad * 2, body, 'Bob Wade'))

        # Stacked: name a little narrower than the mark, tracked out to sit as a
        # base. Scale is solved from the target width first so tracking stays
        # positive; solving it the other way round squeezes the letters.
        target = mw * 0.80
        base = (mh * 0.34) / cap
        _, natural = word(base)
        scale = base * (target * 0.92) / natural
        _, raw = word(scale)
        tracking = (target - raw) / (len(text) - 1)
        paths, w = word(scale, tracking)
        gap = mh * 0.22
        total_w = max(mw, w) + pad * 2
        baseline = pad + mh + gap + cap * scale
        body = (
            mark(d, colour, dx=(total_w - mw) / 2, dy=pad)
            + f'<g transform="translate({(total_w - w) / 2:.1f} {baseline:.1f})" fill="{colour}">'
            + ''.join(f'<path d="{g}"/>' for g in paths)
            + '</g>'
        )
        write(f'{BRAND}/bw-lockup-stacked-{suffix}.svg',
              svg(total_w, baseline + pad, body, 'Bob Wade'))


def main():
    src = sys.argv[1]
    font_dir = sys.argv[2] if len(sys.argv) > 2 else '/tmp'
    os.makedirs(BRAND, exist_ok=True)

    d, mw, mh = trace(src)
    print(f'  traced: {mw:.0f} x {mh:.0f}, {len(d)} bytes of path data')

    pad = 40.0
    for colour, suffix in ((INK, 'black'), (WHITE, 'white')):
        write(f'{BRAND}/bw-monogram-{suffix}.svg',
              svg(mw + pad * 2, mh + pad * 2, mark(d, colour, dx=pad, dy=pad)))

    # Tile: the mark inset in a rounded square, which is what the favicon needs.
    # 64-unit box, mark scaled to 76% of it and optically centred.
    for bg, fg, suffix in ((INK, WHITE, 'dark'), (PAPER, INK, 'light')):
        s = 64 * 0.76 / mw
        body = (f'<rect width="64" height="64" rx="13" fill="{bg}"/>'
                + mark(d, fg, dx=(64 - mw * s) / 2, dy=(64 - mh * s) / 2, scale=s))
        write(f'{BRAND}/bw-tile-{suffix}.svg', svg(64, 64, body))

    build_lockups(d, mw, mh, font_dir)

    for name in ('bw-monogram-black', 'bw-monogram-white'):
        for size in (512, 1024):
            png(f'{BRAND}/{name}.svg', f'{BRAND}/{name}-{size}.png', width=size)
    for name in ('bw-tile-dark', 'bw-tile-light'):
        for size in (512, 1024):
            png(f'{BRAND}/{name}.svg', f'{BRAND}/{name}-{size}.png', width=size, height=size)
    for name in ('bw-lockup-black', 'bw-lockup-white'):
        if os.path.exists(f'{BRAND}/{name}.svg'):
            png(f'{BRAND}/{name}.svg', f'{BRAND}/{name}-1600.png', width=1600)
    for name in ('bw-lockup-stacked-black', 'bw-lockup-stacked-white'):
        if os.path.exists(f'{BRAND}/{name}.svg'):
            png(f'{BRAND}/{name}.svg', f'{BRAND}/{name}-800.png', width=800)

    # The site's icons are the tile, not separate artwork.
    write(f'{PUBLIC}/icon.svg', open(f'{BRAND}/bw-tile-dark.svg').read())
    png(f'{BRAND}/bw-tile-dark.svg', f'{PUBLIC}/apple-touch-icon.png', width=180, height=180)

    # The nav inlines the mark so it can inherit currentColor and invert as the
    # bar crosses light and dark panels, which an <img> cannot do.
    write(
        os.path.join(ROOT, 'lib', 'brand-mark.ts'),
        '// Generated by scripts/build_brand.py. Do not edit by hand.\n'
        f'export const BW_MARK_PATH =\n  \'{d}\';\n\n'
        f'export const BW_MARK_VIEWBOX = \'0 0 {mw:.0f} {mh:.0f}\';\n',
    )


if __name__ == '__main__':
    main()
