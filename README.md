# bobwa.de

Personal site for Bob Wade. Next.js App Router, TypeScript, Tailwind CSS,
exported as a fully static site. No server functions, no database, no paid
services.

Live at https://bobwa.de

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other commands:

```bash
npm run build   # static export into ./out
npm run lint    # eslint
```

`npm run build` writes plain HTML, CSS, and JS to `out/`. You can preview that
output with any static file server, for example `npx serve out`.

## Where to edit the copy

**Everything you will normally want to change lives in [`data/content.ts`](data/content.ts).**

That one file holds the nav labels, hero text, the four impact metrics, the About
paragraph, the four "What I do" cards, every "Selected work" entry, and all
contact links. Change it, save, and the page updates. You should not need to open
a component to reword anything.

A few notes:

- **Adding a work item:** append an object to `work.items`. Set `href: null` (or
  leave it off) for a project with no public link and the row renders without an
  arrow.
- **Icons:** `icon` values are keys into the map in
  [`components/icons.tsx`](components/icons.tsx). To use an icon that is not in
  that map yet, import it from `lucide-react`, add it to the `icons` object, then
  reference the new key from `content.ts`.
- **SEO:** `site.title`, `site.description`, and `site.url` drive the page title,
  meta description, canonical URL, OpenGraph tags, `sitemap.xml`, and the
  structured data blob.

## Where to drop the resume PDFs

Put both files in [`public/`](public/), named exactly:

| File                         | Linked from            |
| ---------------------------- | ---------------------- |
| `Robert_Wade_Resume.pdf`     | Hero "Download Résumé" |
| `Robert_Wade_Resume_ATS.pdf` | Footer "ATS résumé"    |

Anything in `public/` is served from the site root, so `public/Robert_Wade_Resume.pdf`
becomes `https://bobwa.de/Robert_Wade_Resume.pdf`. Until the files exist those two
links return a 404, and nothing else on the site is affected.

To use different filenames, update `hero.primaryCta.href` and
`contact.atsResume.href` in `data/content.ts` to match.

## Assets you can swap

| File              | What it is                    | Notes                                                         |
| ----------------- | ----------------------------- | ------------------------------------------------------------- |
| `public/og.png`   | Social share card, 1200 x 630 | Placeholder. Replace with a designed card, same name and size. |
| `public/icon.svg` | Favicon, an "RW" monogram     | Placeholder. Replace with real artwork if you want.            |

Both are referenced by path, so replacing the file is the whole job.

## Deploy to Vercel (free tier)

The repo is already wired up, so this section is mostly for reference or if you
ever need to recreate the project.

1. **Push to GitHub.**

   ```bash
   git remote add origin https://github.com/bwade/bobwa.de.git
   git push -u origin main
   ```

2. **Import to Vercel.** Go to https://vercel.com/new, pick the GitHub repo, and
   import it. Vercel detects Next.js on its own. Leave the build command, output
   directory, and install command at their defaults, and leave environment
   variables empty. This site does not use any.

3. **Deploy.** The first build takes about a minute. You get a URL like
   `bobwa-de.vercel.app` immediately.

4. **Every push after that deploys itself.** A push to `main` goes to production.
   A push to any other branch, or a pull request, gets its own preview URL.

### Adding a custom domain later

If you are starting from a fresh Vercel project and want to attach a domain:

1. In the Vercel project, open **Settings > Domains** and add the domain, for
   example `bobwa.de`. Add `www.bobwa.de` too if you want the www redirect.
2. Vercel shows the DNS records it wants. For a domain whose DNS lives in
   Route 53, that is normally:
   - apex `bobwa.de` to an `A` record pointing at `76.76.21.21`
   - `www.bobwa.de` to a `CNAME` pointing at the value Vercel shows you
3. Add those records in the Route 53 hosted zone for the domain. Leave the
   existing `MX`, `TXT`, and `NS` records alone. Touching the `MX` records will
   break email for the domain.
4. Wait for Vercel to verify. TLS certificates are issued and renewed
   automatically, at no cost.

## Cost

Nothing here requires a paid plan:

- The site is a static export. Every route is prerendered HTML, so there are no
  serverless function invocations, no edge middleware, and no ISR revalidations.
- `images.unoptimized` is set, so the Vercel Image Optimization API is never
  called.
- No database, no KV, no Blob storage, no cron jobs, no analytics add-on.
- Fonts are self hosted by `next/font`, downloaded at build time, so there is no
  third party font request at runtime.

Bandwidth and build minutes for a site this size sit far inside the free
allowance.

## Project layout

```
app/
  layout.tsx      fonts, metadata, OpenGraph, no-flash theme script
  page.tsx        section order, JSON-LD structured data
  globals.css     design tokens (colors, fonts) and base styles
  robots.ts       generates /robots.txt at build time
  sitemap.ts      generates /sitemap.xml at build time
components/       one file per section, plus SiteNav, ThemeToggle, icons
data/content.ts   ALL COPY
public/           resume PDFs, og.png, icon.svg
```

### Design tokens

Colors and fonts are CSS custom properties at the top of
[`app/globals.css`](app/globals.css), exposed to Tailwind through `@theme inline`.
Light and dark values are defined separately, so changing the accent color in
both places is a two line edit.

Dark mode is class based. An inline script in `app/layout.tsx` applies the stored
or system preference before first paint, so there is no flash of the wrong theme.
The toggle writes to `localStorage`. Until someone clicks it, the site follows the
operating system setting.
