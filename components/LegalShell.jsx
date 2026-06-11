const BASE = '/trading-course-landing';

export default function LegalShell({ title, updated = '11.06.2026', children }) {
  return (
    <div className="layer min-h-screen">
      <div className="aurora"><span className="b1" /><span className="b2" /><span className="b3" /></div>

      <header className="glass border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href={`${BASE}/`} className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink font-display font-extrabold text-lg">M</span>
            <span className="font-display font-extrabold text-lg text-white">Mind<span className="text-accent">Trade</span></span>
          </a>
          <a href={`${BASE}/`} className="btn btn-ghost btn-sm"><i className="fa-solid fa-arrow-left" /> На главную</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">{title}</h1>
        <p className="text-sm text-slate-500 mt-1 mb-8">Демонстрационный документ-образец. Обновлено: {updated}.</p>
        <div className="legal-body text-slate-300 leading-relaxed space-y-4">{children}</div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-3">
          <a href={`${BASE}/privacy/`} className="btn btn-outline btn-sm">Конфиденциальность</a>
          <a href={`${BASE}/consent/`} className="btn btn-outline btn-sm">Согласие на обработку ПДн</a>
          <a href={`${BASE}/cookie/`} className="btn btn-outline btn-sm">Cookie</a>
          <a href={`${BASE}/offer/`} className="btn btn-outline btn-sm">Оферта</a>
        </div>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center text-xs text-slate-500">© 2026 MindTrade. Образовательный проект. Прототип для демонстрации.</div>
      </footer>
    </div>
  );
}

export function H2({ children }) { return <h2 className="font-display font-bold text-xl text-white pt-4">{children}</h2>; }
export function Note({ children }) {
  return <div className="card p-4" style={{ borderColor: 'rgba(234,179,8,.3)', background: 'rgba(234,179,8,.06)' }}><strong className="text-yellow-300">Это образец.</strong> {children}</div>;
}
