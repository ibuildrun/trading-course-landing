import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, 'out');
const BASE = '/trading-course-landing';
const PORT = 5093;
const types = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.ttf':'font/ttf' };
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

// нет загрузки React-чанков вообще
const jsRequests = [];
page.on('request', r => { if (r.url().endsWith('.js')) jsRequests.push(r.url()); });

/* лендинг: cookie-баннер (ванильный) */
await page.goto(u('/'), { waitUntil: 'load' });
await page.waitForTimeout(1600);
log('React-чанки не запрашиваются', !jsRequests.some(s => s.includes('/_next/static/')), jsRequests.map(s => s.split('/').pop()).join(','));
log('Cookie-баннер появился (ванильный)', await page.$('#cookie-bar.show') !== null);
await page.click('#cookie-bar [data-consent="all"]');
await page.waitForTimeout(600);
log('«Принять все» убирает баннер', await page.$('#cookie-bar') === null);
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(1300);
log('После выбора баннер больше не показывается', await page.$('#cookie-bar') === null);

/* кабинет: вкладки работают, нет двойной инициализации */
await page.goto(u('/app/'), { waitUntil: 'load' });
await page.waitForTimeout(900);
await page.click('.nav-item[data-view="journal"]');
await page.waitForTimeout(400);
const rows = await page.$$eval('#journal-rows tr', r => r.length);
log('Кабинет: вкладка «Дневник» работает', rows > 0, rows + ' строк');
// одна кнопка-тост => один тост (нет двойного навешивания)
await page.click('[data-toast][data-toast-type="info"]');
await page.waitForTimeout(500);
const toasts = await page.$$eval('#toast-wrap .toast, .toast', t => t.length);
log('Тост один (нет двойной инициализации)', toasts === 1, toasts + ' шт');

/* админка работает */
await page.goto(u('/admin/'), { waitUntil: 'load' });
await page.waitForTimeout(900);
await page.click('.nav-item[data-view="students"]');
await page.waitForTimeout(400);
log('Админка: ученики рендерятся', (await page.$$eval('#studentsRows tr', r => r.length)) > 0);

/* страница курса (чистый HTML) */
await page.goto(u('/course/3/'), { waitUntil: 'load' });
log('Страница курса работает', await page.evaluate(() => document.body.innerText.includes('Управление капиталом')));

log('Нет JS-ошибок', errors.length === 0, errors.slice(0, 3).join(' | '));

await b.close(); server.close();
console.log('\n=== ' + results.filter(Boolean).length + '/' + results.length + ' ===');
process.exit(results.every(Boolean) ? 0 : 1);
