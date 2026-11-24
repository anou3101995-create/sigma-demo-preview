(function () {
  var users = {
    super: { id: 910001, name: 'Preview Super Admin', username: 'preview-super', email: 'preview-super@example.invalid', role: 'super', phone: '0200000000' },
    admin: { id: 910003, name: 'Preview Admin', username: 'preview-admin', email: 'preview-admin@example.invalid', role: 'admin', phone: '0200000002' },
    sales: { id: 910004, name: 'Preview Sales', username: 'preview-sales', email: 'preview-sales@example.invalid', role: 'sales', phone: '0200000003' },
    itsupport: { id: 910005, name: 'Preview IT Support', username: 'preview-itsupport', email: 'preview-itsupport@example.invalid', role: 'itsupport', phone: '0200000004' },
    customer: { id: 910002, name: 'Preview Customer', username: 'preview-customer', email: 'preview-customer@example.invalid', role: 'customer', phone: '0200000001', address: 'Demo address' }
  };
  var role = localStorage.getItem('sigma_preview_role') || 'super';
  if (!users[role]) role = 'super';
  var page = role === 'customer' ? 'marketplace' : 'dashboard';
  localStorage.setItem('sigma_user', JSON.stringify(users[role]));
  localStorage.setItem('sigma_role', role);
  localStorage.setItem('sigma_page', page);
  sessionStorage.setItem('sigma_session_token', 'preview-' + role + '-read-only');

  var products = [
    { id: 990101, name: 'ຢານ້ຳແດງ · Preview', title: 'ຢານ້ຳແດງ · Preview', category: 'common', type: 'retail', price: 10000, qty: 24, stock: 24, packUnit: 'ຂວດ', packaging: '100 ml (sample)', bulkPrice: 8000, bulkMinQty: 100, description: 'PREVIEW ONLY - wholesale example: 8,000 K / ຂວດ from 100 ຂວດ. No production data.', imageUrl: '', dateUpdated: '2026-11-12T02:00:00.000Z', updatedAt: '2026-11-12T02:00:00.000Z', status: 'active' },
    { id: 990102, name: 'Vitamin C · Preview', title: 'Vitamin C · Preview', category: 'vitamins', type: 'retail', price: 18000, qty: 42, stock: 42, packUnit: 'ກ່ອງ', packaging: '30 tablets (sample)', bulkPrice: 15000, bulkMinQty: 100, description: 'PREVIEW ONLY - wholesale example: 15,000 K / ກ່ອງ from 100 ກ່ອງ.', imageUrl: '', dateUpdated: '2026-11-12T01:45:00.000Z', updatedAt: '2026-11-12T01:45:00.000Z', status: 'active' },
    { id: 990103, name: 'ຕົວຢ່າງລາຄາສົ່ງ · Preview', title: 'ຕົວຢ່າງລາຄາສົ່ງ · Preview', category: 'common', type: 'retail', price: 35000, priceUnit: 'ແຜງ', bulkPrice: 28000, bulkMinQty: 300, qty: 1200, stock: 1200, packUnit: 'ແຜງ', packaging: '10 tablets / ແຜງ (sample)', description: 'PREVIEW ONLY - wholesale example: 28,000 K / ແຜງ from 300 ແຜງ.', imageUrl: '', dateUpdated: '2026-11-12T01:30:00.000Z', updatedAt: '2026-11-12T01:30:00.000Z', status: 'active' }
  ];
  var orders = [
    { id: 990018, invoiceNo: 'INV-DEMO-018', createdAt: '2026-11-12T02:30:00.000Z', date: '12/11/2026', time: '09:30 AM', customerName: 'Preview Customer', customerPhone: '0200000001', customerId: 910002, items: [{ productId: 990101, name: 'ຢານ້ຳແດງ · Preview', qty: 1, price: 10000, total: 10000 }], total: 10000, totalAmount: 10000, status: 'pending', paymentStatus: 'pending', paymentMethod: 'qr' },
    { id: 990017, invoiceNo: 'INV-DEMO-017', createdAt: '2026-11-12T02:12:00.000Z', date: '12/11/2026', time: '09:12 AM', customerName: 'Preview Customer', customerPhone: '0200000001', customerId: 910002, items: [{ productId: 990102, name: 'Vitamin C · Preview', qty: 1, price: 18000, total: 18000 }], total: 18000, totalAmount: 18000, status: 'preparing', paymentStatus: 'paid', paymentMethod: 'cash' }
  ];
  var customers = [{ id: 910002, cusId: 'CUS-PREVIEW-002', name: 'Preview Customer', phone: '0200000001', email: 'preview-customer@example.invalid', address: 'Demo address' }];
  var settings = { companyName: 'Sigma Pharma Co., Ltd. · PREVIEW', bankAccount: 'PREVIEW ONLY - NO PAYMENT', bcelQrCodeUrl: '', address: 'Demo address only', phone: '' };

  function pick(path, method) {
    if (method !== 'GET') return { status: 405, body: { error: 'Read-only demo: writes are disabled.' } };
    if (path === '/api/auth/session') return { status: 200, body: { user: users[role], token: 'preview-' + role + '-read-only' } };
    if (path === '/api/auth/logout') return { status: 200, body: { ok: true } };
    if (path === '/api/health') return { status: 200, body: { status: 'ok', preview: true, dataStore: { products: products.length, customers: customers.length, users: 5, orders: orders.length } } };
    if (path === '/api/products') return { status: 200, body: products };
    if (/^\/api\/products\/\d+$/.test(path)) return { status: 200, body: products[0] };
    if (path === '/api/users') return { status: 200, body: [users.super, users.admin, users.sales, users.itsupport, users.customer] };
    if (path === '/api/settings') return { status: 200, body: settings };
    if (path === '/api/customers') return { status: 200, body: customers };
    if (path === '/api/orders') return { status: 200, body: role === 'customer' ? orders.filter(function (o) { return o.customerId === users.customer.id; }) : orders };
    if (/^\/api\/orders\/\d+$/.test(path)) return { status: 200, body: orders[0] };
    return { status: 200, body: [] };
  }

  var realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    var path = url.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
    if (path.indexOf('/api/') === 0) {
      var res = pick(path, method);
      return Promise.resolve(new Response(JSON.stringify(res.body), { status: res.status, headers: { 'Content-Type': 'application/json; charset=utf-8' } }));
    }
    return realFetch(input, init);
  };

  function mountBanner() {
    var css = '#sigma-demo-banner{position:relative;z-index:1200;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;padding:8px 12px;background:#132338;color:#fff;font:600 12px/1.35 system-ui,sans-serif;border-bottom:3px solid #44c58b}#sigma-demo-banner strong{color:#8af0bb;letter-spacing:.04em}#sigma-demo-banner button{border:1px solid #8291a6;border-radius:7px;background:#253952;color:#fff;padding:5px 9px;font:700 11px system-ui,sans-serif;cursor:pointer}#sigma-demo-banner button[aria-pressed="true"]{background:#13734f;border-color:#54d69b}@media(max-width:640px){#sigma-demo-banner{font-size:10px;gap:5px;padding:7px 6px}#sigma-demo-banner button{font-size:10px;padding:5px 7px}}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    var bar = document.createElement('div');
    bar.id = 'sigma-demo-banner';
    var labels = [['super', 'Super Admin'], ['admin', 'Admin'], ['sales', 'Sales'], ['itsupport', 'IT Support'], ['customer', 'Customer / Marketplace']];
    bar.innerHTML = '<strong>SIGMA PHARMA · DEMO (anou3.10.2026 branch)</strong><span>synthetic data only · read-only · production untouched</span>';
    labels.forEach(function (pair) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = pair[1];
      b.dataset.role = pair[0];
      b.setAttribute('aria-pressed', String(pair[0] === role));
      b.addEventListener('click', function () {
        localStorage.setItem('sigma_preview_role', pair[0]);
        location.reload();
      });
      bar.appendChild(b);
    });
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountBanner);
  else mountBanner();
})();
