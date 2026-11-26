# Sigma Pharma Demo — Team Status

Updated: 2026-11-26

## Live demo

Main public demo for real tracking:

https://anou3101995-create.github.io/sigma-demo-preview/2026/

Repository:

https://github.com/anou3101995-create/sigma-demo-preview

## Current public-demo state

- `/2026/` content is restored to the verified Sales Portal build from `feat/professional-sales-portal @ a348159753a9d3208023a88bd44309cc7cf0b0c1`.
- The intended restored tree is the earlier public-demo state at `c00088d1d8aa112855b418f91af887f3b1c6912a`.
- Rollback was performed with normal revert commits; no force-push was used.
- Rollback head: `c0124b080486bd07bfdf3419638c7e52132fd501`.
- Latest rollback Pages run: `45556942761` — Success.

## What the demo contains

- DEMO/PREVIEW safety banner and browser-local mock data.
- Role buttons: Super Admin, Admin, Sales, IT Support, Customer / Marketplace.
- Sales Portal with POS Walk-in, online-sales mode, and Invoice Preview.
- Existing Super Admin company settings page: `ຕັ້ງຄ່າບັນຊີບໍລິສັດ`.
- Existing receiving-payment settings section with company name, BCEL One account, address, company phone, QR upload, and Save Settings.
- Customer payment preview marked `PREVIEW ONLY - NO PAYMENT`.

## Scope and safety

- This is a synthetic browser demo only.
- No production Workers, D1, real customer records, bank connection, or payment processing was changed.
- Do not add another floating settings/contact overlay; the company payment settings already belong in the existing Super Admin page.
- Do not invent real bank, account, QR, or WhatsApp values.
- Do not force-push `main`.

## Verification status

The live demo was checked after rollback and the existing Super Admin dashboard plus company-settings entry were visible. The full five-role/mobile/network action-item audit remains a separate verification task; report each role and viewport result only after it is actually checked.

## Copy-ready team/T12 note

> Public demo restored to the verified Sales Portal tree (`c00088d` content) via normal rollback commits. Latest rollback head `c0124b0`; Pages run `45556942761` succeeded. Live demo: https://anou3101995-create.github.io/sigma-demo-preview/2026/ . Existing Super Admin company receiving-payment settings page remains the source of truth. No production Workers/D1/customer/payment systems were touched. Full five-role, mobile-width, console, and network audit is still pending/being tracked separately.
