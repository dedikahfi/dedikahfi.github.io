const CACHE_NAME = "pwa-dedikahfi-v1.1.2";
var urlsToCache = [
	"/",
	"/nav.html",
	"/index.html",
	"/pages/education.html",
	"/pages/experience.html",
	"/pages/skills.html",
	"/pages/home.html",
	"/css/materialize.min.css",
	"/js/materialize.min.js",
	"/js/script.js",
	"/assets/work.png",
	"/assets/image-home.png",
	"/assets/ctb.jpg"
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