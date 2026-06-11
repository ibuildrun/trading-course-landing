'use client';
import { useEffect } from 'react';

export default function SitePolish() {
  useEffect(() => {
    const loader = document.getElementById('site-loader');

    // Сплэш — только один раз за сессию; на повторных страницах скрыт guard-скриптом в <head>
    let splashed = false;
    try { splashed = sessionStorage.getItem('mt-splashed') === '1'; } catch {}
    const hide = () => loader && loader.classList.add('hide');
    let cap;
    if (!splashed) {
      try { sessionStorage.setItem('mt-splashed', '1'); } catch {}
      if (document.readyState === 'complete') setTimeout(hide, 300);
      else window.addEventListener('load', () => setTimeout(hide, 250));
      cap = setTimeout(hide, 2000);
    } else {
      hide();
    }
    return () => { if (cap) clearTimeout(cap); };
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
