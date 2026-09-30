# Portfolio

Personal portfolio site as a single static HTML page — no framework, no build step.

## Structure

- `index.html` — the page
- `support.js` — the design-component runtime (loads React from a CDN)
- `uploads/` — assets (CV PDF)
- `.nojekyll` — keeps GitHub Pages from running Jekyll

## Local preview

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server
```

## Deploy

Pushing to `main` deploys the folder to GitHub Pages via `.github/workflows/static.yml`.
