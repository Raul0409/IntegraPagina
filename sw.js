const CACHE_NAME = 'site-static-v1';

const assets =  [
    './',
    './index.html',
    //'./'Script.js,
    './Estilos.css',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
];

//se instala
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching shell assets');
            return cache.addAll(assets);
    })
    );
});

//Active event (runs when the sw is updated)
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
                .filter(key => key!== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
});

//Fetch event (interacts with the cache)
self.addEventListener("fetch", evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=> {
            //return cached file or go to network
            return cacheRes || fetch(evt.request);
        })
    )
})