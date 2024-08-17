const cacheName = 'bus-animation-cache-v2'; // Increment the cache version when updating
const assetsToCache = [
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'logoMain.png',
    'busAnimation.json'  // Include the animation JSON file
];

// Install event: Caching assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(assetsToCache);
        })
    );
    self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

// Activate event: Deleting old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== cacheName) {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Ensure that the service worker takes control immediately
});

// Fetch event: Serving cached content or fetching from the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
