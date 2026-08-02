# bw monogram

A ligature of `b` and `w`: the bowl of the b flows straight into the first
stroke of the w, so the two letters share an edge rather than sitting side by
side. Black and white only.

## Regenerating

Everything here is generated from the source render of the mark, so the
geometry is defined in exactly one place:

```sh
# Only needed for the lockups, which set the name in Newsreader.
curl -sL 'https://github.com/google/fonts/raw/main/ofl/newsreader/Newsreader%5Bopsz,wght%5D.ttf' -o /tmp/Newsreader.ttf

python3 scripts/build_brand.py path/to/bw-render.jpeg /tmp
```

That writes every file below, plus `public/icon.svg`,
`public/apple-touch-icon.png` and `lib/brand-mark.ts`. Do not hand-edit any of
them; change the source or the script and re-run.

## Files

| File                            | Use                                                                       |
| ------------------------------- | ------------------------------------------------------------------------- |
| `bw-monogram-black.svg`         | The mark on its own, for light backgrounds. Vector source.                |
| `bw-monogram-white.svg`         | Same mark for dark backgrounds.                                           |
| `bw-tile-dark.svg`              | White mark on a near-black rounded square. This is the site favicon.      |
| `bw-tile-light.svg`             | Black mark on off-white, for the same use on a light surface.             |
| `bw-lockup-*.svg`               | Horizontal: mark, then "Bob Wade". The default for a signature or header. |
| `bw-lockup-stacked-*.svg`       | Mark over the name. For square-ish space: avatars, letterhead.            |
| `bw-*-512.png`, `bw-*-1024.png` | Raster exports, transparent where the mark stands alone.                  |

## How the trace works

The source is a lit 3D render, not flat artwork, so the script cannot simply
threshold it:

- Only the bright top face is the true silhouette. The extruded side faces sit
  at mid grey and would fatten the outline, so the threshold is set above them.
- The generator's sparkle watermark peaks at 97, well under that threshold, so
  it drops out on its own.
- JPEG compression leaves noise along the edges that a tracer reproduces
  faithfully as ragged diagonals. The image is upsampled and then blurred
  _before_ thresholding. A symmetric blur leaves the 50% crossing where it was,
  so this smooths the contour without moving the edge.

If you ever get a cleaner source (flat vector, or a PNG with no lighting), use
it: the trace is a reconstruction, and a real vector beats it.

## Lockups

The name is converted to outlines, so the files carry no font dependency and
render correctly for anyone without Newsreader installed. The tradeoff is that
the text is no longer editable as text, which is what the build script is for.

## The nav does not use these files

`components/icons.tsx` inlines the mark from `lib/brand-mark.ts` so it inherits
`currentColor` and inverts as the bar crosses light and dark panels, which an
`<img>` cannot do. The name beside it stays live text rather than artwork. Both
that file and everything here come from the same generator, so they cannot
drift.
