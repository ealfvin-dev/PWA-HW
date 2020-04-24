console.log("Hello service-worker world!");

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("budget-v1").then((cache) => {
            return cache.addAll([
                "./index.html",
                "./index.js",
                "./styles.css",
                "./icons/icon-192x192.png",
                "./icons/icon-512x512.png",
                "../models/transaction.js"
            ]);
        })
    )
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        //try to get resource from cache first, the try the network
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
        })
    );
});