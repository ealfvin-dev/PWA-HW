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
