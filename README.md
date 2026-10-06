# stephenanigbo.com
Static personal website for Stephen Chinedu Anigbo, MBBS.

## Local preview
Open `index.html` in a browser, or run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages
1. Create a GitHub repository (recommended: `stephenanigbo.com`).
2. Upload all files in this folder to the repository root.
3. In GitHub: Settings → Pages → Deploy from a branch → `main` / root.
4. Once the default GitHub Pages URL works, add `stephenanigbo.com` under Custom domain.
5. Configure Namecheap DNS only after GitHub shows the required records.
6. Enable “Enforce HTTPS” after DNS resolves.

## Adding articles
Bylined articles go in `writing.html` under "Selected writing". A commented template line shows the format.

## v6 changes
New studio portrait (background removed and re-lit onto the site's black so it blends into the page), regenerated share image, Instrument Serif display face, sticky glass header that hides on scroll-down, reading-progress hairline, discipline ticker, cursor spotlight on cards, blur-in reveals, count-up stats, word-by-word motto, cross-page view transitions, film grain, custom 404, web manifest. AI-readability: expanded JSON-LD graph (WebSite, Person, ProfilePage, WebPage + BreadcrumbList), `llms.txt` rewritten and `llms-full.txt` added (full site content as Markdown), `robots.txt` explicitly welcomes AI crawlers, `<time>` markup on dates, `rel="alternate"` links to the LLM files on every page. All motion still respects `prefers-reduced-motion`.

## v5 changes
Retouched portrait (borders removed, shadows lifted, WebP version), headline load animation with gold glint and portrait scan line, share image and favicons, canonical/OG tags on every page, expanded Medicine, Technology and Writing pages, page-to-page navigation, mobile hero fixes. All motion is disabled for visitors who prefer reduced motion.
