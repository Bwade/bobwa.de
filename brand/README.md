# bw monogram

The mark is a lowercase `bw`: a stem with a bowl that closes back on the stem,
and a `w` drawn as a true zigzag rather than two arches. Black and white only.

## Files

| File | Use |
| --- | --- |
| `bw-monogram-black.svg` | The mark on its own, for light backgrounds. Vector source. |
| `bw-monogram-white.svg` | Same mark for dark backgrounds. |
| `bw-tile-dark.svg` | White mark on a near-black rounded square. This is the site favicon. |
| `bw-tile-light.svg` | Black mark on off-white, for the same use on a light surface. |
| `bw-*-512.png`, `bw-*-1024.png` | Raster exports, transparent where the mark stands alone. |

`public/icon.svg` and `public/apple-touch-icon.png` are generated from
`bw-tile-dark.svg`. Change the mark here first, then re-export those.

## Geometry

Everything is one shared path set in a 103 x 101 box:

```
stem   M 16 0 L 16 92
bowl   M 16 46 C 58 46 58 92 16 92
w      M 70 46 L 79 92 L 90 64 L 101 92 L 110 46
```

Drawn as strokes, not filled outlines, at `stroke-width: 9` with round caps and
joins. The weight is deliberate: a hairline version of this mark disappears at
16px, so it is set heavy enough to survive a favicon. To restyle, change the
stroke and re-export rather than editing the paths.

To convert the strokes to filled outlines (some vendors require it), open a
copy in a vector editor and apply Outline Stroke. Keep the stroked version as
the source, since it stays editable.

## Re-exporting

```sh
rsvg-convert -w 1024 bw-monogram-black.svg -o bw-monogram-black-1024.png
rsvg-convert -w 180 -h 180 bw-tile-dark.svg -o ../public/apple-touch-icon.png
```
