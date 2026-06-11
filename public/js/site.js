/* MindTrade site.js — ванильный рантайм без React: сплэш, cookie-баннер, prefetch, service worker */
(function () {
  var BASE = '/trading-course-landing';

  /* ---------- Сплэш: один раз за сессию ---------- */
  var loader = document.getElementById('site-loader');
  var splashed = false;
  try { splashed = sessionStorage.getItem('mt-splashed') === '1'; } catch (e) {}
  function hideLoader() { if (loader) loader.classList.add('hide'); }
  if (!splashed) {
    try { sessionStorage.setItem('mt-splashed', '1'); } catch (e) {}
    if (document.readyState === 'complete') setTimeout(hideLoader, 300);
    else window.addEventListener('load', function () { setTimeout(hideLoader, 250); });
    setTimeout(hideLoader, 2000); // страховка
  } else {
    hideLoader();
  }

  /* ---------- Cookie-баннер (152-ФЗ): реальный выбор ---------- */
  var KEY = 'mt-cookie-consent';
  var consent = null;
  try { consent = localStorage.getItem(KEY); } catch (e) {}
  if (!consent) {
    setTimeout(function () {
      var bar = document.createElement('div');
      bar.id = 'cookie-bar';
      bar.innerHTML =
        '<div class="glass rounded-2xl border border-white/10 p-4 sm:p-5 shadow-2xl">' +
          '<div class="flex flex-col sm:flex-row sm:items-center gap-4">' +
            '<div class="flex-1">' +
              '<div class="flex items-center gap-2 text-white font-semibold mb-1"><i class="fa-solid fa-cookie-bite text-accent"></i> Мы используем cookie</div>' +
              '<p class="text-sm text-slate-400">Сайт использует файлы cookie и обрабатывает данные для работы сервиса и аналитики. Продолжая, вы соглашаетесь с ' +
                '<a href="' + BASE + '/cookie/" class="text-accent hover:underline">политикой cookie</a> и ' +
                '<a href="' + BASE + '/privacy/" class="text-accent hover:underline">политикой конфиденциальности</a>.</p>' +
            '</div>' +
            '<div class="flex gap-2 shrink-0">' +
              '<button data-consent="essential" class="btn btn-outline btn-sm whitespace-nowrap">Только необходимые</button>' +
              '<button data-consent="all" class="btn btn-primary btn-sm btn-shine whitespace-nowrap">Принять все</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      document.body.appendChild(bar);
      requestAnimationFrame(function () { bar.classList.add('show'); });
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-consent]');
        if (!b) return;
        try { localStorage.setItem(KEY, b.getAttribute('data-consent')); } catch (err) {}
        bar.classList.remove('show');
        setTimeout(function () { bar.remove(); }, 450);
      });
    }, 900);
  }

  /* ---------- Hover-prefetch внутренних страниц ---------- */
  var seen = {};
  function prefetch(href) {
    if (seen[href]) return; seen[href] = 1;
    var l = document.createElement('link');
    l.rel = 'prefetch'; l.href = href; l.as = 'document';
    document.head.appendChild(l);
  }
  document.addEventListener('mouseover', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a || !a.href) return;
    try {
      var u = new URL(a.href, location.href);
      if (u.origin !== location.origin) return;
      if (u.pathname === location.pathname) return;
      prefetch(u.pathname);
    } catch (err) {}
  }, { passive: true });

  /* ---------- Service Worker: мгновенные повторные загрузки ---------- */
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(BASE + '/sw.js').catch(function () {});
    });
  }
})();
