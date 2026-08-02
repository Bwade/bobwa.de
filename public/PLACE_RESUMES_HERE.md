# Drop your resume PDFs in this folder

Two files, named exactly this way. The site links to these paths directly:

| File                         | Linked from            | What it is                                  |
| ---------------------------- | ---------------------- | ------------------------------------------- |
| `Robert_Wade_Resume.pdf`     | Hero "Download Résumé" | The designed / formatted version.           |
| `Robert_Wade_Resume_ATS.pdf` | Footer "ATS résumé"    | The plain, single column, ATS safe version. |

Anything in `public/` is served from the site root, so `public/Robert_Wade_Resume.pdf`
becomes `https://bobwa.de/Robert_Wade_Resume.pdf`.

Until the files are here those two buttons return a 404. Nothing else on the site
depends on them.

If you want different filenames, change them in `data/content.ts` under
`hero.primaryCta.href` and `contact.atsResume.href`, then rename the files to match.

You can delete this file once the PDFs are in place.
