const CACHE_NAME = 'recharge-plus-v1';
const urlsToCache = [
  '/dashboard/home',
  '/dashboard/schedule',
  '/dashboard/qr',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch((error) => {
          console.log('Cache addAll failed:', error);
        });
      })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip service worker for:
  // - API routes
  // - Stack Auth handlers
  // - Non-GET requests
  // - Root path (to allow redirects)
  // - Next.js internal routes
  if (url.pathname === '/' ||
      url.pathname.includes('/api/') || 
      url.pathname.includes('/handler/') ||
      url.pathname.startsWith('/_next/') ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache redirects
        if (response.type === 'opaqueredirect' || 
            (response.status >= 300 && response.status < 400)) {
          return response;
        }
        
        // Clone and cache successful responses
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Try to return cached version if offline
        return caches.match(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
