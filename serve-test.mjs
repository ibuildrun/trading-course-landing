import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, 'out');
const BASE = '/trading-course-landing';
const PORT = 5099;
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.txt':'text/plain', '.woff2':'font/woff2', '.woff':'font/woff', '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon' };

const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url.startsWith(BASE)) url = url.slice(BASE.length);
  if (url === '' || url === '/') url = '/index.html';
  let fp = path.join(OUT, url);
  if (!path.extname(fp)) { const idx = path.join(fp, 'index.html'); fp = fs.existsSync(idx) ? idx : fp + '.html'; }
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' });
    res.end(data);
  });
});
await new Promise(r => server.listen(PORT, r));
const u = (p) => `http://localhost:${PORT}${BASE}${p}`;

const results = [];
const log = (n, ok, x = '') => { results.push(ok); console.log((ok ? 'PASS  ' : 'FAIL  ') + n + (x ? ' — ' + x : '')); };

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(e.message));

/* LANDING */
await page.goto(u('/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
log('Лендинг: тёмный фон (CSS собран, без FOUC)', bg === 'rgb(11, 17, 33)', bg);
const h1 = await page.evaluate(() => { const e = document.querySelector('h1'); return e ? getComputedStyle(e).fontFamily : ''; });
log('Лендинг: шрифт заголовка применён', /manrope|inter/i.test(h1), h1.slice(0, 40));
await page.screenshot({ path: path.join(root, '.pwshots', 'next_landing.png') });

/* carousel modal */
try {
  await page.evaluate(() => document.getElementById('program').scrollIntoView({ block: 'center' }));
  await page.waitForTimeout(600);
  const m = await page.$('#c-mask'); const mb = await m.boundingBox();
  await page.mouse.move(mb.x + mb.width / 2, mb.y + mb.height / 2);
  await page.waitForTimeout(500);
  let box = null;
  for (const c of await page.$$('#program-track .c-card')) { const bx = await c.boundingBox(); if (bx && bx.x > 60 && bx.x + bx.width < 1300 && bx.y > 60) { box = bx; break; } }
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(400);
  const open = await page.evaluate(() => document.getElementById('modal').classList.contains('flex'));
  log('Лендинг: клик по курсу открывает модалку', open);
} catch (e) { log('Лендинг: карусель', false, e.message); }

/* ADMIN */
await page.goto(u('/admin/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
log('Админка: дашборд (canvas есть)', await page.$('#admRevenue') !== null);
await page.click('.nav-item[data-view="students"]'); await page.waitForTimeout(400);
log('Админка: раздел учеников', (await page.$$eval('#studentsRows tr', r => r.length)) > 0);
await page.screenshot({ path: path.join(root, '.pwshots', 'next_admin.png') });

/* CABINET */
await page.goto(u('/app/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
log('Кабинет: обзор (canvas есть)', await page.$('#ovEquity') !== null);
await page.screenshot({ path: path.join(root, '.pwshots', 'next_app.png') });

/* LOGIN */
await page.goto(u('/login/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
log('Логин: форма', await page.$('#auth-form') !== null);

/* OFFER (legal) */
await page.goto(u('/offer/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
log('Оферта: загрузилась', (await page.evaluate(() => document.body.innerText.includes('оферта') || document.body.innerText.includes('Оферта'))));

log('Нет console/page ошибок', errors.length === 0, errors.slice(0, 3).join(' | '));

await b.close();
server.close();
console.log('\n=== ' + results.filter(Boolean).length + '/' + results.length + ' ===');
process.exit(results.every(Boolean) ? 0 : 1);
