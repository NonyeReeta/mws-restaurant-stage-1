self.addEventListener("install", function (event) {
  const urlsToCache = [
    "/",
    "js/main.js",
    "js/restaurant_info.js",
    "css/styles.css",
    "img/",
    "data/restaurants.json",
  ];
  event.waitUntil(
    caches.open("restaurant-static").then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) return response;
      return fetch(event.request);
    })
  );
});
