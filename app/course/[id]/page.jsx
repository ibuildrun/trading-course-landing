import { notFound } from 'next/navigation';
import { modules, lessons, BASE } from '@/lib/courseData';

export function generateStaticParams() {
  return modules.map((_, i) => ({ id: String(i + 1) }));
}

export function generateMetadata({ params }) {
  const m = modules[Number(params.id) - 1];
  return { title: m ? `${m.title} | MindTrade` : 'Блок курса | MindTrade' };
}

export default function CoursePage({ params }) {
  const idx = Number(params.id) - 1;
  const m = modules[idx];
  if (!m) notFound();
  const num = String(idx + 1).padStart(2, '0');
  const prev = idx > 0 ? idx : null;
  const next = idx < modules.length - 1 ? idx + 2 : null;

  return (
    <div className="layer min-h-screen">
      <div className="aurora"><span className="b1" /><span className="b2" /><span className="b3" /></div>

      {/* header */}
      <header className="glass border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href={`${BASE}/`} className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-ink font-display font-extrabold text-lg">M</span>
            <span className="font-display font-extrabold text-lg text-white">Mind<span className="text-accent">Trade</span></span>
          </a>
          <a href={`${BASE}/#program`} className="btn btn-ghost btn-sm"><i className="fa-solid fa-arrow-left" /> К программе</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-sm text-slate-500 mb-4"><a href={`${BASE}/`} className="hover:text-accent">Главная</a> / <a href={`${BASE}/#program`} className="hover:text-accent">Программа</a> / <span className="text-slate-300">Блок {num}</span></div>

        <div className="flex items-start gap-4">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent text-2xl shrink-0"><i className={`fa-solid ${m.icon}`} /></span>
          <div>
            <div className="text-sm font-mono text-accent">Блок {num} из 12</div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1">{m.title}</h1>
          </div>
        </div>
        <p className="text-lg text-slate-300 mt-5 max-w-3xl leading-relaxed">{m.desc}</p>

        <div className="grid lg:grid-cols-3 gap-6 mt-10">
          <div className="lg:col-span-2 card p-6">
            <h2 className="font-display font-bold text-xl text-white mb-4">Что внутри блока</h2>
            <ul className="space-y-3">
              {m.points.map((p, i) => (
                <li key={i} className="flex gap-3 text-slate-200"><i className="fa-solid fa-check text-accent mt-1" /> {p}</li>
              ))}
            </ul>
            <h3 className="font-display font-bold text-white mt-8 mb-3">Уроки</h3>
            <div className="space-y-2">
              {lessons.map((l, i) => (
                <div key={i} className="surface p-3 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-300 text-sm">{i + 1}</span>
                  <span className="text-slate-200 text-sm flex-1">{l.t}</span>
                  <span className="text-xs text-slate-500">{l.d}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="card p-6 h-fit">
            <div className="text-sm text-slate-400">Этот блок входит во все форматы обучения</div>
            <a href={`${BASE}/#pricing`} className="btn btn-primary btn-block btn-shine mt-4">Выбрать формат</a>
            <a href={`${BASE}/#contact`} className="btn btn-outline btn-block mt-2">Бесплатная консультация</a>
            <a href={`${BASE}/app/`} className="btn btn-ghost btn-block mt-2 text-slate-300">Открыть в кабинете</a>
            <p className="text-[11px] text-slate-500 mt-4">Демо-страница блока. Полный материал доступен ученикам курса.</p>
          </aside>
        </div>

        {/* prev / next */}
        <div className="flex items-center justify-between gap-3 mt-10 pt-6 border-t border-white/10">
          {prev ? <a href={`${BASE}/course/${prev}/`} className="btn btn-outline btn-sm"><i className="fa-solid fa-arrow-left" /> Предыдущий блок</a> : <span />}
          {next ? <a href={`${BASE}/course/${next}/`} className="btn btn-outline btn-sm">Следующий блок <i className="fa-solid fa-arrow-right" /></a> : <span />}
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>© 2026 MindTrade. Образовательный проект.</span>
          <nav className="flex gap-4">
            <a href={`${BASE}/privacy/`} className="hover:text-accent">Конфиденциальность</a>
            <a href={`${BASE}/offer/`} className="hover:text-accent">Оферта</a>
            <a href={`${BASE}/cookie/`} className="hover:text-accent">Cookie</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
