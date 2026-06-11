'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

const BASE = '/trading-course-landing';

export default function SitePolish() {
  useEffect(() => {
    const loader = document.getElementById('site-loader');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Сплэш: только один раз за сессию (на повторных/кэшированных страницах его нет) ----
    let cap;
    let splashed = false;
    try { splashed = sessionStorage.getItem('mt-splashed') === '1'; } catch {}
    if (!splashed) {
      try { sessionStorage.setItem('mt-splashed', '1'); } catch {}
      const hide = () => loader && loader.classList.add('hide');
      if (document.readyState === 'complete') setTimeout(hide, 300);
      else window.addEventListener('load', () => setTimeout(hide, 250));
      cap = setTimeout(hide, 2000);
    } else if (loader) {
      loader.classList.add('hide'); // подстраховка (основное — через inline-скрипт в <head>)
    }

    // ---- Lenis: плавный инерционный скролл на лендинге ----
    let lenis;
    const path = location.pathname.replace(/\/+$/, '');
    const isLanding = path === BASE || path === '';
    if (isLanding && !reduce) {
      lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      const raf = (t) => { if (lenis) { lenis.raf(t); requestAnimationFrame(raf); } };
      requestAnimationFrame(raf);
      window.__lenis = lenis;
    }

    // ---- Плавный доезд по якорям ----
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length < 2) return;
      const t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const top = t.getBoundingClientRect().top + window.scrollY - 80;
      if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.2 });
      else window.scrollTo({ top, behavior: 'smooth' });
      const mm = document.getElementById('mobile-menu'); if (mm) mm.classList.add('hidden');
    };
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      if (cap) clearTimeout(cap);
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
