# Sigma Pharma demo preview

**Demo:** https://anou3101995-create.github.io/sigma-demo-preview/2026/

This is the repository’s only demo. The root URL redirects to `/2026/`. All records are synthetic and marked `DEMO/PREVIEW`; demo changes are stored in the browser’s local storage and can be cleared with **Reset demo data**. The preview uses a browser-side mock API only. It does not call production services, use real customer data, process payments, or access production Cloudflare Workers or D1.

## Build and publish

The application is built from the current UI-review source branch, `staging/ui-review-2026-11-16`, of `anou3101995-create/sigma-pharma-system` with its supplied preview Vite config. The Stock IN on-demand toggle in the current demo was built from source commit `51bf297` (`feat: reveal stock intake form on demand`). The build is static; keep `2026/mock.js` as the demo-only API shim and never connect this public page to live services.

```sh
npm ci
npm run build -- --config preview/local-source-preview.vite.config.mjs --base=/sigma-demo-preview/2026/
```

Copy the generated `dist/` contents into this repository’s `2026/` directory, retaining `2026/mock.js` (the local demo API shim). Commit the resulting changes to a branch and open a pull request into `main`. GitHub Pages publishes the repository’s `main` branch; merge/deployment is a separate maintainer action.
