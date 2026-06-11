/* ============================================================
   MindTrade — общие скрипты (toast, модалки, дровер, утилиты)
   ============================================================ */

/* ---------- Toast ---------- */
function toast(message, type = 'success') {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toast-wrap'; document.body.appendChild(wrap); }
  const icons = { success: 'fa-circle-check', info: 'fa-circle-info', warn: 'fa-triangle-exclamation', error: 'fa-circle-xmark' };
  const el = document.createElement('div');
  el.className = 'toast ' + (type === 'success' ? '' : type);
  el.innerHTML = `<i class="fa-solid ${icons[type] || icons.success} mt-0.5" style="color:var(--accent)"></i><span>${message}</span>`;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 4200);
}

/* ---------- Modals (generic) ---------- */
function openModal(id) { const m = document.getElementById(id); if (m) m.classList.add('open'); }
function closeModal(id) { const m = document.getElementById(id); if (m) m.classList.remove('open'); }

/* ---------- Wire-up on load ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // year stamps
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = '2026');

  // generic toast triggers
  document.querySelectorAll('[data-toast]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A' && el.getAttribute('href') === '#') e.preventDefault();
      toast(el.dataset.toast, el.dataset.toastType || 'info');
    });
  });

  // modal open / close triggers
  document.querySelectorAll('[data-modal-open]').forEach(el =>
    el.addEventListener('click', () => openModal(el.dataset.modalOpen)));
  document.querySelectorAll('[data-modal-close]').forEach(el =>
    el.addEventListener('click', () => el.closest('.modal').classList.remove('open')));
  document.querySelectorAll('.modal-backdrop').forEach(el =>
    el.addEventListener('click', () => el.closest('.modal').classList.remove('open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
  });

  // mobile sidebar drawer
  const side = document.querySelector('.app-side');
  const backdrop = document.querySelector('.side-backdrop');
  document.querySelectorAll('[data-drawer-toggle]').forEach(btn =>
    btn.addEventListener('click', () => { side && side.classList.toggle('open'); backdrop && backdrop.classList.toggle('open'); }));
  if (backdrop) backdrop.addEventListener('click', () => { side.classList.remove('open'); backdrop.classList.remove('open'); });

  // dropdowns
  document.querySelectorAll('[data-dropdown]').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); btn.closest('.dropdown').classList.toggle('open'); });
  });
  document.addEventListener('click', () => document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open')));

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // spotlight on .card-hover
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest('.card-hover'); if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

/* ---------- Small helpers ---------- */
function drawLineChart(canvas, opts = {}) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const h = opts.height || 200, color = opts.color || '#2DD4BF';
  function size() { const r = window.devicePixelRatio || 1; canvas.width = canvas.clientWidth * r; canvas.height = h * r; ctx.setTransform(r,0,0,r,0,0); }
  const N = opts.points || 80, data = [];
  let v = 100;
  for (let i = 0; i < N; i++) { v += Math.sin(i*0.25)*0.7 + (opts.trend||0.45) + ((i*37)%11-5)*0.18; if (i%17===0) v -= 2.2; data.push(v); }
  const min = Math.min(...data), max = Math.max(...data);
  size();
  let prog = 0;
  (function frame() {
    const w = canvas.clientWidth, pad = 8; ctx.clearRect(0,0,w,h);
    ctx.strokeStyle = 'rgba(148,163,184,0.07)'; ctx.lineWidth = 1;
    for (let g=0; g<=3; g++){ const y=(h/3)*g; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
    const count = Math.floor(prog), xAt = i => (i/(N-1))*w, yAt = val => pad+(1-(val-min)/(max-min))*(h-pad*2);
    const grad = ctx.createLinearGradient(0,0,0,h); grad.addColorStop(0,'rgba(45,212,191,0.25)'); grad.addColorStop(1,'rgba(45,212,191,0)');
    ctx.beginPath(); ctx.moveTo(0,h); for (let i=0;i<=count&&i<N;i++) ctx.lineTo(xAt(i),yAt(data[i])); ctx.lineTo(xAt(Math.min(count,N-1)),h); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
    ctx.beginPath(); for (let i=0;i<=count&&i<N;i++){ const x=xAt(i),y=yAt(data[i]); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
    ctx.strokeStyle=color; ctx.lineWidth=2.4; ctx.lineJoin='round'; ctx.shadowColor='rgba(45,212,191,0.5)'; ctx.shadowBlur=10; ctx.stroke(); ctx.shadowBlur=0;
    if (prog < N-1){ prog += 1.4; requestAnimationFrame(frame); }
  })();
  window.addEventListener('resize', () => { size(); });
}


/* ---------- Curriculum ---------- */
    const modules = [
      { icon:'fa-chart-line', title:'Фундамент работы с графиком' },
      { icon:'fa-diagram-project', title:'Торговая система и 3+ сэтапа' },
      { icon:'fa-shield-halved', title:'Управление капиталом и риск' },
      { icon:'fa-brain', title:'Психология трейдинга' },
      { icon:'fa-bolt', title:'Основы интрадей-трейдинга' },
      { icon:'fa-wave-square', title:'Основы свинг-трейдинга' },
      { icon:'fa-mountain', title:'Основы позиционной торговли' },
      { icon:'fa-seedling', title:'Долгосрочное инвестирование' },
      { icon:'fa-calendar-days', title:'Сезонность в экономике' },
      { icon:'fa-newspaper', title:'Макроэкономический нарратив (новости)' },
      { icon:'fa-building-columns', title:'Математика работы с проп-счетами' },
      { icon:'fa-handshake', title:'Капитал в управление' },
    ];
    const lessonTpl = [
      { t:'Введение и ключевые идеи', d:'12:30' },
      { t:'Разбор на примерах', d:'18:24' },
      { t:'Практика и домашнее задание', d:'15:10' },
    ];
    // progress per module (% ), 0=closed
    const modProg = [100,100,100,100,100,40,0,0,0,0,0,0];

    /* ---------- View routing ---------- */
    const titles = { overview:'Обзор', courses:'Мои курсы', lesson:'Урок', journal:'Дневник сделок', achievements:'Достижения', community:'Сообщество', billing:'Подписка', settings:'Настройки' };
    function showView(name) {
      document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.dataset.view === name));
      document.querySelectorAll('.nav-item[data-view]').forEach(n => n.classList.toggle('active', n.dataset.view === name));
      document.getElementById('page-title').textContent = titles[name] || 'Кабинет';
      if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
      const side = document.querySelector('.app-side'), bd = document.querySelector('.side-backdrop');
      side.classList.remove('open'); bd.classList.remove('open');
      window.scrollTo({ top: 0 });
      if (name === 'overview') animateOverview();
      if (name === 'journal') renderJournal();
      if (name === 'courses') renderModules();
      if (name === 'achievements') renderAchievements();
    }
    document.querySelectorAll('[data-view]').forEach(el => el.addEventListener('click', () => { if (el.dataset.view) showView(el.dataset.view); }));
    document.querySelectorAll('[data-view-link]').forEach(el => el.addEventListener('click', () => showView(el.dataset.viewLink)));

    /* ---------- Overview animations ---------- */
    let ovDone = false;
    function animateOverview() {
      document.querySelectorAll('#page-title');
      document.querySelectorAll('.view[data-view="overview"] .progress > i').forEach(b => b.style.width = b.dataset.w);
      const ring = document.getElementById('ovRing'), circ = 213.6, pct = 45;
      ring.style.strokeDashoffset = circ * (1 - pct/100);
      const pctEl = document.getElementById('ovPct'); let s = null;
      (function up(ts){ if(!s)s=ts; const t=Math.min((ts-s)/1300,1); pctEl.textContent=Math.round((1-Math.pow(1-t,3))*pct); if(t<1) requestAnimationFrame(up); })(performance.now());
      if (!ovDone) { ovDone = true; drawLineChart(document.getElementById('ovEquity'), { height:200, points:80, trend:0.5 }); }
    }

    /* ---------- Courses ---------- */
    function renderModules() {
      const wrap = document.getElementById('modules-list');
      if (wrap.dataset.built) return; wrap.dataset.built = '1';
      modules.forEach((m, i) => {
        const p = modProg[i];
        const status = p===100 ? '<span class="badge badge-green">Завершён</span>' : p>0 ? '<span class="badge badge-accent">В процессе</span>' : '<span class="badge" style="background:rgba(148,163,184,.12);color:#94a3b8">Закрыто</span>';
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
          <button class="w-full text-left p-4 flex items-center gap-4" onclick="this.closest('.card').querySelector('.les').classList.toggle('hidden')">
            <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent text-lg"><i class="fa-solid ${m.icon}"></i></span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 justify-between">
                <div class="font-display font-bold text-white truncate">${i+1}. ${m.title}</div>
                ${status}
              </div>
              <div class="progress mt-2"><i style="width:${p}%"></i></div>
            </div>
            <i class="fa-solid fa-chevron-down text-slate-500"></i>
          </button>
          <div class="les hidden border-t border-white/10 p-2">
            ${lessonTpl.map((l,li)=>`<button onclick="openLesson(${i},${li})" class="w-full text-left flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5">
              <i class="fa-solid ${p===100?'fa-circle-check text-emerald-400':(p>0&&li===0?'fa-circle-play text-accent':'fa-circle text-slate-600')} text-sm"></i>
              <span class="text-sm text-slate-200 flex-1">${li+1}. ${l.t}</span>
              <span class="text-xs text-slate-500">${l.d}</span>
            </button>`).join('')}
          </div>`;
        wrap.appendChild(el);
      });
    }

    /* ---------- Lesson player ---------- */
    let curMod = 5, curLes = 1;
    function openLesson(mi, li) {
      curMod = mi; curLes = li;
      const m = modules[mi], l = lessonTpl[li];
      document.getElementById('lesson-mod').textContent = `Блок ${mi+1} · ${m.title}`;
      document.getElementById('lesson-title').textContent = l.t;
      document.getElementById('lesson-dur').textContent = l.d;
      document.getElementById('lesson-list-title').textContent = `Уроки · ${m.title}`;
      const list = document.getElementById('lesson-list');
      list.innerHTML = lessonTpl.map((x,xi)=>`<button onclick="openLesson(${mi},${xi})" class="w-full text-left flex items-center gap-3 p-2.5 rounded-lg ${xi===li?'bg-accent/10 border border-accent/30':'hover:bg-white/5'}">
        <i class="fa-solid ${xi<li?'fa-circle-check text-emerald-400':xi===li?'fa-circle-play text-accent':'fa-circle text-slate-600'} text-sm"></i>
        <span class="text-sm ${xi===li?'text-accent':'text-slate-200'} flex-1">${xi+1}. ${x.t}</span><span class="text-xs text-slate-500">${x.d}</span></button>`).join('');
      lessonTab('desc');
      document.getElementById('lesson-prev').onclick = () => { if (li>0) openLesson(mi,li-1); else if (mi>0) openLesson(mi-1, lessonTpl.length-1); };
      document.getElementById('lesson-next').onclick = () => { if (li<lessonTpl.length-1) openLesson(mi,li+1); else if (mi<modules.length-1) openLesson(mi+1,0); };
      showView('lesson');
    }
    function lessonTab(name) {
      document.querySelectorAll('[data-lt-panel]').forEach(p => p.classList.toggle('hidden', p.dataset.ltPanel !== name));
      document.querySelectorAll('.lt-tab').forEach(b => b.style.color = b.dataset.lt === name ? '#2DD4BF' : '');
    }

    /* ---------- Journal ---------- */
    let trades = [
      ['11.06','EUR/USD','Long','1%',3.0,'Цель'],
      ['10.06','BTC/USDT','Short','1%',-1.0,'Стоп'],
      ['09.06','US100','Long','1%',1.5,'Частичная'],
      ['06.06','GOLD','Long','1%',2.2,'Цель'],
      ['05.06','ETH/USDT','Short','1%',-1.0,'Стоп'],
      ['04.06','SOL/USDT','Long','0.5%',0.8,'Ручное'],
    ];
    let curFilter = 'all';
    function renderJournal() {
      const tb = document.getElementById('journal-rows'); tb.innerHTML = '';
      trades.filter(t => curFilter==='all' || (curFilter==='win'? t[4]>0 : t[4]<0)).forEach(t => {
        const tr = document.createElement('tr');
        const side = t[2]==='Long' ? '<span class="text-emerald-400">Long</span>' : '<span class="text-red-400">Short</span>';
        const r = (t[4]>0?'+':'')+t[4].toFixed(1)+'R';
        const res = `<span class="${t[4]>0?'text-emerald-400':'text-red-400'} font-semibold">${r}</span>`;
        tr.innerHTML = `<td class="text-slate-300">${t[0]}</td><td class="text-white font-medium">${t[1]}</td><td>${side}</td><td class="text-slate-300">${t[3]}</td><td>${res}</td><td class="text-slate-400">${t[5]}</td>`;
        tb.appendChild(tr);
      });
      // stats
      const wins = trades.filter(t=>t[4]>0).length;
      document.getElementById('jCount').textContent = trades.length;
      document.getElementById('jWin').textContent = Math.round(wins/trades.length*100)+'%';
      const avg = trades.reduce((a,t)=>a+t[4],0)/trades.length;
      document.getElementById('jAvg').textContent = (avg>=0?'+':'')+avg.toFixed(1);
    }
    function filterJournal(f, btn) { curFilter = f; document.querySelectorAll('[data-filter]').forEach(c=>c.classList.remove('active')); btn.classList.add('active'); renderJournal(); }
    function submitTrade(e) {
      e.preventDefault();
      const inst = document.getElementById('t-inst').value || '—';
      const side = document.getElementById('t-side').value;
      const risk = (document.getElementById('t-risk').value || '1') + '%';
      const res = parseFloat(document.getElementById('t-res').value.replace(',','.')) || 0;
      const note = document.getElementById('t-note').value || '—';
      const d = '11.06';
      trades.unshift([d, inst.toUpperCase(), side, risk, res, note]);
      renderJournal(); closeModal('addTrade'); e.target.reset(); document.getElementById('t-risk').value='1';
      toast('Сделка добавлена в дневник (демо)','success');
      return false;
    }

    /* ---------- Achievements ---------- */
    function renderAchievements() {
      const grid = document.getElementById('ach-grid');
      if (grid.dataset.built) return; grid.dataset.built='1';
      const ach = [
        ['fa-flag-checkered','Первый шаг','Пройден первый урок',1],
        ['fa-shield-halved','Риск-план собран','Завершён модуль риска',1],
        ['fa-fire','7 дней подряд','Неделя без пропусков',1],
        ['fa-book','Дневник 20+','20 записей в журнале',1],
        ['fa-diagram-project','Первая система','Собрана торговая система',1],
        ['fa-bullseye','Серия +5R','5R по сумме за неделю',1],
        ['fa-graduation-cap','Половина пути','50% курса пройдено',0],
        ['fa-brain','Холодная голова','30 сделок строго по плану',0],
        ['fa-trophy','Выпускник','Курс пройден на 100%',0],
        ['fa-building-columns','Проп-челлендж','Модуль проп-фирм завершён',0],
        ['fa-handshake','Капитал в работе','Модуль управления завершён',0],
        ['fa-crown','Мастер дисциплины','60 дней серии',0],
      ];
      ach.forEach(a => {
        const el = document.createElement('div');
        el.className = 'card card-hover p-5 flex items-center gap-4' + (a[3] ? '' : ' opacity-50');
        el.innerHTML = `<span class="inline-flex h-12 w-12 items-center justify-center rounded-xl ${a[3]?'bg-gradient-to-br from-accent to-accent2 text-ink':'bg-white/5 text-slate-500'} text-xl"><i class="fa-solid ${a[3]?a[0]:'fa-lock'}"></i></span>
          <div><div class="font-display font-bold text-white">${a[1]}</div><div class="text-xs text-slate-400">${a[2]}</div></div>${a[3]?'<i class="fa-solid fa-circle-check text-emerald-400 ml-auto"></i>':''}`;
        grid.appendChild(el);
      });
    }

    function submitPay(e) { e.preventDefault(); closeModal('checkout'); toast('Это демо — оплата не проводится. Платёжный шлюз подключается в боевой версии','info'); return false; }

    /* ---------- Init ---------- */
    const start = (location.hash || '#overview').slice(1);
    showView(titles[start] ? start : 'overview');
    window.addEventListener('hashchange', () => { const n = location.hash.slice(1); if (titles[n]) showView(n); });
;(function(){ if (document.readyState !== 'loading') { document.dispatchEvent(new Event('DOMContentLoaded')); } })();
