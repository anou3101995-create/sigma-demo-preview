# Sigma Pharma Demo — Team Status

Updated: 2026-11-26

## Live demo

Main public demo for real tracking:

https://anou3101995-create.github.io/sigma-demo-preview/2026/

Repository:

https://github.com/anou3101995-create/sigma-demo-preview

## Current public-demo state

The `/2026/` demo is the verified Sales Portal build from `feat/professional-sales-portal @ a348159753a9d3208023a88bd44309cc7cf0b0c1`, restored from the earlier public-demo state at `c00088d1d8aa112855b418f91af887f3b1c6912a` and then carrying two team fixes:

- `3dbd73b` — remove the duplicate role bar in the 2026 preview.
- `3878eef` — fix demo-banner width behavior on desktop while keeping the mobile max width.

The current main branch also contains the team-status note commit `bd424450fb166110f236675900b5ad42b927b904` after safe rebase onto the team fixes. No force-push was used.

## What the demo contains

The live preview has the DEMO/PREVIEW safety banner, browser-local mock data, five role controls, and the Sales Portal with POS Walk-in, online-sales mode, and Invoice Preview. The existing Super Admin company-settings entry is `ຕັ້ງຄ່າບັນຊີບໍລິສັດ`; its receiving-payment section contains company name, BCEL One account, address, company phone, QR upload, and Save Settings. The customer payment preview is marked `PREVIEW ONLY - NO PAYMENT`.

## Scope and safety

This is a synthetic browser demo only. No production Workers, D1, real customer records, bank connection, or payment processing was changed. The existing Super Admin company-settings page is the source of truth; do not add another floating settings/contact overlay, and do not invent real bank, account, QR, or WhatsApp values. Never force-push `main`.

## Verification status

The live demo was checked after rollback and the existing Super Admin dashboard plus company-settings entry were visible. The full five-role, mobile-width, console, and network action-item audit remains a separate verification task; report each role and viewport result only after it is actually checked.

## Copy-ready team/T12 note

> Public demo live: https://anou3101995-create.github.io/sigma-demo-preview/2026/ . The verified Sales Portal content was restored to the `c00088d` state, then team fixes `3dbd73b` (remove duplicate role bar) and `3878eef` (desktop banner width) were retained. Current team-status commit: `bd424450fb166110f236675900b5ad42b927b904`. Existing Super Admin company receiving-payment settings page remains the source of truth. No production Workers/D1/customer/payment systems were touched. Full five-role, mobile-width, console, and network audit is pending/being tracked separately.
