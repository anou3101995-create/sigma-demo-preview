# Sigma Pharma Demo — Team Handoff

Updated: 2026-11-25

## Current state

The public GitHub Pages demo is live at:

https://anou3101995-create.github.io/sigma-demo-preview/2026/

Latest public-demo commit: `6ecccf93b5610a1407f7db128a5f9b005be77a35`

The selected source UI was built from `feat/professional-sales-portal @ a348159753a9d3208023a88bd44309cc7cf0b0c1`. The preceding Pages deployment for the Sales Portal was successful; this Contact Admin/payment-settings change is the next public-demo update.

## Completed in this update

- Added a visible `WhatsApp Contact Admin` button.
- Added the Lao contact message:
  > ສະບາຍດີ ຫາກທ່ານມີຄຳຖາມ ສາມາດຕິດຕໍ່ຜູ້ດູແລລະບົບໄດ້ເລີຍ.
- Added `ຕັ້ງຄ່າຮັບເງິນ` with fields for company phone, WhatsApp Contact Admin, bank name, account name, account number, and Contact Admin message.
- Settings are demo-only and persist in browser `localStorage`; no real payment processing is implemented.
- If WhatsApp is blank, the demo asks the operator to configure it before opening WhatsApp.
- The demo explicitly warns `DEMO ONLY`; it does not connect to a bank, payment provider, Workers, D1, or production API.

## Still required from the manager

Do not invent or hard-code real payment details. Before entering company data, obtain and verify:

1. Company contact phone.
2. WhatsApp Contact Admin number in international format, such as `85620xxxxxxx`.
3. Bank name.
4. Company account name.
5. Company account number.
6. Approved QR receiving image or QR data, if the manager wants it shown.

## Acceptance checks for the next AI/team member

1. Open the public demo and verify `WhatsApp Contact Admin` and `ຕັ້ງຄ່າຮັບເງິນ` are visible.
2. Verify the settings form retains only local demo values in browser storage.
3. Verify the WhatsApp action uses `https://wa.me/<international-number>?text=<encoded-message>` only after a number is configured.
4. Verify no payment, bank, D1, Workers, or production API call is made.
5. Keep Sales Portal, POS Walk-in, online-sales mode, Invoice Preview, role buttons, and DEMO/PREVIEW safety wording intact.
6. Do not touch private source `main`/`staging`, Cloudflare Workers, D1, real customer data, or payment systems unless a separate manager authorization explicitly changes the scope.
7. Never force-push `main`.

## Handoff note

The Team Board write was previously blocked by missing Google Workspace write credentials. If credentials become available, update the T12 row with the latest commit, Pages run URL, live URL, and the fact that the payment/contact feature is demo-only pending manager-supplied real values.
