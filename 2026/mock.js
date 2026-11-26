(function () {
  'use strict';
  var KEY = 'sigma_demo_preview_state_v1';
  var role = localStorage.getItem('sigma_preview_role') || 'super';
  var roles = ['super', 'admin', 'sales', 'itsupport', 'customer'];
  if (roles.indexOf(role) < 0) role = 'super';
  var users = {
    super: { id: 910001, name: 'Preview Super Admin', username: 'preview-super', email: 'preview-super@example.invalid', role: 'super', phone: '0200000000' },
    admin: { id: 910003, name: 'Preview Admin', username: 'preview-admin', email: 'preview-admin@example.invalid', role: 'admin', phone: '0200000002' },
    sales: { id: 910004, name: 'Preview Sales', username: 'preview-sales', email: 'preview-sales@example.invalid', role: 'sales', phone: '0200000003' },
    customer: { id: 910002, name: 'Preview Customer', username: 'preview-customer', email: 'preview-customer@example.invalid', role: 'customer', phone: '0200000001', address: 'Demo address' },
    itsupport: { id: 910005, name: 'Preview IT Support', username: 'preview-itsupport', email: 'preview-itsupport@example.invalid', role: 'itsupport', phone: '0200000004' }
  };
  var seed = {
    products: [
      { id: 990101, name: 'ຢານ້ຳແດງ · Preview', title: 'ຢານ້ຳແດງ · Preview', category: 'common', type: 'retail', price: 10000, qty: 24, stock: 24, packUnit: 'ຂວດ', packaging: '100 ml (sample)', bulkPrice: 8000, bulkMinQty: 100, description: 'PREVIEW ONLY - sample wholesale pricing; no production data.', imageUrl: '', status: 'active' },
      { id: 990102, name: 'Vitamin C · Preview', title: 'Vitamin C · Preview', category: 'vitamins', type: 'retail', price: 18000, qty: 42, stock: 42, packUnit: 'ກ່ອງ', packaging: '30 tablets (sample)', bulkPrice: 15000, bulkMinQty: 100, description: 'PREVIEW ONLY - sample product.', imageUrl: '', status: 'active' },
      { id: 990103, name: 'ຕົວຢ່າງລາຄາສົ່ງ · Preview', title: 'ຕົວຢ່າງລາຄາສົ່ງ · Preview', category: 'common', type: 'retail', price: 35000, priceUnit: 'ແຜງ', bulkPrice: 28000, bulkMinQty: 300, qty: 1200, stock: 1200, packUnit: 'ແຜງ', packaging: '10 tablets / ແຜງ (sample)', description: 'PREVIEW ONLY - sample product.', imageUrl: '', status: 'active' }
    ],
    orders: [
      { id: 990018, invoiceNo: 'INV-DEMO-018', createdAt: '2026-11-12T02:30:00.000Z', date: '12/11/2026', time: '09:30 AM', customerName: 'Preview Customer', customerPhone: '0200000001', customerId: 910002, customerUserId: 910002, createdByRole: 'customer', createdByUserId: 910002, items: [{ productId: 990101, name: 'ຢານ້ຳແດງ · Preview', qty: 1, price: 10000, total: 10000 }], total: 10000, totalAmount: 10000, status: 'pending', paymentStatus: 'pending', paymentMethod: 'qr' },
      { id: 990017, invoiceNo: 'INV-DEMO-017', createdAt: '2026-11-12T02:12:00.000Z', date: '12/11/2026', time: '09:12 AM', customerName: 'Preview Customer', customerPhone: '0200000001', customerId: 910002, customerUserId: 910002, createdByRole: 'customer', createdByUserId: 910002, items: [{ productId: 990102, name: 'Vitamin C · Preview', qty: 1, price: 18000, total: 18000 }], total: 18000, totalAmount: 18000, status: 'paid', paymentStatus: 'paid', paymentMethod: 'cash', cashReceived: 18000 },
      { id: 990019, invoiceNo: 'INV-DEMO-019', createdAt: '2026-11-12T02:45:00.000Z', date: '12/11/2026', time: '09:45 AM', customerName: 'Preview Customer', customerPhone: '0200000001', customerId: 910002, customerUserId: 910002, createdByRole: 'customer', createdByUserId: 910002, items: [{ productId: 990101, name: 'ຢານ້ຳແດງ · Preview', qty: 1, price: 10000, total: 10000 }], total: 10000, totalAmount: 10000, status: 'pending', paymentStatus: 'pending_confirmation', paymentMethod: 'cash', cashReceived: 10000, changeAmount: 0 }
    ],
    customers: [{ id: 910002, cusId: 'CUS-PREVIEW-002', name: 'Preview Customer', phone: '0200000001', email: 'preview-customer@example.invalid', address: 'Demo address' }],
    settings: { companyName: 'Sigma Pharma Co., Ltd. · PREVIEW', bankAccount: 'PREVIEW ONLY - NO PAYMENT', bcelQrCodeUrl: '', address: 'Demo address only', phone: '' },
    tracking: [{ id: 990301, customerId: 910002, customerName: 'Preview Customer', medicineName: 'Vitamin C · Preview', quantity: 1, date: '12/11/2026', notes: 'Synthetic preview request', status: 'pending', createdAt: '2026-11-12T03:00:00.000Z' }], follows: [], extraUsers: []
  };
  function copy(x) { return JSON.parse(JSON.stringify(x)); }
  function tagged(x) { var out = Object.assign({}, x || {}, { demo: true, label: 'DEMO/PREVIEW' }); if (Array.isArray(out.items)) out.items = out.items.map(tagged); return out; }
  function load() { try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && Array.isArray(s.orders) && Array.isArray(s.products)) return Object.assign(copy(seed), s); } catch (_) {} return copy(seed); }
  var db = load();
  db.products = db.products.map(tagged); db.orders = db.orders.map(tagged); db.customers = db.customers.map(tagged); db.extraUsers = db.extraUsers.map(tagged); db.tracking = db.tracking.map(tagged); db.follows = db.follows.map(tagged); db.settings = tagged(db.settings);
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (_) {} }
  function result(status, body) { return { status: status || 200, body: body }; }
  function err(status, message) { return result(status, { error: message, demo: true, label: 'DEMO/PREVIEW' }); }
  function id(path) { var m = path.match(/\/(\d+)(?:\/|$)/); return m ? Number(m[1]) : 0; }
  function freshId(list) { return Math.max(Date.now(), 991000, (list || []).reduce(function (n, x) { return Math.max(n, Number(x.id) || 0); }, 0) + 1); }
  function update(list, key, patch) { var i = list.findIndex(function (x) { return String(x.id) === String(key); }); if (i < 0) return null; list[i] = tagged(Object.assign({}, list[i], patch, { id: list[i].id, updatedAt: new Date().toISOString() })); return list[i]; }
  function metrics() { var paid = db.orders.filter(function (o) { return o.paymentStatus === 'paid' || o.status === 'paid' || o.status === 'completed'; }); return { products: db.products.length, customers: db.customers.length, users: 5 + db.extraUsers.length, orders: db.orders.length, pendingOrders: db.orders.filter(function (o) { return ['pending', 'pending_payment', 'pending_confirmation'].indexOf(o.status) >= 0; }).length, paidOrders: paid.length, revenue: paid.reduce(function (sum, o) { return sum + Number(o.totalAmount || o.total || 0); }, 0), demo: true, preview: true, label: 'DEMO/PREVIEW' }; }
  function applyOrder(order, patch) {
    patch = Object.assign({}, patch || {});
    ['paymentSlip'].forEach(function (k) { if (patch[k] && (typeof patch[k] !== 'string' || !/^data:image\/[\w.+-]+;base64,/.test(patch[k]))) throw Error('Payment slips are stored only as image data URLs in this browser demo.'); });
    if (Array.isArray(patch.paymentSlips)) patch.paymentSlips = patch.paymentSlips.map(function (x) { if (typeof x !== 'string' || !/^data:image\/[\w.+-]+;base64,/.test(x)) throw Error('Payment slips must be image data URLs.'); return x; });
    var wasDeducted = !!order.inventoryDeducted;
    var next = tagged(Object.assign({}, order, patch, { id: order.id }));
    var dispatching = !!patch.dispatchInfo || ['dispatched', 'completed'].indexOf(patch.status) >= 0;
    if (dispatching && !wasDeducted) {
      (next.items || []).forEach(function (line) { var p = db.products.find(function (x) { return String(x.id) === String(line.productId); }); if (p) { p.qty = Math.max(0, Number(p.qty == null ? p.stock : p.qty) - Math.max(0, Number(line.qty) || 0)); p.stock = p.qty; } });
      next.inventoryDeducted = true;
    }
    if (patch.dispatchInfo && patch.dispatchInfo.trackingNo) next.status = 'shipping';
    var ix = db.orders.findIndex(function (x) { return x.id === order.id; }); db.orders[ix] = next; return next;
  }
  function route(path, method, data) {
    var oid = id(path);
    if (path === '/api/auth/session' && method === 'GET') return result(200, { user: tagged(users[role]), token: 'preview-' + role + '-demo' });
    if (path === '/api/auth/logout' && method !== 'GET') return result(200, { ok: true, demo: true });
    if (path === '/api/auth/login' || path === '/api/auth/register') return err(403, 'Authentication is simulated; use the demo role switch.');
    if (path === '/api/health' && method === 'GET') return result(200, { status: 'ok', preview: true, dataStore: metrics() });
    if (['/api/dashboard', '/api/metrics', '/api/dashboard/metrics'].indexOf(path) >= 0) return result(200, metrics());
    if (path === '/api/products' && method === 'GET') return result(200, db.products);
    if (path === '/api/products' && method === 'POST') { var np = tagged(Object.assign({}, data, { id: freshId(db.products) })); db.products.unshift(np); save(); return result(201, np); }
    if (/^\/api\/products\/\d+$/.test(path)) { if (method === 'GET') return result(200, db.products.find(function (x) { return x.id === oid; }) || {}); if (method === 'PUT' || method === 'PATCH') { var p = update(db.products, oid, data); if (!p) return err(404, 'Demo product not found.'); save(); return result(200, p); } if (method === 'DELETE') { db.products = db.products.filter(function (x) { return x.id !== oid; }); save(); return result(200, { ok: true, demo: true, label: 'DEMO/PREVIEW' }); } }
    if (path === '/api/orders' && method === 'GET') return result(200, role === 'customer' ? db.orders.filter(function (o) { return Number(o.customerId) === users.customer.id; }) : db.orders);
    if (path === '/api/orders' && method === 'POST') { var no = tagged(Object.assign({}, data, { id: freshId(db.orders), invoiceNo: data.invoiceNo || 'INV-DEMO-' + String(db.orders.length + 19).padStart(3, '0'), customerId: data.customerId || users.customer.id, customerName: data.customerName || users.customer.name, customerPhone: data.customerPhone || users.customer.phone, status: data.status || 'pending', createdAt: new Date().toISOString() })); db.orders.unshift(no); save(); return result(201, no); }
    var cash = path.match(/^\/api\/orders\/(\d+)\/confirm-cash$/);
    if (cash && method === 'POST') { var co = db.orders.find(function (o) { return String(o.id) === cash[1]; }); if (!co) return err(404, 'Demo order not found.'); if (co.cashReceivedConfirmedAt || co.paymentStatus === 'paid') return err(409, 'Cash receipt was already confirmed for this demo order.'); var stamp = new Date().toISOString(); var confirmed = applyOrder(co, { cashReceivedConfirmedAt: stamp, paymentConfirmedAt: stamp, paymentStatus: 'paid', status: 'paid', cashConfirmationInvoiceNo: data.invoiceNo || co.invoiceNo }); save(); return result(200, confirmed); }
    if (/^\/api\/orders\/\d+$/.test(path)) { if (method === 'GET') return result(200, db.orders.find(function (o) { return o.id === oid; }) || {}); if (method === 'PUT' || method === 'PATCH') { var old = db.orders.find(function (o) { return o.id === oid; }); if (!old) return err(404, 'Demo order not found.'); try { var changed = applyOrder(old, data); save(); return result(200, changed); } catch (e) { return err(400, e.message); } } if (method === 'DELETE') { db.orders = db.orders.filter(function (o) { return o.id !== oid; }); save(); return result(200, { ok: true, demo: true, label: 'DEMO/PREVIEW' }); } }
    if (path === '/api/customers' && method === 'GET') return result(200, db.customers);
    if (path === '/api/customers' && method === 'POST') { var nc = tagged(Object.assign({}, data, { id: freshId(db.customers) })); db.customers.unshift(nc); save(); return result(201, nc); }
    if (/^\/api\/customers\/\d+$/.test(path)) { if (method === 'PUT' || method === 'PATCH') { var c = update(db.customers, oid, data); if (!c) return err(404, 'Demo customer not found.'); save(); return result(200, c); } if (method === 'DELETE') { db.customers = db.customers.filter(function (x) { return x.id !== oid; }); save(); return result(200, { ok: true, demo: true, label: 'DEMO/PREVIEW' }); } }
    if (path === '/api/users' && method === 'GET') return result(200, [users.super, users.admin, users.sales, users.itsupport, users.customer].map(tagged).concat(db.extraUsers));
    if (path === '/api/users' && method === 'POST') { var nu = tagged(Object.assign({}, data, { id: freshId(db.extraUsers) })); db.extraUsers.unshift(nu); save(); return result(201, nu); }
    if (/^\/api\/users\/\d+$/.test(path)) { if (method === 'PUT' || method === 'PATCH') { var u = update(db.extraUsers, oid, data); if (!u) return err(404, 'Built-in preview roles are fixed.'); save(); return result(200, u); } if (method === 'DELETE') { db.extraUsers = db.extraUsers.filter(function (x) { return x.id !== oid; }); save(); return result(200, { ok: true, demo: true, label: 'DEMO/PREVIEW' }); } }
    if (path === '/api/settings' && method === 'GET') return result(200, tagged(db.settings));
    if (path === '/api/settings' && (method === 'PUT' || method === 'PATCH')) { db.settings = tagged(Object.assign({}, db.settings, data)); save(); return result(200, db.settings); }
    if (path === '/api/tracking' && method === 'GET') return result(200, db.tracking);
    if (path === '/api/tracking' && method === 'POST') { var nt = tagged(Object.assign({}, data, { id: freshId(db.tracking), status: data.status || 'pending' })); db.tracking.unshift(nt); save(); return result(201, nt); }
    if (/^\/api\/tracking\/\d+$/.test(path)) { if (method === 'PUT' || method === 'PATCH') { var t = update(db.tracking, oid, data); if (!t) return err(404, 'Demo tracking request not found.'); save(); return result(200, t); } if (method === 'DELETE') { db.tracking = db.tracking.filter(function (x) { return x.id !== oid; }); save(); return result(200, { ok: true, demo: true, label: 'DEMO/PREVIEW' }); } }
    if (path === '/api/product-follows' && method === 'GET') return result(200, db.follows);
    if (path === '/api/product-follows' && method === 'POST') { var nf = tagged(Object.assign({}, data, { id: freshId(db.follows), customerId: users.customer.id })); db.follows.unshift(nf); save(); return result(201, nf); }
    if (/^\/api\/product-follows\/\d+$/.test(path) && method === 'DELETE') { db.follows = db.follows.filter(function (x) { return String(x.productId || x.id) !== String(oid); }); save(); return result(200, { ok: true, demo: true, label: 'DEMO/PREVIEW' }); }
    return result(200, method === 'GET' ? [] : { ok: true, demo: true, label: 'DEMO/PREVIEW' });
  }
  function bodyData(init) { if (!init || !init.body) return Promise.resolve({}); if (typeof init.body === 'string') { try { return Promise.resolve(JSON.parse(init.body)); } catch (_) { return Promise.resolve({}); } } if (typeof FormData !== 'undefined' && init.body instanceof FormData) { var o = {}; init.body.forEach(function (v, k) { o[k] = v; }); return Promise.resolve(o); } return Promise.resolve({}); }
  var originalFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    var path = url.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
    if (path.indexOf('/api/') === 0) return bodyData(init).then(function (body) { var res; try { res = route(path, method, body); } catch (e) { res = err(400, e.message); } return new Response(JSON.stringify(res.body), { status: res.status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Sigma-Preview-API': 'local-demo-mock' } }); });
    return originalFetch(input, init);
  };
  localStorage.setItem('sigma_user', JSON.stringify(tagged(users[role]))); localStorage.setItem('sigma_role', role); localStorage.setItem('sigma_page', role === 'customer' ? 'marketplace' : 'dashboard'); sessionStorage.setItem('sigma_session_token', 'preview-' + role + '-demo');
  function mountBanner() {
    var style = document.createElement('style'); style.textContent = '#sigma-demo-banner{position:relative;z-index:1200;width:100%;box-sizing:border-box;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;padding:8px 12px;background:#132338;color:#fff;font:600 12px/1.35 system-ui,sans-serif;border-bottom:3px solid #44c58b}#sigma-demo-banner strong{color:#8af0bb;letter-spacing:.04em}#sigma-demo-banner button{border:1px solid #8291a6;border-radius:7px;background:#253952;color:#fff;padding:5px 9px;font:700 11px system-ui,sans-serif;cursor:pointer}#sigma-demo-banner button[aria-pressed="true"]{background:#13734f;border-color:#54d69b}#sigma-demo-banner .reset{background:#6b2b36;border-color:#c27b87}#sigma-demo-banner .guide{flex-basis:100%;text-align:center;color:#d6e4ed;line-height:1.45;font-size:11px}@media(max-width:640px){#sigma-demo-banner{max-width:380px;font-size:10px;gap:5px;padding:7px 6px}#sigma-demo-banner button{font-size:10px;padding:5px 7px}#sigma-demo-banner .guide{font-size:10px}}'; document.head.appendChild(style);
    var bar = document.createElement('div'); bar.id = 'sigma-demo-banner'; bar.innerHTML = '<strong>SIGMA PHARMA · DEMO/PREVIEW</strong><span class="guide">ລອງສັບປ່ຽນ 5 ບົດບາດ ແລະຄລິກເມນູຕ່າງໆ<br>ຂໍ້ມູນທົດລອງຈະເກັບໄວ້ໃນ browser ນີ້ເທົ່ານັ້ນ<br>ກົດ Reset demo data ເພື່ອຄືນຄ່າເລີ່ມຕົ້ນ</span>';
    [['super', 'Super Admin'], ['admin', 'Admin'], ['sales', 'Sales'], ['itsupport', 'IT Support'], ['customer', 'Customer / Marketplace']].forEach(function (entry) { var b = document.createElement('button'); b.type = 'button'; b.textContent = entry[1]; b.setAttribute('aria-pressed', String(entry[0] === role)); b.addEventListener('click', function () { localStorage.setItem('sigma_preview_role', entry[0]); location.reload(); }); bar.appendChild(b); });
    var reset = document.createElement('button'); reset.className = 'reset'; reset.type = 'button'; reset.textContent = 'Reset demo data'; reset.addEventListener('click', function () { localStorage.removeItem(KEY); location.reload(); }); bar.appendChild(reset); document.body.insertBefore(bar, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountBanner); else mountBanner();
})();
