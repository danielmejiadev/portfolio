# Daniel Mejía — Portfolio

Personal portfolio for Daniel Mejía, Senior/Lead Software Engineer. Next.js
(App Router) + TypeScript + Tailwind CSS v4, built as a static export.

## Develop

```bash
npm install
npm run dev
```

## Build (static export)

```bash
npm run build
```

Outputs to `out/`.

## Deploy

Pushes to `main` build and deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml` (served at `danielmejiadev.github.io/portfolio`).

## Content

All copy lives in [`lib/data.ts`](lib/data.ts) — edit there, not in the
components.
