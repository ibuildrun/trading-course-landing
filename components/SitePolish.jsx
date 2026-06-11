'use client';
import { useEffect } from 'react';

const BASE = '/trading-course-landing';

export default function SitePolish() {
  useEffect(() => {
    const loader = document.getElementById('site-loader');
    const hide = () => loader && loader.classList.add('hide');
    if (document.readyState === 'complete') setTimeout(hide, 350);
    else window.addEventListener('load', () => setTimeout(hide, 250));
    const cap = setTimeout(hide, 2200); // страховка

    // ---- Lenis: плавный скролл только на лендинге (на дашбордах нативный) ----
    let lenis;
    const path = location.pathname.replace(/\/+$/, '');
    const isLanding = path === BASE || path === '';
    if (isLanding && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      import('lenis').then(({ default: Lenis }) => {
        lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        window.__lenis = lenis;
      }).catch(() => {});
    }

    // ---- Перехват кликов: якоря -> плавно; внутренние ссылки -> занавес ----
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;

      // якорь на текущей странице
      if (href.startsWith('#')) {
        if (href.length < 2) return; // href="#" — кнопки-заглушки
        const t = document.querySelector(href);
        if (!t) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        const top = t.getBoundingClientRect().top + window.scrollY - 80;
        if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.2 });
        else window.scrollTo({ top, behavior: 'smooth' });
        const mm = document.getElementById('mobile-menu'); if (mm) mm.classList.add('hidden');
        return;
      }

      // карусель курса сама управляет drag/навигацией — не вмешиваемся
      if (a.closest('#program-track')) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;

      let url;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin) return;             // внешняя
      if (url.pathname === location.pathname && url.hash) return; // якорь на этой же странице через полный путь

      // плавный занавес перед переходом
      e.preventDefault();
      if (loader) loader.classList.remove('hide');
      setTimeout(() => { window.location.href = a.href; }, 420);
    };
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      clearTimeout(cap);
      if (lenis) { lenis.destroy(); delete window.__lenis; }
    };
  }, []);

  return (
    <div id="site-loader">
      <div className="sl-inner">
        <div className="sl-logo">M</div>
        <div className="sl-spin" />
        <div className="sl-text">Mind<b>Trade</b></div>
      </div>
    </div>
  );
}
