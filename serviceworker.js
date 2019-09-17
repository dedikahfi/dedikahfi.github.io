const CACHE_NAME = "pwa-dedikahfi-v1.1.0";
var urlsToCache = [
	"/dedikahfi.github.io/",
	"/dedikahfi.github.io/css/materialize.min.css",
	"/dedikahfi.github.io/js/materialize.min.js",
	"/dedikahfi.github.io/js/script.js",
	"/dedikahfi.github.io/pages/education.html",
	"/dedikahfi.github.io/pages/experience.html",
	"/dedikahfi.github.io/pages/skills.html",
	"/dedikahfi.github.io/pages/home.html",
	"/dedikahfi.github.io/index.html",
	"/dedikahfi.github.io/nav.html",
	"/dedikahfi.github.io/assets/work.png",
	"/dedikahfi.github.io/assets/image-home.png",
	"/dedikahfi.github.io/assets/ctb.jpg"
];

// Add cache to serviceworker
self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

// Fetch cache
self.addEventListener("fetch", function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName: CACHE_NAME})
		.then(function(response) {
			if (response) {
				console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
				return response;
			}

			// Jika tidak tersedia di service worker
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

//Menghapus storage cache yang tidak digunakan
self.addEventListener("activate", function(event) {
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});