const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
    const smooth = (t) => t*t*(3-2*t);
    const lerp = (a,b,t) => a + (b-a)*t;

    /* ---------- Burger ---------- */
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    function closeMenu(){ mobileMenu.classList.add('hidden'); burger.innerHTML = '<i class="fa-solid fa-bars text-lg"></i>'; }
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      burger.innerHTML = mobileMenu.classList.contains('hidden') ? '<i class="fa-solid fa-bars text-lg"></i>' : '<i class="fa-solid fa-xmark text-lg"></i>';
    });

    /* ---------- Smooth anchor scroll (offset for sticky header) ---------- */
    function scrollToId(id){ const t = document.querySelector(id); if(!t) return;
      const y = t.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' }); }
    document.querySelectorAll('a.anchor').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        if (id === '#top') { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); closeMenu(); return; }
        const t = document.querySelector(id); if (!t) return;
        e.preventDefault(); scrollToId(id); closeMenu();
      });
    });
    function enterCabinet(){ scrollToId('#cabinet'); toast('Это демо личного кабинета. В боевой версии — вход по логину','info'); }

    /* ---------- Toast ---------- */
    function toast(message, type='success') {
      const wrap = document.getElementById('toast-wrap');
      const el = document.createElement('div');
      const colors = { success:'border-accent/40 text-accent', info:'border-accent2/40 text-accent2', warn:'border-yellow-400/40 text-yellow-300' };
      const icons = { success:'fa-circle-check', info:'fa-circle-info', warn:'fa-triangle-exclamation' };
      el.className = `toast glass border ${colors[type]||colors.success} rounded-xl px-4 py-3 shadow-2xl flex items-start gap-3`;
      el.innerHTML = `<i class="fa-solid ${icons[type]||icons.success} mt-0.5"></i><span class="text-sm text-slate-100">${message}</span>`;
      wrap.appendChild(el);
      requestAnimationFrame(() => el.classList.add('show'));
      setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 4200);
    }

    /* ---------- Lead form ---------- */
    document.getElementById('lead-form').addEventListener('submit', (e) => {
      e.preventDefault();
      toast('Спасибо! Это демо-версия. В реальном проекте мы свяжемся с вами в течение часа','success');
      e.target.reset();
    });

    /* ---------- Ticker ---------- */
    (function () {
      const items = [['BTC','+2.4%',1],['ETH','+1.1%',1],['SOL','-0.8%',0],['EUR/USD','+0.3%',1],['GOLD','+0.6%',1],['SP500','-0.2%',0],['NASDAQ','+0.9%',1],['OIL','-1.3%',0],['BNB','+0.5%',1],['XRP','-0.4%',0],['DXY','+0.1%',1],['GBP/USD','-0.2%',0]];
      const make = (s,c,u) => `<span class="inline-flex items-center gap-2 px-6 text-slate-400"><span class="text-slate-200 font-semibold">${s}</span><span class="${u?'text-emerald-400':'text-red-400'}"><i class="fa-solid fa-caret-${u?'up':'down'}"></i> ${c}</span></span>`;
      const row = items.map(i => make(...i)).join('');
      document.getElementById('ticker').innerHTML = row + row;
    })();

    /* ---------- Course curriculum (12 blocks) ---------- */
    const modules = [
      { icon:'fa-chart-line',       title:'Фундамент работы с графиком', desc:'Как читать график: структура рынка, уровни, тренды, свечи и паттерны. База, на которой строится всё остальное.' },
      { icon:'fa-diagram-project',  title:'Торговая система и 3+ сэтапа', desc:'Готовая торговая система и более трёх торговых моделей/сэтапов внутри неё — с чёткими правилами входа, стопа и выхода.' },
      { icon:'fa-shield-halved',    title:'Управление капиталом и риск', desc:'Risk Management — сердце системы. Размер позиции, риск на сделку, контроль просадки. Как защитить счёт в серии убытков.' },
      { icon:'fa-brain',            title:'Психология трейдинга', desc:'Страх, жадность, переторговка. Дневник сделок, работа с эмоциями и формирование устойчивых торговых привычек.' },
      { icon:'fa-bolt',             title:'Основы интрадей-трейдинга', desc:'Внутридневная торговля: тайминги сессий, ликвидность, быстрые сэтапы и управление сделкой в течение дня.' },
      { icon:'fa-wave-square',      title:'Основы свинг-трейдинга', desc:'Удержание позиций от нескольких дней до недель: работа со среднесроком, переносы и сопровождение позиции.' },
      { icon:'fa-mountain',         title:'Основы позиционной торговли', desc:'Долгосрочные удержания и крупные движения: как ловить большие тренды и спокойно высиживать позицию.' },
      { icon:'fa-seedling',         title:'Основы долгосрочного инвестирования', desc:'Портфель, горизонты, диверсификация и сложный процент. Чем инвестирование отличается от спекуляций.' },
      { icon:'fa-calendar-days',    title:'Сезонность в экономике', desc:'Сезонные закономерности рынков и экономических циклов и как аккуратно учитывать их в торговых решениях.' },
      { icon:'fa-newspaper',        title:'Макроэкономический нарратив (новости)', desc:'Как читать новости и макро-нарратив, понимать контекст движения цены и не торговать на эмоциях от заголовков.' },
      { icon:'fa-building-columns', title:'Математика работы с проп-счетами', desc:'Системная работа с проп-фирмами (FTMO, Topstep): математика риска, прохождение челленджа и удержание счёта строго в рамках правил. Без обещаний гарантированной прибыли.' },
      { icon:'fa-handshake',        title:'Капитал в управление', desc:'Как и где легально привлекать капитал в управление: модели работы с проп-фирмами и инвесторами, ограничения и ответственность.' },
    ];

    /* ---------- Modal ---------- */
    const modal = document.getElementById('modal'), modalPanel = document.getElementById('modal-panel'), modalBackdrop = document.getElementById('modal-backdrop');
    function openModal(m,i) {
      document.getElementById('modal-icon').innerHTML = `<i class="fa-solid ${m.icon}"></i>`;
      document.getElementById('modal-tag').textContent = 'Блок ' + (i+1);
      document.getElementById('modal-title').textContent = m.title;
      document.getElementById('modal-desc').textContent = m.desc;
      modal.classList.remove('hidden'); modal.classList.add('flex');
      requestAnimationFrame(() => { modalBackdrop.classList.remove('opacity-0'); modalPanel.classList.remove('opacity-0','scale-95'); });
    }
    function closeModal() {
      modalBackdrop.classList.add('opacity-0'); modalPanel.classList.add('opacity-0','scale-95');
      setTimeout(() => { modal.classList.add('hidden'); modal.classList.remove('flex'); }, 250);
    }
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    /* ---------- Spotlight ---------- */
    document.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.card-hover'); if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });

    /* ---------- Magnetic buttons ---------- */
    if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
      document.querySelectorAll('.magnetic').forEach((el) => {
        el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.2}px, ${(e.clientY-r.top-r.height/2)*0.3 - 2}px)`; });
        el.addEventListener('pointerleave', () => { el.style.transform = ''; });
      });
    }

    /* ---------- Count-up ---------- */
    function countUp(el) { const target = +el.dataset.to; const dur = 1400; let start = null;
      function step(ts){ if(!start) start=ts; const p=Math.min((ts-start)/dur,1); el.textContent=Math.round((1-Math.pow(1-p,3))*target); if(p<1) requestAnimationFrame(step); }
      requestAnimationFrame(step); }

    /* ---------- Reveal observer ---------- */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('count')) countUp(entry.target);
        io.unobserve(entry.target);
      } });
    }, { threshold: 0.14 });
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .count').forEach((el) => io.observe(el));

    /* ===================== SCROLL ENGINE ===================== */
    const scrollyItems = [];
    function registerScrolly(el, onProgress) { scrollyItems.push({ el, onProgress }); }
    const progressBar = document.getElementById('progress');
    const toTop = document.getElementById('toTop');
    const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
    const revealWords = [...document.querySelectorAll('.reveal-words')];

    let ticking = false;
    function onScroll() { if (!ticking) { requestAnimationFrame(tick); ticking = true; } }
    function tick() {
      ticking = false;
      const vh = window.innerHeight, doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      progressBar.style.width = (scrolled * 100) + '%';
      toTop.classList.toggle('show', doc.scrollTop > 600);
      scrollyItems.forEach(s => { const r = s.el.getBoundingClientRect();
        if (r.bottom < -60 || r.top > vh + 60) return; // вне экрана — не пересчитываем тяжёлый рендер
        const denom = s.el.offsetHeight - vh;
        s.onProgress(denom > 0 ? clamp(-r.top / denom, 0, 1) : 0); });
      if (!reduceMotion) parallaxEls.forEach(el => { const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        el.style.transform = `translateY(${(r.top + r.height/2 - vh/2) * -(+el.dataset.parallax)}px)`; });
      revealWords.forEach(p => { const pr = p.getBoundingClientRect();
        if (pr.bottom < 0 || pr.top > vh) return; // секция вне экрана — слова не трогаем
        const trigger = vh * 0.78;
        p.querySelectorAll('.w').forEach(w => { w.classList.toggle('lit', w.getBoundingClientRect().top < trigger); }); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measureCarousel(); onScroll(); });

    /* ---------- Pinned morphing stage chart ---------- */
    (function () {
      const section = document.getElementById('how');
      const canvas = document.getElementById('stageChart');
      const phaseEl = document.getElementById('stagePhase');
      const stepCards = [...section.querySelectorAll('.step-card')];
      const pills = [...section.querySelectorAll('.stage-pill')];
      const phases = ['Хаос → Структура','Защита риском','Психология','Готовая система'];
      const ctx = canvas.getContext('2d');
      const N = 120, chaos = [], clean = []; let cv = 50;
      for (let i=0;i<N;i++){ chaos.push(50 + Math.sin(i*0.9)*22 + Math.sin(i*0.27)*16 + ((i*53)%17-8));
        cv += 0.5 + Math.sin(i*0.08)*0.5; clean.push(28 + cv*0.55 + Math.sin(i*0.3)*4); }
      const cmin = Math.min(...chaos,...clean), cmax = Math.max(...chaos,...clean);
      function resize(){ const r=window.devicePixelRatio||1; canvas.width=canvas.clientWidth*r; canvas.height=340*r; ctx.setTransform(r,0,0,r,0,0); }
      resize(); window.addEventListener('resize', resize);
      let curP = 0;
      function render(p) {
        const w=canvas.clientWidth, h=340, pad=14; ctx.clearRect(0,0,w,h);
        ctx.strokeStyle='rgba(148,163,184,0.07)'; ctx.lineWidth=1;
        for (let g=0;g<=4;g++){ const y=(h/4)*g; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
        const t=smooth(p); const xAt=i=>pad+(i/(N-1))*(w-pad*2); const yAt=v=>pad+(1-(v-cmin)/(cmax-cmin))*(h-pad*2); const blend=i=>lerp(chaos[i],clean[i],t);
        const aRisk=clamp((p-0.18)/0.22,0,1);
        if (aRisk>0){ const yStop=yAt(blend(N-1)-16), yTgt=yAt(blend(N-1)+22); ctx.setLineDash([5,5]);
          ctx.strokeStyle=`rgba(248,113,113,${0.5*aRisk})`; ctx.beginPath(); ctx.moveTo(0,yStop); ctx.lineTo(w,yStop); ctx.stroke();
          ctx.strokeStyle=`rgba(52,211,153,${0.5*aRisk})`; ctx.beginPath(); ctx.moveTo(0,yTgt); ctx.lineTo(w,yTgt); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle=`rgba(248,113,113,${0.7*aRisk})`; ctx.font='11px Inter'; ctx.fillText('stop',6,yStop-6);
          ctx.fillStyle=`rgba(52,211,153,${0.7*aRisk})`; ctx.fillText('target',6,yTgt-6); }
        const col=`rgb(${Math.round(lerp(248,45,t))},${Math.round(lerp(113,212,t))},${Math.round(lerp(113,191,t))})`;
        const grad=ctx.createLinearGradient(0,0,0,h); grad.addColorStop(0,`rgba(45,212,191,${0.05+0.2*t})`); grad.addColorStop(1,'rgba(45,212,191,0)');
        ctx.beginPath(); ctx.moveTo(xAt(0),h); for(let i=0;i<N;i++) ctx.lineTo(xAt(i),yAt(blend(i))); ctx.lineTo(xAt(N-1),h); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
        ctx.beginPath(); for(let i=0;i<N;i++){ const x=xAt(i),y=yAt(blend(i)); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
        ctx.strokeStyle=col; ctx.lineWidth=2.6; ctx.lineJoin='round'; ctx.shadowColor=`rgba(45,212,191,${0.5*t})`; ctx.shadowBlur=14*t; ctx.stroke(); ctx.shadowBlur=0;
        const aPsy=clamp((p-0.45)/0.22,0,1);
        if (aPsy>0){ ctx.fillStyle=`rgba(139,92,246,${aPsy})`; [22,48,74,98].forEach(i=>{ ctx.beginPath(); ctx.arc(xAt(i),yAt(blend(i)),3.4,0,Math.PI*2); ctx.fill(); }); }
        const aSys=clamp((p-0.7)/0.25,0,1);
        if (aSys>0){ const eIdx=18,xIdx=N-10; ctx.fillStyle=`rgba(96,165,250,${aSys})`; ctx.beginPath(); ctx.arc(xAt(eIdx),yAt(blend(eIdx)),5,0,Math.PI*2); ctx.fill();
          ctx.fillStyle=`rgba(45,212,191,${aSys})`; ctx.beginPath(); ctx.arc(xAt(xIdx),yAt(blend(xIdx)),5,0,Math.PI*2); ctx.fill();
          ctx.fillStyle=`rgba(203,213,225,${aSys})`; ctx.font='11px Inter'; ctx.fillText('вход',xAt(eIdx)-8,yAt(blend(eIdx))+18); ctx.fillText('выход +3R',xAt(xIdx)-54,yAt(blend(xIdx))-10); }
      }
      registerScrolly(section, (p) => { curP=p; render(p);
        const active=clamp(Math.round(p*3),0,3);
        stepCards.forEach((c,i)=>c.classList.toggle('active',i===active));
        pills.forEach((c,i)=>c.classList.toggle('text-accent',i<=active));
        phaseEl.textContent=phases[active]; });
      const mio = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ resize(); render(curP); } }); }); mio.observe(canvas);
      render(0);
    })();

    /* ======================= AUTO CAROUSEL ======================= */
    const cTrack = document.getElementById('program-track');
    const cMask = document.getElementById('c-mask');
    let cx=0, cEV=0, cHover=false, cDragging=false, cLastX=0, cMoved=0, cDragged=false, cHalf=0;
    const C_SPEED = 0.5;
    (function build(){
      const frag = document.createDocumentFragment();
      for (let pass=0; pass<2; pass++) modules.forEach((m,i) => {
        const card = document.createElement('a');
        card.href = '/trading-course-landing/course/' + (i + 1) + '/';
        card.className = 'c-card card-hover block text-left rounded-2xl border border-white/10 bg-ink2/60 p-6 group';
        card.innerHTML = `
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent text-xl group-hover:bg-accent group-hover:text-ink group-hover:scale-110 transition-all"><i class="fa-solid ${m.icon}"></i></span>
            <span class="text-xs font-mono text-slate-500">${String(i+1).padStart(2,'0')}</span>
          </div>
          <h3 class="font-display font-bold text-white leading-snug min-h-[3rem]">${m.title}</h3>
          <p class="text-sm text-slate-400 mt-2 line-clamp-3">${m.desc}</p>
          <span class="mt-4 inline-flex items-center gap-1.5 text-sm text-accent">Подробнее <i class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i></span>`;
        card.addEventListener('click', (e) => { if (cDragged) { e.preventDefault(); } });
        frag.appendChild(card);
      });
      cTrack.appendChild(frag);
    })();
    function measureCarousel(){ cHalf = cTrack.scrollWidth / 2; }
    measureCarousel(); window.addEventListener('load', measureCarousel);
    cMask.addEventListener('mouseenter', () => cHover = true);
    cMask.addEventListener('mouseleave', () => cHover = false);
    cMask.addEventListener('pointerdown', (e) => { cDragging=true; cLastX=e.clientX; cMoved=0; cDragged=false; });
    window.addEventListener('pointermove', (e) => { if(!cDragging) return; const dx=e.clientX-cLastX; cx+=dx; cLastX=e.clientX; cMoved+=Math.abs(dx); if(cMoved>6) cDragged=true; });
    window.addEventListener('pointerup', () => { if(!cDragging) return; cDragging=false; setTimeout(()=>cDragged=false, 50); });
    document.getElementById('c-next').addEventListener('click', () => { cEV -= 55; });
    document.getElementById('c-prev').addEventListener('click', () => { cEV += 55; });
    function carouselLoop(){
      if (!cHover && !cDragging) cx -= C_SPEED;
      cx += cEV; cEV *= 0.86; if (Math.abs(cEV) < 0.05) cEV = 0;
      if (cHalf > 0){ while (cx <= -cHalf) cx += cHalf; while (cx > 0) cx -= cHalf; }
      cTrack.style.transform = `translate3d(${cx}px,0,0)`;
      requestAnimationFrame(carouselLoop);
    }
    requestAnimationFrame(carouselLoop);

    /* ======================= CABINET DEMO ======================= */
    // tabs
    document.querySelectorAll('#cabinet .tab-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('#cabinet .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('#cabinet [data-panel]').forEach(p => p.classList.toggle('hidden', p.dataset.panel !== tab));
      });
    });
    // lessons list
    (function(){
      const prog = [100,100,100,100,100,40,0,0,0,0,0,0];
      const list = document.getElementById('lessons-list');
      modules.forEach((m,i) => {
        const p = prog[i];
        const status = p===100 ? '<span class="text-emerald-400">Завершён</span>' : p>0 ? '<span class="text-accent">В процессе</span>' : '<span class="text-slate-500">Закрыто</span>';
        const icon = p===100 ? 'fa-circle-check text-emerald-400' : p>0 ? 'fa-circle-play text-accent' : 'fa-lock text-slate-600';
        const row = document.createElement('div');
        row.className = 'rounded-xl border ' + (p>0&&p<100 ? 'border-accent/40 bg-accent/[0.05]' : 'border-white/10 bg-white/[0.03]') + ' p-4 flex items-center gap-4';
        row.innerHTML = `
          <i class="fa-solid ${icon} text-lg w-5 text-center"></i>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-3">
              <div class="font-medium text-white truncate">${i+1}. ${m.title}</div>
              <div class="text-xs shrink-0">${status}</div>
            </div>
            <div class="h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-accent to-accent2" style="width:${p}%"></div></div>
          </div>
          <button onclick="${p>0?`toast('Демо: урок откроется в полной версии','info')`:`toast('Сначала пройдите предыдущие блоки','warn')`}" class="shrink-0 text-xs px-3 py-2 rounded-lg ${p>0?'bg-accent/15 text-accent':'bg-white/5 text-slate-500'} hover:opacity-80">${p===100?'Повторить':p>0?'Продолжить':'Открыть'}</button>`;
        list.appendChild(row);
      });
    })();
    // journal rows
    (function(){
      const rows = [
        ['11 июн','EUR/USD','Long','+3.0R','Цель','up'],
        ['10 июн','BTC/USDT','Short','−1.0R','Стоп','down'],
        ['09 июн','US100','Long','+1.5R','Частичная фиксация','up'],
        ['06 июн','GOLD','Long','+2.2R','Цель','up'],
        ['05 июн','ETH/USDT','Short','−1.0R','Стоп','down'],
        ['04 июн','SOL/USDT','Long','+0.8R','Ручное закрытие','up'],
      ];
      const tb = document.getElementById('journal-rows');
      rows.forEach(r => {
        const tr = document.createElement('tr'); tr.className='hover:bg-white/[0.03]';
        const side = r[2]==='Long' ? '<span class="text-emerald-400">Long</span>' : '<span class="text-red-400">Short</span>';
        const res = r[5]==='up' ? `<span class="text-emerald-400 font-semibold">${r[3]}</span>` : `<span class="text-red-400 font-semibold">${r[3]}</span>`;
        tr.innerHTML = `<td class="px-4 py-3 text-slate-300">${r[0]}</td><td class="px-4 py-3 text-white font-medium">${r[1]}</td><td class="px-4 py-3">${side}</td><td class="px-4 py-3 text-slate-300">1%</td><td class="px-4 py-3">${res}</td><td class="px-4 py-3 text-slate-400">${r[4]}</td>`;
        tb.appendChild(tr);
      });
    })();
    // equity canvas + animate stats on view
    function drawEquity(){
      const canvas = document.getElementById('eqChart'); if(!canvas) return;
      const ctx = canvas.getContext('2d');
      const r=window.devicePixelRatio||1; canvas.width=canvas.clientWidth*r; canvas.height=200*r; ctx.setTransform(r,0,0,r,0,0);
      const N=80, data=[]; let v=100;
      for(let i=0;i<N;i++){ v += Math.sin(i*0.25)*0.7 + 0.45 + ((i*37)%11-5)*0.18; if(i%17===0) v-=2.2; data.push(v); }
      const min=Math.min(...data), max=Math.max(...data);
      let prog=0;
      (function frame(){ const w=canvas.clientWidth,h=200,pad=8; ctx.clearRect(0,0,w,h);
        ctx.strokeStyle='rgba(148,163,184,0.07)'; ctx.lineWidth=1; for(let g=0;g<=3;g++){ const y=(h/3)*g; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
        const count=Math.floor(prog), xAt=i=>(i/(N-1))*w, yAt=val=>pad+(1-(val-min)/(max-min))*(h-pad*2);
        const grad=ctx.createLinearGradient(0,0,0,h); grad.addColorStop(0,'rgba(45,212,191,0.25)'); grad.addColorStop(1,'rgba(45,212,191,0)');
        ctx.beginPath(); ctx.moveTo(0,h); for(let i=0;i<=count&&i<N;i++) ctx.lineTo(xAt(i),yAt(data[i])); ctx.lineTo(xAt(Math.min(count,N-1)),h); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
        ctx.beginPath(); for(let i=0;i<=count&&i<N;i++){ const x=xAt(i),y=yAt(data[i]); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
        ctx.strokeStyle='#2DD4BF'; ctx.lineWidth=2.4; ctx.lineJoin='round'; ctx.shadowColor='rgba(45,212,191,0.5)'; ctx.shadowBlur=10; ctx.stroke(); ctx.shadowBlur=0;
        if(prog<N-1){ prog+=1.1; requestAnimationFrame(frame); } })();
    }
    (function(){
      const cab = document.getElementById('cabinet'); let done=false;
      const obs = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting && !done){ done=true;
        document.querySelectorAll('#cabinet .bar').forEach(b=> b.style.width=b.dataset.w);
        const ring=document.getElementById('progRing'), circ=213.6, pct=45;
        ring.style.strokeDashoffset = circ*(1-pct/100);
        const pctEl=document.getElementById('progPct'); let s=null;
        (function up(ts){ if(!s)s=ts; const t=Math.min((ts-s)/1300,1); pctEl.textContent=Math.round((1-Math.pow(1-t,3))*pct); if(t<1) requestAnimationFrame(up); })(performance.now());
        drawEquity();
      } }); }, { threshold:0.2 });
      obs.observe(cab);
    })();
    window.addEventListener('resize', () => { if (document.getElementById('eqChart').clientWidth) drawEquity(); });

    /* ---------- Background candles ---------- */
    (function () {
      if (reduceMotion) return;
      const canvas = document.getElementById('candles'); const ctx = canvas.getContext('2d');
      let W,H,candles=[]; const RATIO = Math.min(window.devicePixelRatio||1, 1.25);
      function resize(){ W=window.innerWidth; H=window.innerHeight; canvas.width=W*RATIO; canvas.height=H*RATIO; ctx.setTransform(RATIO,0,0,RATIO,0,0); }
      function seed(i,n){ return { x:(i/n)*W+((i*53)%40), y:H+((i*37)%H), w:6+(i%4)*2, body:14+(i%5)*8, wick:8+(i%3)*6, speed:0.25+((i%5)*0.12), up:(i*7)%3!==0, alpha:0.05+((i%4)*0.02) }; }
      function init(){ resize(); const n=Math.max(8,Math.floor(W/130)); candles=Array.from({length:n},(_,i)=>seed(i,n)); }
      let last=0;
      function draw(t){ requestAnimationFrame(draw); if (document.hidden) return; if (t-last < 40) return; last=t;
        ctx.clearRect(0,0,W,H); candles.forEach(c=>{ c.y-=c.speed*1.6; if(c.y+c.body+c.wick<-20) c.y=H+40;
        const col=c.up?'45,212,191':'59,130,246'; ctx.strokeStyle=`rgba(${col},${c.alpha+0.04})`; ctx.lineWidth=1.2;
        ctx.beginPath(); ctx.moveTo(c.x,c.y-c.wick); ctx.lineTo(c.x,c.y+c.body+c.wick); ctx.stroke();
        ctx.fillStyle=`rgba(${col},${c.alpha})`; ctx.fillRect(c.x-c.w/2,c.y,c.w,c.body); }); }
      init(); window.addEventListener('resize', init); requestAnimationFrame(draw);
    })();

    /* ---------- Hero chart ---------- */
    (function () {
      const canvas = document.getElementById('priceChart'); if (!canvas) return;
      const ctx = canvas.getContext('2d'); const pctEl = canvas.parentElement.querySelector('.font-mono.text-accent');
      function resize(){ const r=window.devicePixelRatio||1; canvas.width=canvas.clientWidth*r; canvas.height=280*r; ctx.setTransform(r,0,0,r,0,0); }
      resize(); window.addEventListener('resize', resize);
      const N=140, data=[]; let v=50;
      for(let i=0;i<N;i++){ const noise=Math.sin(i*0.35)*6+Math.sin(i*0.11)*10; v+=(Math.sin(i*0.07)*0.9)+(i%13===0?-4:0.35); data.push(60+noise+v*0.4); }
      const min=Math.min(...data), max=Math.max(...data); let progress=0;
      function draw(){ const w=canvas.clientWidth,h=280; ctx.clearRect(0,0,w,h);
        ctx.strokeStyle='rgba(148,163,184,0.08)'; ctx.lineWidth=1; for(let g=0;g<=4;g++){ const y=(h/4)*g; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
        const count=Math.floor(progress), pad=8, xAt=i=>(i/(N-1))*w, yAt=val=>pad+(1-(val-min)/(max-min))*(h-pad*2);
        const grad=ctx.createLinearGradient(0,0,0,h); grad.addColorStop(0,'rgba(45,212,191,0.28)'); grad.addColorStop(1,'rgba(45,212,191,0)');
        ctx.beginPath(); ctx.moveTo(0,h); for(let i=0;i<=count&&i<N;i++) ctx.lineTo(xAt(i),yAt(data[i])); ctx.lineTo(xAt(Math.min(count,N-1)),h); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
        ctx.beginPath(); for(let i=0;i<=count&&i<N;i++){ const x=xAt(i),y=yAt(data[i]); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }
        ctx.strokeStyle='#2DD4BF'; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.shadowColor='rgba(45,212,191,0.6)'; ctx.shadowBlur=12; ctx.stroke(); ctx.shadowBlur=0;
        const idx=Math.min(count,N-1), hx=xAt(idx), hy=yAt(data[idx]);
        ctx.beginPath(); ctx.arc(hx,hy,4,0,Math.PI*2); ctx.fillStyle='#2DD4BF'; ctx.fill();
        ctx.beginPath(); ctx.arc(hx,hy,9,0,Math.PI*2); ctx.strokeStyle='rgba(45,212,191,0.35)'; ctx.lineWidth=2; ctx.stroke();
        if(pctEl){ const ch=((data[idx]-data[0])/data[0]*100); pctEl.textContent=(ch>=0?'+':'')+ch.toFixed(2)+'%'; pctEl.style.color=ch>=0?'#2DD4BF':'#f87171'; }
        if(progress<N-1){ progress+=0.9; requestAnimationFrame(draw); } }
      requestAnimationFrame(()=>{ progress=0; draw(); });
    })();

    /* ---------- Mini trade canvases ---------- */
    document.querySelectorAll('.trade-canvas').forEach((canvas) => {
      const ctx = canvas.getContext('2d'); const type = canvas.dataset.type;
      function setup(){ const r=window.devicePixelRatio||1; canvas.width=canvas.clientWidth*r; canvas.height=170*r; ctx.setTransform(r,0,0,r,0,0); render(); }
      function render(){ const w=canvas.clientWidth,h=170,pad=10; ctx.clearRect(0,0,w,h);
        const pts=[],n=40; for(let i=0;i<n;i++){ pts.push(type==='win'?40+i*0.9+Math.sin(i*0.5)*6:90-i*0.6+Math.sin(i*0.5)*6); }
        const min=Math.min(...pts)-8, max=Math.max(...pts)+8, xAt=i=>pad+(i/(n-1))*(w-pad*2), yAt=val=>pad+(1-(val-min)/(max-min))*(h-pad*2);
        const color=type==='win'?'#34d399':'#f87171'; const eIdx=4,xIdx=n-5;
        ctx.setLineDash([4,4]); ctx.strokeStyle='rgba(248,113,113,0.5)'; ctx.beginPath(); const stopY=type==='win'?yAt(pts[eIdx]-12):yAt(pts[xIdx]); ctx.moveTo(0,stopY); ctx.lineTo(w,stopY); ctx.stroke();
        ctx.strokeStyle='rgba(52,211,153,0.5)'; ctx.beginPath(); const tgtY=type==='win'?yAt(pts[xIdx]):yAt(pts[eIdx]+12); ctx.moveTo(0,tgtY); ctx.lineTo(w,tgtY); ctx.stroke(); ctx.setLineDash([]);
        ctx.beginPath(); pts.forEach((p,i)=>{ const x=xAt(i),y=yAt(p); i?ctx.lineTo(x,y):ctx.moveTo(x,y); }); ctx.strokeStyle=color; ctx.lineWidth=2; ctx.lineJoin='round'; ctx.stroke();
        ctx.fillStyle='#60a5fa'; ctx.beginPath(); ctx.arc(xAt(eIdx),yAt(pts[eIdx]),4,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#cbd5e1'; ctx.font='10px Inter'; ctx.fillText('вход',xAt(eIdx)-8,yAt(pts[eIdx])-8);
        ctx.fillStyle=color; ctx.beginPath(); ctx.arc(xAt(xIdx),yAt(pts[xIdx]),4,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#cbd5e1'; ctx.fillText(type==='win'?'выход +3R':'стоп −1R',xAt(xIdx)-40,yAt(pts[xIdx])+(type==='win'?-8:14)); }
      const mio = new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ setup(); mio.unobserve(canvas); } }); }, { threshold: 0.3 });
      mio.observe(canvas); window.addEventListener('resize', () => { if (canvas.clientWidth) render(); });
    });

    onScroll();
