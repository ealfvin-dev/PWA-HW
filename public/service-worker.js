self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("budget-v1").then((cache) => {
            console.log("Files cached successfully!");
            return cache.addAll([
                "/",
                "./index.html",
                "./index.js",
                "./styles.css",
                "./icons/icon-192x192.png",
                "./icons/icon-512x512.png"
            ]);
        })
    )
    self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        //try to get resource from cache first, the try the network
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((netresp) => {
                return caches.open("budget-v1").then((cache) => {
                    cache.put(event.request.url, netresp.clone());
                    return netresp;
                })
            }).catch((err) => {
                //No network connection - put item in indexed database
            });
        })
    );
});