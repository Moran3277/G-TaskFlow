const CACHE_NAME = "g-taskflow-v1";
const urlsToCache = [
  "/G-TaskFlow/",
  "/G-TaskFlow/index.html",
  "/G-TaskFlow/style.css",
  "/G-TaskFlow/app.js",
  "/G-TaskFlow/manifest.json",
  "/G-TaskFlow/icon-192.png",
  "/G-TaskFlow/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
