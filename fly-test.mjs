import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, 'out');
const BASE = '/trading-course-landing';
const PORT = 5097;
const types = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain','.woff2':'font/woff2','.woff':'font/woff','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon' };
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

// 1) первый визит — лоадер показан, затем скрыт
await page.goto(u('/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
log('Сплэш скрылся после первой загрузки', await page.evaluate(() => { const l = document.getElementById('site-loader'); return l.classList.contains('hide') || getComputedStyle(l).display === 'none'; }));

// 2) Lenis активен
log('Lenis инициализирован на лендинге', await page.evaluate(() => !!window.__lenis));

// 3) плавный якорь
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(150);
await page.click('header nav a[href="#pricing"]');
await page.waitForTimeout(1700);
const sy = await page.evaluate(() => window.scrollY);
log('Якорь «Цены»: плавный доезд', sy > 1500, 'scrollY=' + Math.round(sy));

// 4) переход на /app/ в той же сессии — лоадера нет (display:none через .splashed)
await page.click('a[href$="/login/"]');
await page.waitForTimeout(900);
log('После перехода (login) лоадер скрыт (нет вспышки)', await page.evaluate(() => { const l = document.getElementById('site-loader'); return !l || getComputedStyle(l).display === 'none'; }));
log('html.splashed выставлен на повторной странице', await page.evaluate(() => document.documentElement.classList.contains('splashed')));

// 5) свечи фон работает
await page.goto(u('/'), { waitUntil: 'networkidle' });
log('Фон-свечи canvas присутствует', await page.$('#candles') !== null);

log('Нет JS-ошибок', errors.length === 0, errors.slice(0, 3).join(' | '));

await b.close(); server.close();
console.log('\n=== ' + results.filter(Boolean).length + '/' + results.length + ' ===');
process.exit(results.every(Boolean) ? 0 : 1);
