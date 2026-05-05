const CACHE_NAME = 'radio-super-indio-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './app.css',
  './app.js',
  './manifest.webmanifest',
  './assets/logotipo.png',
  './assets/mascote-placa.png',
  './assets/mascote-vitoria.png',
  './media/library.json',
  './media/ambiente-manha.wav',
  './media/ambiente-pico.wav',
  './media/ambiente-tarde.wav',
  './media/vinheta-radio-indio.wav',
  './media/teste-locutor-indio.mp3',
  './media/jingle-no-indio-a-gente.mp3',
  './media/jingle-tribo-super-indio.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
