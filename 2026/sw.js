const CACHE_PREFIX = 'sigma-app-shell-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const APP_SHELL = '/';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(APP_SHELL, { cache: 'reload' });
    if (!response.ok) throw new Error('Unable to cache the Sigma app shell');
    await cache.put(APP_SHELL, response.clone());
    const html = await response.text();
    const assetPaths = [
      ...[...html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g)].map(match => match[1]),
      '/manifest.webmanifest',
      '/icons/sigma-app.svg',
      '/icons/sigma-app-192.png',
      '/icons/sigma-app-512.png',
      '/icons/apple-touch-icon.png',
    ];
    await Promise.all(assetPaths.map(async path => {
      try {
        const asset = await fetch(path, { cache: 'reload' });
        if (asset.ok) await cache.put(path, asset);
      } catch {
        // The shell is still usable online; missing assets can be fetched later.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Never cache authenticated or public API responses: users must be online to access data.
  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(APP_SHELL, fresh.clone());
        }
        return fresh;
      } catch {
        const shell = await caches.match(APP_SHELL);
        return shell || new Response('Sigma Pharma needs an internet connection to load.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
    })());
    return;
  }

  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/icons/')) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    })());
  }
});
