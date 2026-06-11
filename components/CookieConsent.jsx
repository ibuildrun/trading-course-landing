'use client';
import { useEffect, useState } from 'react';

const BASE = '/trading-course-landing';
const KEY = 'mt-cookie-consent';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let v = null;
    try { v = localStorage.getItem(KEY); } catch {}
    if (!v) {
      const t = setTimeout(() => setShow(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (val) => {
    try { localStorage.setItem(KEY, val); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div id="cookie-bar" className="show">
      <div className="glass rounded-2xl border border-white/10 p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-white font-semibold mb-1">
              <i className="fa-solid fa-cookie-bite text-accent" /> Мы используем cookie
            </div>
            <p className="text-sm text-slate-400">
              Сайт использует файлы cookie и обрабатывает данные для работы сервиса и аналитики. Продолжая, вы соглашаетесь с{' '}
              <a href={`${BASE}/cookie/`} className="text-accent hover:underline">политикой cookie</a> и{' '}
              <a href={`${BASE}/privacy/`} className="text-accent hover:underline">политикой конфиденциальности</a>.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => choose('essential')} className="btn btn-outline btn-sm whitespace-nowrap">Только необходимые</button>
            <button onClick={() => choose('all')} className="btn btn-primary btn-sm btn-shine whitespace-nowrap">Принять все</button>
          </div>
        </div>
      </div>
    </div>
  );
}
