# Sigma Pharma demo preview

**Demo:** https://anou3101995-create.github.io/sigma-demo-preview/2026/

This is the repository’s only demo. The root URL redirects to `/2026/`. All records are synthetic and marked `DEMO/PREVIEW`; demo changes are stored in the browser’s local storage and can be cleared with **Reset demo data**. The preview uses a browser-side mock API only. It does not call production services, use real customer data, process payments, or access production Cloudflare Workers or D1.

## Build and publish

The page is built from `anou3101995-create/sigma-pharma-system`, branch `staging/ui-review-2026-11-16`. The current Stock IN modal redesign is in source commit `e1d9f26` (`style: redesign Stock IN form as responsive modal`). Use the regular production Vite configuration so the public page does not display the Local Preview banner. Do **not** use `preview/local-source-preview.vite.config.mjs` for this deployment.

```sh
npm ci
npm run build -- --base=/sigma-demo-preview/2026/
```

Copy the generated files into the existing `2026/` directory, preserving its demo-only `mock.js` shim. For example, with both repositories checked out locally:

```sh
rsync -a --delete --exclude=mock.js dist/ /path/to/sigma-demo-preview/2026/
```

The generated `2026/index.html` must load the mock shim before the bundled app module. Insert this script immediately before the first `<script type="module" ...>` tag:

```html
<script src="/sigma-demo-preview/2026/mock.js"></script>
```

Check that the shim remains unchanged, the script precedes the app module, and the generated page contains no Local Preview banner. Keep the demo static and synthetic: never connect it to live services or production data.

Commit the updated `2026/` files on a focused branch and open a pull request into `main`. GitHub Pages publishes `main`; verify the Pages deployment and the existing URL after the pull request is merged.
