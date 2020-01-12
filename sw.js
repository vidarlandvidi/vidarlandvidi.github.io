const version = "0.0.01";
const cacheName = `ikeychain-${version}`;
self.addEventListener('install', e => {
	console.debig('sw install');
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
	console.debig('sw activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	console.debig('sw fecth');
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
