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

The current public `main` also contains the verified demo-only Contact Admin settings adapter:

- `8806966` — add a WhatsApp Contact Admin field inside the existing Super Admin company receiving-payment settings page.
- `d82870a` — make the adapter detect the existing settings heading when it includes an icon.

No force-push was used. The successful Pages run for the latest commit is `45777754136`:
https://github.com/anou3101995-create/sigma-demo-preview/actions/runs/45777754136

## What the demo contains

The live preview has the DEMO/PREVIEW safety banner, browser-local mock data, five role controls, and the Sales Portal with POS Walk-in, online-sales mode, and Invoice Preview. The existing Super Admin company-settings entry is `ຕັ້ງຄ່າບັນຊີບໍລິສັດ`; its receiving-payment section contains company name, BCEL One account, address, company phone, QR upload, Save Settings, and the new `WhatsApp Contact Admin (International)` field. The customer payment preview is marked `PREVIEW ONLY - NO PAYMENT`.

The WhatsApp value is intentionally blank by default and is stored only in this browser demo's localStorage. When configured, the existing Contact Admin modal keeps the company phone for the phone action and uses the configured WhatsApp number for its WhatsApp link. When blank, the WhatsApp action does not use the old fake fallback number and instead asks the demo user to configure it.

## Verification status

Verified live after Pages run `45777754136`:

- Existing Super Admin company receiving-payment settings page shows the new WhatsApp field; no second settings page or new floating control was added.
- A demo-only configured value `8562099999999` was used for functional verification; it produced `https://wa.me/8562099999999` in the existing Contact Admin modal. No real company contact value was committed.
- Existing Customer / Marketplace Contact Admin control and modal remain in place.
- The full five-role, mobile-width, console, and network action-item audit remains a separate verification task; report each role and viewport result only after it is actually checked.

## Scope and safety

This is a synthetic browser demo only. No production Workers, D1, real customer records, bank connection, or payment processing was changed. The existing Super Admin company-settings page is the source of truth; do not add another floating settings/contact overlay, and do not invent real bank, account, QR, phone, or WhatsApp values. Never force-push `main`.

## Copy-ready team/T12 note

> Public demo live: https://anou3101995-create.github.io/sigma-demo-preview/2026/ . Latest public commits `8806966` and `d82870a` add and verify a WhatsApp Contact Admin field inside the existing Super Admin company receiving-payment settings page. The existing Contact Admin modal uses configured company phone for calls and configured WhatsApp for WhatsApp; blank WhatsApp no longer falls back to fake `2055555555`. Successful Pages run: https://github.com/anou3101995-create/sigma-demo-preview/actions/runs/45777754136 . No production Workers/D1/customer/payment systems were touched. Full five-role, mobile-width, console, and network audit is pending/being tracked separately.
