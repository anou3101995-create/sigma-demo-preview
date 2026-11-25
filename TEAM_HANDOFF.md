# Sigma Pharma Demo — Team Handoff

Updated: 2026-11-25

## Current state

Public GitHub Pages demo:

https://anou3101995-create.github.io/sigma-demo-preview/2026/

Latest correction commit: `7b74e3a8ccc74ad8ba9a3609e4b481bd9a3783b3`

The Sales Portal source build remains from `feat/professional-sales-portal @ a348159753a9d3208023a88bd44309cc7cf0b0c1`.

## Important correction

The application already has the correct company-settings entry on the `Preview Super Admin — Super Admin` page:

- Existing menu/card: `ຕັ້ງຄ່າບັນຊີບໍລິສັດ`
- Existing page heading: `ຕັ້ງຄ່າຂໍ້ມູນການຮັບເງິນຂອງບໍລິສັດ`
- Existing fields: company name, BCEL One bank account, company address, company phone, QR upload, and Save Settings
- Existing customer-preview payment section includes `PREVIEW ONLY - NO PAYMENT`

A previous update incorrectly added duplicate floating `ຕັ້ງຄ່າຮັບເງິນ` and `WhatsApp Contact Admin` controls. Those duplicate controls were removed in commit `7b74e3a`. Do not add another floating settings panel or duplicate icon.

## Current safety boundary

- Keep payment details in the existing Super Admin company-settings page.
- Do not invent or hard-code real company payment data.
- Do not connect to a bank, payment provider, Workers, D1, or production API.
- Keep the customer payment preview marked `PREVIEW ONLY - NO PAYMENT`.
- Do not touch private source `main`/`staging`, Cloudflare Workers, D1, real customer data, or payment systems without separate authorization.
- Never force-push `main`.

## Next task for the team

If WhatsApp Contact Admin is still required, add it inside the existing company-settings page and its existing customer preview/payment section. Reuse the existing page/card and visual language; do not create a fixed-position overlay. Store only demo values in local browser storage and require a manager-supplied international WhatsApp number before generating a `wa.me` link.

Acceptance checks:

1. Super Admin can open the existing company-settings entry.
2. Company receiving details remain in that existing page.
3. No duplicate floating settings/contact controls appear.
4. Customer preview keeps the DEMO/PREVIEW and NO PAYMENT safety wording.
5. No production, D1, Workers, bank, or payment requests occur.
6. Report the exact commit, Pages run, live URL, screenshots, and any missing manager-supplied data.

## Board note

The Team Board write was previously blocked by missing Google Workspace write credentials. If credentials become available, update T12 with the correction commit, Pages run, live URL, and the fact that all payment settings remain demo-only pending manager-supplied values.
