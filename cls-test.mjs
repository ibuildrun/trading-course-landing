import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, 'out');
const BASE = '/trading-course-landing';
const PORT = 5095;
const types = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain','.woff2':'font/woff2','.ttf':'font/ttf','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon' };
const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url.startsWith(BASE)) url = url.slice(BASE.length);
  if (url === '' || url === '/') url = '/index.html';
  let fp = path.join(OUT, url);
  if (!path.extname(fp)) { const idx = path.join(fp, 'index.html'); fp = fs.existsSync(idx) ? idx : fp + '.html'; }
  fs.readFile(fp, (e, d) => { if (e) { res.writeHead(404); res.end('404'); return; } res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' }); res.end(d); });
});
await new Promise(r => server.listen(PORT, r));
const u = (p) => `http://localhost:${PORT}${BASE}${p}`;
const results = []; const log = (n, ok, x = '') => { results.push(ok); console.log((ok ? 'PASS  ' : 'FAIL  ') + n + (x ? ' — ' + x : '')); };

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
// Имитируем ПЕРЕЗАГРУЗКУ: сессия уже видела сплэш
await ctx.addInitScript(() => { try { sessionStorage.setItem('mt-splashed', '1'); } catch {} });
const page = await ctx.newPage();
const errors = []; page.on('pageerror', e => errors.push(e.message));

// CLS-наблюдатель ставим ДО загрузки
await page.addInitScript(() => {
  window.__cls = 0;
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
});

await page.goto(u('/'), { waitUntil: 'load' });
await page.waitForTimeout(3500); // даём отработать всем поздним скриптам

const cls = await page.evaluate(() => Math.round(window.__cls * 1000) / 1000);
log('CLS при перезагрузке < 0.1 (нет видимых сдвигов)', cls < 0.1, 'CLS=' + cls);

log('Лоадер скрыт сразу (html.splashed)', await page.evaluate(() => document.documentElement.classList.contains('splashed') && getComputedStyle(document.getElementById('site-loader')).display === 'none'));
log('Fade-in отключён на повторной загрузке', await page.evaluate(() => getComputedStyle(document.querySelector('.route-content')).animationName === 'none'));

// FA: lite-сабсет заинлайнен и шрифт загружен
const faLocal = await page.evaluate(() => [...document.querySelectorAll('style')].some(s => s.textContent.includes('Font Awesome 6 Free')));
log('Font Awesome: lite-сабсет заинлайнен', faLocal);
const faLoaded = await page.evaluate(async () => {
  await document.fonts.load('900 16px "Font Awesome 6 Free"').catch(() => {});
  await document.fonts.ready;
  return document.fonts.check('900 16px "Font Awesome 6 Free"');
});
log('Шрифт иконок загружен', faLoaded);
// глиф реально отрисован: ширина ::before у видимой иконки ненулевая
const glyphW = await page.evaluate(() => {
  const i = [...document.querySelectorAll('i.fa-solid')].find(el => el.getBoundingClientRect().width > 0);
  return i ? i.getBoundingClientRect().width : 0;
});
log('Иконка реально отрисована (ширина > 4px)', glyphW > 4, 'w=' + glyphW.toFixed(1));
// все видимые иконки страницы реально отрисованы (ни одна не потерялась при сабсете)
const iconCheck = await page.evaluate(() => {
  const bad = [];
  document.querySelectorAll('i[class*="fa-"]').forEach(i => {
    const r = i.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return; // скрытые контейнеры не считаем
    const cs = getComputedStyle(i, '::before');
    if (!cs.content || cs.content === 'none' || cs.content === '""') bad.push(i.className);
  });
  return bad.slice(0, 5);
});
log('Все видимые иконки имеют глиф', iconCheck.length === 0, iconCheck.join(' | '));

// резервы высоты: тикер и карусель не двигают вёрстку
const mh = await page.evaluate(() => {
  const mq = document.querySelector('.marquee'), cm = document.getElementById('c-mask');
  return { mq: mq ? mq.offsetHeight : 0, cm: cm ? cm.offsetHeight : 0, cmMin: cm ? parseFloat(getComputedStyle(cm).minHeight) : 0 };
});
log('Тикер: высота зарезервирована', mh.mq >= 44, 'h=' + mh.mq);
log('Карусель: min-height близок к фактической высоте', mh.cmMin > 0 && mh.cm - mh.cmMin < 120, `факт=${mh.cm}, резерв=${mh.cmMin}`);

log('Нет JS-ошибок', errors.length === 0, errors.slice(0, 2).join(' | '));

await b.close(); server.close();
console.log('\n=== ' + results.filter(Boolean).length + '/' + results.length + ' ===');
process.exit(results.every(Boolean) ? 0 : 1);
