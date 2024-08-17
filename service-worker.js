const cacheName = 'bus-animation-cache-v1';
const assetsToCache = [
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'busAnimation.json',
    'logoMain.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(assetsToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
