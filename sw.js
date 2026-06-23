const CACHE_NAME = 'japonstina-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalace a načtení souborů do mezipaměti
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Aktivace nového service workera
self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// Načítání souborů – funguje i offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});