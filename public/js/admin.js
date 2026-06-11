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


/* ---------- Data ---------- */
    const modules = ['Фундамент графика','Торговая система и сэтапы','Управление капиталом','Психология','Интрадей','Свинг','Позиционная торговля','Долгосрочное инвестирование','Сезонность','Макро-нарратив','Проп-счета','Капитал в управление'];
    let students = [
      ['Иван Петров','ivan@mail.io','Личный',72,'58%','1 год','Активен'],
      ['Мария Сидорова','maria@mail.io','Менторство',54,'63%','навсегда','Активен'],
      ['Дмитрий К.','dk@mail.io','Групповой',95,'47%','—','Завершил'],
      ['Анна Лебедева','anna@mail.io','Личный',31,'51%','1 год','Активен'],
      ['Сергей М.','serg@mail.io','Групповой',18,'42%','на время','Активен'],
      ['Ольга В.','olga@mail.io','Менторство',88,'71%','навсегда','Активен'],
      ['Павел Романов','pavel@mail.io','Личный',60,'55%','1 год','Активен'],
      ['Никита З.','nikita@mail.io','Групповой',5,'—','на время','Новичок'],
      ['Елена Ткач','elena@mail.io','Менторство',77,'66%','навсегда','Активен'],
    ];
    let leads = [
      ['Игорь','igor@mail.io','@igor_tg','Личный','Instagram','11.06','Новая'],
      ['Светлана','sveta@mail.io','@sveta','Менторство','YouTube','11.06','Новая'],
      ['Артём','art@mail.io','@artem','Групповой','Telegram','10.06','Новая'],
      ['Роман','roman@mail.io','@roma','Личный','Реферал','09.06','В работе'],
      ['Юлия','julia@mail.io','@julia','Групповой','Instagram','08.06','В работе'],
      ['Максим','max@mail.io','@max','Менторство','YouTube','05.06','Закрыта'],
    ];
    const payments = [
      ['11.06','Иван Петров','Личный','$2000','Карта','Оплачено'],
      ['11.06','Ольга В.','Менторство','$5000','Карта','Оплачено'],
      ['10.06','Сергей М.','Групповой','$1000','СБП','Оплачено'],
      ['10.06','Аноним','Сервер · 1 год','$500','Карта','Оплачено'],
      ['09.06','Анна Лебедева','Личный','$2000','Карта','Оплачено'],
      ['08.06','Аноним','Сервер · 3 мес','$200','СБП','Оплачено'],
      ['07.06','Павел Романов','Личный','$2000','Карта','Оплачено'],
      ['06.06','Аноним','Сервер · 1 мес','$100','Карта','Возврат'],
    ];
    const lessonsPerMod = 3;

    /* ---------- CSV экспорт ---------- */
    function downloadCSV(name, header, rows) {
      const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
      const csv = [header, ...rows].map(r => r.map(esc).join(';')).join('\r\n');
      const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click();
      a.remove(); URL.revokeObjectURL(url);
      toast('Файл ' + name + ' выгружен', 'success');
    }
    function exportLeads() { downloadCSV('leads.csv', ['Имя','Email','Telegram','Интерес','Источник','Дата','Статус'], leads); }
    function exportPayments() { downloadCSV('payments.csv', ['Дата','Клиент','Продукт','Сумма','Метод','Статус'], payments); }

    /* ---------- Routing ---------- */
    const titles = { dashboard:'Дашборд', students:'Ученики', leads:'Заявки', content:'Контент', payments:'Платежи', server:'Сервер Secret Trading', analytics:'Аналитика', settings:'Настройки' };
    let charted = {};
    function showView(name) {
      document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.dataset.view === name));
      document.querySelectorAll('.nav-item[data-view]').forEach(n => n.classList.toggle('active', n.dataset.view === name));
      document.getElementById('page-title').textContent = titles[name] || 'Админ';
      if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
      document.querySelector('.app-side').classList.remove('open'); document.querySelector('.side-backdrop').classList.remove('open');
      window.scrollTo({ top: 0 });
      if (name === 'dashboard' && !charted.rev) { charted.rev = 1; drawLineChart(document.getElementById('admRevenue'), { height:220, points:80, trend:0.55 }); renderRevByFormat(); renderDashLeads(); }
      if (name === 'students') renderStudents();
      if (name === 'leads') renderLeads();
      if (name === 'content') renderContent();
      if (name === 'payments') renderPayments();
      if (name === 'analytics' && !charted.traf) { charted.traf = 1; drawLineChart(document.getElementById('admTraffic'), { height:220, points:90, trend:0.4 }); renderSources(); }
    }
    document.querySelectorAll('[data-view]').forEach(el => el.addEventListener('click', () => { if (el.dataset.view) showView(el.dataset.view); }));
    document.querySelectorAll('[data-view-link]').forEach(el => el.addEventListener('click', () => showView(el.dataset.viewLink)));

    /* ---------- Dashboard widgets ---------- */
    function bar(label, val, max, money) {
      return `<div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">${label}</span><span class="text-white">${money?'$':''}${val.toLocaleString('ru')}</span></div><div class="progress"><i style="width:${Math.round(val/max*100)}%"></i></div></div>`;
    }
    function renderRevByFormat() {
      const d = [['Групповой',12000],['Личный',24000],['Менторство',15000],['Сервер',9800]]; const max = 24000;
      document.getElementById('revByFormat').innerHTML = d.map(x => bar(x[0], x[1], max, true)).join('');
    }
    function renderDashLeads() {
      document.getElementById('dashLeads').innerHTML = leads.slice(0,4).map((l,i) => `
        <button onclick="openLead(${leads.indexOf(l)})" class="w-full text-left surface p-3 flex items-center justify-between hover:bg-white/[0.06]">
          <div><div class="text-white text-sm">${l[0]} · ${l[3]}</div><div class="text-xs text-slate-500">${l[4]} · ${l[5]}</div></div>
          ${statusBadge(l[6])}</button>`).join('');
    }
    function renderSources() {
      const d = [['Instagram',42],['YouTube',28],['Telegram',18],['Реферал',12]];
      document.getElementById('sources').innerHTML = d.map(x => `<div><div class="flex justify-between text-sm mb-1"><span class="text-slate-300">${x[0]}</span><span class="text-white">${x[1]}%</span></div><div class="progress"><i style="width:${x[1]}%"></i></div></div>`).join('');
    }

    /* ---------- Students ---------- */
    let sFilter = 'all';
    function statusBadge(s) {
      const m = { 'Активен':'badge-green','Завершил':'badge-blue','Новичок':'badge-accent','Новая':'badge-accent','В работе':'badge-yellow','Закрыта':'badge', };
      const cls = m[s] || 'badge';
      const style = cls==='badge' ? 'style="background:rgba(148,163,184,.15);color:#94a3b8"' : '';
      return `<span class="badge ${cls}" ${style}>${s}</span>`;
    }
    function renderStudents() {
      const q = (document.getElementById('studentSearch').value || '').toLowerCase();
      const tb = document.getElementById('studentsRows'); tb.innerHTML = '';
      students.filter(s => (sFilter==='all'||s[2]===sFilter) && (s[0].toLowerCase().includes(q)||s[1].toLowerCase().includes(q))).forEach((s) => {
        const idx = students.indexOf(s);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><div class="text-white font-medium">${s[0]}</div><div class="text-xs text-slate-500">${s[1]}</div></td>
          <td>${statusBadge2(s[2])}</td>
          <td><div class="progress" style="width:120px"><i style="width:${s[3]}%"></i></div><div class="text-xs text-slate-500 mt-1">${s[3]}%</div></td>
          <td class="text-white">${s[4]}</td>
          <td class="text-slate-300">${s[5]}</td>
          <td>${statusBadge(s[6])}</td>
          <td><button onclick="openStudent(${idx})" class="btn btn-outline btn-sm">Открыть</button></td>`;
        tb.appendChild(tr);
      });
    }
    function statusBadge2(f){ const m={'Групповой':'badge-blue','Личный':'badge-accent','Менторство':'badge-yellow'}; return `<span class="badge ${m[f]||'badge-blue'}">${f}</span>`; }
    function filterStudents(f, btn){ sFilter=f; document.querySelectorAll('[data-sf]').forEach(c=>c.classList.remove('active')); btn.classList.add('active'); renderStudents(); }
    function openStudent(i){
      const s = students[i];
      document.getElementById('studentBody').innerHTML = `
        <div class="flex items-center gap-3 mb-4"><span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent2/40 text-white font-bold">${s[0][0]}</span>
          <div><div class="text-white font-semibold">${s[0]}</div><div class="text-xs text-slate-500">${s[1]}</div></div><div class="ml-auto">${statusBadge2(s[2])}</div></div>
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="surface p-3 text-center"><div class="text-xs text-slate-400">Прогресс</div><div class="text-lg font-bold text-white">${s[3]}%</div></div>
          <div class="surface p-3 text-center"><div class="text-xs text-slate-400">Винрейт</div><div class="text-lg font-bold text-white">${s[4]}</div></div>
          <div class="surface p-3 text-center"><div class="text-xs text-slate-400">Сервер</div><div class="text-lg font-bold text-white">${s[5]}</div></div>
        </div>
        <div class="flex gap-2"><button class="btn btn-primary btn-sm" data-toast="Демо: открыт чат с учеником">Написать</button>
          <button class="btn btn-outline btn-sm" data-toast="Демо: открыт кабинет ученика">Кабинет</button>
          <button class="btn btn-outline btn-sm" data-toast="Демо: история платежей ученика">Платежи</button></div>`;
      document.getElementById('studentBody').querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.toast,'info')));
      openModal('studentModal');
    }

    /* ---------- Leads ---------- */
    let lFilter = 'all';
    function renderLeads() {
      const tb = document.getElementById('leadsRows'); tb.innerHTML = '';
      leads.filter(l => lFilter==='all'||l[6]===lFilter).forEach((l) => {
        const idx = leads.indexOf(l);
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="text-white font-medium">${l[0]}</td>
          <td><div class="text-slate-300 text-xs">${l[1]}</div><div class="text-xs text-accent">${l[2]}</div></td>
          <td>${statusBadge2(l[3])}</td><td class="text-slate-300">${l[4]}</td><td class="text-slate-400">${l[5]}</td>
          <td>${statusBadge(l[6])}</td>
          <td><button onclick="openLead(${idx})" class="btn btn-outline btn-sm">Открыть</button></td>`;
        tb.appendChild(tr);
      });
      updateLeadBadge();
    }
    function filterLeads(f, btn){ lFilter=f; document.querySelectorAll('[data-lf]').forEach(c=>c.classList.remove('active')); btn.classList.add('active'); renderLeads(); }
    function updateLeadBadge(){ const n = leads.filter(l=>l[6]==='Новая').length; const b=document.getElementById('leadBadge'); b.textContent=n; b.style.display=n?'':'none'; }
    function openLead(i){
      const l = leads[i];
      document.getElementById('leadBody').innerHTML = `
        <div class="space-y-1 mb-4"><div class="text-white text-lg font-semibold">${l[0]}</div>
          <div class="text-sm text-slate-400">${l[1]} · <span class="text-accent">${l[2]}</span></div>
          <div class="text-sm text-slate-400">Интерес: ${statusBadge2(l[3])} · Источник: ${l[4]} · ${l[5]}</div>
          <div class="mt-2">Статус: ${statusBadge(l[6])}</div></div>
        <div class="flex flex-wrap gap-2">
          <button onclick="setLead(${i},'В работе')" class="btn btn-primary btn-sm">Взять в работу</button>
          <button onclick="setLead(${i},'Закрыта')" class="btn btn-outline btn-sm">Закрыть</button>
          <button class="btn btn-outline btn-sm" data-toast="Демо: написать в Telegram">Написать</button></div>`;
      document.getElementById('leadBody').querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.toast,'info')));
      openModal('leadModal');
    }
    function setLead(i, status){ leads[i][6]=status; renderLeads(); renderDashLeads(); closeModal('leadModal'); toast('Статус заявки: '+status+' (демо)','success'); }

    /* ---------- Content ---------- */
    const modProg = [100,100,100,100,100,40,0,0,0,0,0,0];
    function renderContent() {
      const wrap = document.getElementById('contentList'); wrap.innerHTML = '';
      modules.forEach((m, i) => {
        const pub = modProg[i] > 0;
        const el = document.createElement('div'); el.className = 'card p-4';
        el.innerHTML = `<div class="flex items-center gap-4">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent font-bold">${i+1}</span>
          <div class="flex-1 min-w-0"><div class="text-white font-medium truncate">${m}</div><div class="text-xs text-slate-500">${lessonsPerMod} урока · ${pub?'опубликован':'черновик'}</div></div>
          <span class="badge ${pub?'badge-green':''}" ${pub?'':'style="background:rgba(148,163,184,.15);color:#94a3b8"'}>${pub?'Опубликован':'Черновик'}</span>
          <button class="btn btn-outline btn-sm" data-toast="Демо: редактирование блока «${m}»">Изменить</button>
        </div>`;
        el.querySelector('[data-toast]').addEventListener('click', e => toast(e.target.dataset.toast,'info'));
        wrap.appendChild(el);
      });
      // fill modal select
      const sel = document.getElementById('al-mod'); if (sel && !sel.dataset.f){ sel.dataset.f='1'; sel.innerHTML = modules.map((m,i)=>`<option>${i+1}. ${m}</option>`).join(''); }
    }
    function addLessonSubmit(e){ e.preventDefault(); closeModal('addLesson'); e.target.reset(); toast('Урок создан (демо)','success'); return false; }

    /* ---------- Payments ---------- */
    function renderPayments(){
      const tb = document.getElementById('payRows'); if (tb.dataset.b) return; tb.dataset.b='1';
      payments.forEach(p => { const tr=document.createElement('tr');
        const st = p[5]==='Оплачено'?'<span class="badge badge-green">Оплачено</span>':'<span class="badge badge-red">Возврат</span>';
        tr.innerHTML = `<td class="text-slate-300">${p[0]}</td><td class="text-white">${p[1]}</td><td class="text-slate-300">${p[2]}</td><td class="text-white font-medium">${p[3]}</td><td class="text-slate-400">${p[4]}</td><td>${st}</td>`;
        tb.appendChild(tr); });
    }

    /* ---------- Server ---------- */
    function postReview(e){ e.preventDefault(); e.target.reset(); toast('Обзор опубликован на сервере Secret Trading (демо)','success'); return false; }

    /* ---------- Init ---------- */
    const start = (location.hash || '#dashboard').slice(1);
    showView(titles[start] ? start : 'dashboard');
    window.addEventListener('hashchange', () => { const n = location.hash.slice(1); if (titles[n]) showView(n); });
;(function(){ if (document.readyState !== 'loading') { document.dispatchEvent(new Event('DOMContentLoaded')); } })();
