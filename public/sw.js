/* MindTrade service worker: статика — cache-first, HTML — network-first с офлайн-фолбэком */
var V = 'mt-v2';
var BASE = '/trading-course-landing';
var CORE = [
  BASE + '/',
  BASE + '/login/',
  BASE + '/app/',
  BASE + '/admin/',
  BASE + '/fa/css/fa-lite.css',
  BASE + '/fa/webfonts/fa-solid-900-subset.woff2',
  BASE + '/fa/webfonts/fa-brands-400-subset.woff2',
  BASE + '/fa/webfonts/fa-regular-400-subset.woff2',
  BASE + '/js/site.js',
  BASE + '/js/landing.js',
  BASE + '/js/login.js',
  BASE + '/js/cabinet.js',
  BASE + '/js/admin.js',
  BASE + '/js/lenis.min.js',
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll(CORE).catch(function () {}); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== location.origin) return;

  var isStatic = /\.(css|js|woff2|woff|ttf|png|jpg|svg|ico|webp)$/.test(url.pathname) || url.pathname.indexOf('/_next/static/') !== -1;

  if (isStatic) {
    // cache-first: статика хэшируется/версионируется, можно смело отдавать из кэша
    e.respondWith(
      caches.open(V).then(function (c) {
        return c.match(req).then(function (hit) {
          if (hit) return hit;
          return fetch(req).then(function (r) { if (r.ok) c.put(req, r.clone()); return r; });
        });
      })
    );
  } else {
    // HTML: network-first (всегда свежая), офлайн/обрыв — из кэша
    e.respondWith(
      fetch(req).then(function (r) {
        if (r.ok) { var cl = r.clone(); caches.open(V).then(function (c) { c.put(req, cl); }); }
        return r;
      }).catch(function () { return caches.match(req); })
    );
  }
});
