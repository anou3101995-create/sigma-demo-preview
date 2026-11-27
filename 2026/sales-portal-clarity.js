(() => {
  const style = document.createElement('style');
  style.dataset.sigmaSalesClarity = 'true';
  style.textContent = `
    /* High-contrast light palette: no pink accents in Sales Portal or marketplace. */
    .sales-portal {
      color: #0f172a;
      --accent-violet: #0f4c81 !important;
      --accent-violet-text: #0f4c81 !important;
      --accent-purple: #0f4c81 !important;
      --accent-green: #0f766e !important;
      --accent-green-text: #0f766e !important;
      --marketplace-contrast-text: #0f172a !important;
      --marketplace-contrast-muted: #475569 !important;
      --marketplace-contrast-border: #94a3b8 !important;
      --marketplace-contrast-surface: #f8fafc !important;
      --marketplace-contrast-violet: #0f4c81 !important;
      --marketplace-contrast-price: #0f766e !important;
    }
    .sales-portal h2, .sales-portal h3, .sales-portal .card-title,
    .sales-portal .section-label, .sales-portal label { color: #111827 !important; }
    .sales-portal p, .sales-portal .muted, .sales-portal .text-muted,
    .sales-portal .role-header p { color: #334155 !important; }
    .sales-portal input, .sales-portal select, .sales-portal textarea {
      color: #111827 !important; background: #ffffff !important; border-color: #64748b !important;
    }
    .sales-portal input::placeholder, .sales-portal textarea::placeholder { color: #64748b !important; opacity: 1; }
    .sales-portal .btn-ghost { color: #1e293b !important; border-color: #64748b !important; background: #ffffff !important; }
    .sales-portal .btn-super, .sales-portal .btn-primary { background: #0f4c81 !important; color: #ffffff !important; }
    .sales-portal .card { border-color: #94a3b8 !important; box-shadow: 0 2px 8px rgba(15,23,42,.08); }
    .sales-portal [data-sigma-walkin-button] { min-height: 40px; font-weight: 800; letter-spacing: .01em; }

    /* Cart rows share this component across Customer / Marketplace, checkout, and Sales Portal. */
    .marketplace-cart-item-row {
      color: #0f172a !important;
      background: #f1f5f9 !important;
      border-bottom-color: #94a3b8 !important;
    }
    .marketplace-cart-item-row .marketplace-cart-item-details > div:first-child {
      color: #0f172a !important;
    }
    .marketplace-cart-item-row .marketplace-cart-item-meta,
    .marketplace-cart-item-row .marketplace-cart-item-list-price {
      color: #475569 !important;
    }
    .marketplace-cart-item-row .marketplace-cart-item-price {
      color: #047857 !important;
    }
    .marketplace-cart-item-row .marketplace-cart-quantity {
      background: #1f2937 !important;
      border-color: #475569 !important;
    }
    .marketplace-cart-item-row .marketplace-cart-quantity button {
      color: #ffffff !important;
    }
    .marketplace-cart-item-row .marketplace-cart-quantity input {
      color: #ffffff !important;
      background: #111827 !important;
      border-color: #64748b !important;
    }
    .marketplace-cart-item-row .marketplace-cart-item-remove {
      color: #b91c1c !important;
      opacity: 1 !important;
    }

    /* Keep the invoice preview readable on screen instead of relying on dim-on-dark inline colors. */
    .marketplace-cart-invoice,
    .online-checkout-invoice {
      color: #0f172a !important;
      background: #ffffff !important;
      border: 1px solid #64748b !important;
      box-shadow: 0 4px 14px rgba(15, 23, 42, .12) !important;
    }
    .marketplace-cart-invoice [style*="color"],
    .online-checkout-invoice [style*="color"] { color: #0f172a !important; }
    .marketplace-cart-invoice strong,
    .online-checkout-invoice strong { color: #0f172a !important; }
    .marketplace-cart-invoice .divider,
    .online-checkout-invoice .divider { background: #94a3b8 !important; }
    .marketplace-cart-invoice button,
    .online-checkout-invoice button { color: #0f172a !important; }

    /* Print the open Sigma cart as a readable A4 sheet, not as a scaled full-app screenshot. */
    @page { size: A4 portrait; margin: 8mm 10mm; }
    @media print {
      html, body { width: 210mm !important; min-height: 297mm !important; background: #fff !important; }
      body { margin: 0 !important; padding: 0 !important; color: #111827 !important; }
      body > *:not(#root), #root > *:not(.marketplace-cart-overlay) { display: none !important; }
      .marketplace-cart-overlay {
        position: static !important; inset: auto !important; display: block !important;
        width: 190mm !important; min-height: 277mm !important; background: #fff !important;
        backdrop-filter: none !important; overflow: visible !important;
      }
      .marketplace-cart-drawer {
        width: 190mm !important; max-width: none !important; min-height: 277mm !important;
        height: auto !important; background: #fff !important; color: #111827 !important;
        border: 1px solid #cbd5e1 !important; box-shadow: none !important; animation: none !important;
      }
      .marketplace-cart-header { padding: 8mm !important; border-bottom: 2px solid #0f4c81 !important; }
      .marketplace-cart-title, .marketplace-cart-header-icon { color: #0f4c81 !important; }
      .marketplace-cart-items { overflow: visible !important; padding: 6mm 8mm !important; flex: none !important; }
      .marketplace-cart-item-row { border-bottom: 1px solid #cbd5e1 !important; break-inside: avoid; }
      .marketplace-cart-item-details > div, .marketplace-cart-item-meta { color: #334155 !important; }
      .marketplace-cart-invoice {
        background: #fff !important; color: #111827 !important; border: 1px solid #64748b !important;
        box-shadow: none !important; break-inside: avoid;
      }
      .marketplace-cart-invoice [style*="color"] { color: #111827 !important; }
      .marketplace-cart-invoice .marketplace-cart-payment { break-inside: avoid; }
      .marketplace-cart-invoice .marketplace-cart-qr img {
        width: 28mm !important; height: 28mm !important;
        max-width: 28mm !important; max-height: 28mm !important;
      }
      .marketplace-cart-footer { padding: 6mm 8mm !important; background: #f8fafc !important; border-top: 2px solid #94a3b8 !important; }
      .marketplace-cart-close, .marketplace-cart-item-controls, .marketplace-cart-footer button,
      .marketplace-cart-overlay button[aria-label], .marketplace-floating-action, .no-print { display: none !important; }
      .marketplace-cart-item-image { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  `;
  document.head.appendChild(style);
})();
