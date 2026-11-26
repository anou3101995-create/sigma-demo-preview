(() => {
  const style = document.createElement('style');
  style.dataset.sigmaSalesClarity = 'true';
  style.textContent = `
    .sales-portal { color: #0f172a; }
    .sales-portal h2, .sales-portal h3, .sales-portal .card-title,
    .sales-portal .section-label, .sales-portal label { color: #111827 !important; }
    .sales-portal p, .sales-portal .muted, .sales-portal .text-muted,
    .sales-portal .role-header p { color: #334155 !important; }
    .sales-portal input, .sales-portal select { color: #111827 !important; background: #ffffff !important; }
    .sales-portal input::placeholder { color: #64748b !important; opacity: 1; }
    .sales-portal .btn-ghost { color: #1e293b !important; border-color: #94a3b8 !important; }
    .sales-portal .card { border-color: #94a3b8; }
    .sales-portal [data-sigma-walkin-button] { min-height: 40px; font-weight: 800; letter-spacing: .01em; }
  `;
  document.head.appendChild(style);
})();
