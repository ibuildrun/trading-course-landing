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


function switchAuth(mode) {
      const isReg = mode === 'reg';
      document.getElementById('reg-name').style.display = isReg ? 'block' : 'none';
      document.getElementById('auth-submit').textContent = isReg ? 'Создать аккаунт' : 'Войти в кабинет';
      document.getElementById('tab-login').className = 'btn btn-block btn-sm ' + (isReg ? 'btn-ghost' : 'btn-primary');
      document.getElementById('tab-reg').className = 'btn btn-block btn-sm ' + (isReg ? 'btn-primary' : 'btn-ghost');
    }
    function togglePwd() { const p = document.getElementById('pwd'); p.type = p.type === 'password' ? 'text' : 'password'; }
    function doAuth(e) {
      e.preventDefault();
      toast('Вход выполнен (демо). Открываем кабинет…', 'success');
      setTimeout(() => { window.location.href = '/trading-course-landing/app/'; }, 700);
      return false;
    }
    drawLineChart(document.getElementById('brandChart'), { height: 120, points: 70, trend: 0.5 });
;(function(){ if (document.readyState !== 'loading') { document.dispatchEvent(new Event('DOMContentLoaded')); } })();
