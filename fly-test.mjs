import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, 'out');
const BASE = '/trading-course-landing';
const PORT = 5096;
const types = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain','.woff2':'font/woff2','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon' };
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
const page = await (await b.newContext({ viewport: { width: 1366, height: 900 } })).newPage();
const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(u('/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// Lenis поднялся из landing.js (локальный файл)
const hasLenis = await page.waitForFunction(() => !!window.__lenis, null, { timeout: 5000 }).then(() => true).catch(() => false);
log('Lenis инициализирован (из landing.js, без React)', hasLenis);

// ПЛАВНОСТЬ: сэмплируем scrollY во время доезда — должно быть много промежуточных значений
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(250);
const samples = await page.evaluate(async () => {
  const out = [];
  const a = document.querySelector('header nav a[href="#pricing"]');
  a.click();
  for (let i = 0; i < 40; i++) { out.push(Math.round(window.scrollY)); await new Promise(r => setTimeout(r, 40)); }
  return out;
});
const distinct = new Set(samples).size;
const final = samples[samples.length - 1];
log('Якорь «Цены»: скролл АНИМИРОВАН (не прыжок)', distinct >= 8 && final > 1500, `точек=${distinct}, финал=${final}`);

// тот же тест на кнопку героя (#how)
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(250);
const s2 = await page.evaluate(async () => {
  const out = [];
  document.querySelector('a[href="#how"]').click();
  for (let i = 0; i < 30; i++) { out.push(Math.round(window.scrollY)); await new Promise(r => setTimeout(r, 40)); }
  return out;
});
log('Кнопка героя «Как устроено обучение»: анимировано', new Set(s2).size >= 8 && s2[s2.length - 1] > 400, `точек=${new Set(s2).size}, финал=${s2[s2.length - 1]}`);

// сплэш одна сессия
log('Сплэш скрыт после загрузки', await page.evaluate(() => { const l = document.getElementById('site-loader'); return l.classList.contains('hide') || getComputedStyle(l).display === 'none'; }));
await page.click('a[href$="/login/"]');
await page.waitForTimeout(800);
log('Повторная страница — лоадера нет', await page.evaluate(() => { const l = document.getElementById('site-loader'); return !l || getComputedStyle(l).display === 'none'; }));

log('Нет JS-ошибок', errors.length === 0, errors.slice(0, 3).join(' | '));

await b.close(); server.close();
console.log('\n=== ' + results.filter(Boolean).length + '/' + results.length + ' ===');
process.exit(results.every(Boolean) ? 0 : 1);
