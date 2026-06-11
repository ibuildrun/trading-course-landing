import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, 'out');
const BASE = '/trading-course-landing';
const PORT = 5098;
const types = { '.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain','.woff2':'font/woff2','.woff':'font/woff','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon' };
const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url.startsWith(BASE)) url = url.slice(BASE.length);
  if (url === '' || url === '/') url = '/index.html';
  let fp = path.join(OUT, url);
  if (!path.extname(fp)) { const idx = path.join(fp, 'index.html'); fp = fs.existsSync(idx) ? idx : fp + '.html'; }
  fs.readFile(fp, (err, data) => { if (err) { res.writeHead(404); res.end('404'); return; } res.writeHead(200, { 'Content-Type': types[path.extname(fp)] || 'application/octet-stream' }); res.end(data); });
});
await new Promise(r => server.listen(PORT, r));
const u = (p) => `http://localhost:${PORT}${BASE}${p}`;
const results = []; const log = (n, ok, x = '') => { results.push(ok); console.log((ok ? 'PASS  ' : 'FAIL  ') + n + (x ? ' — ' + x : '')); };

const b = await chromium.launch();
const page = await (await b.newContext({ viewport: { width: 1366, height: 900 } })).newPage();
const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

/* LANDING: loader hides, cookie banner, smooth anchor */
await page.goto(u('/'), { waitUntil: 'networkidle' });
log('Лоадер присутствует', await page.$('#site-loader') !== null);
await page.waitForTimeout(1400);
log('Лоадер скрылся', await page.evaluate(() => document.getElementById('site-loader')?.classList.contains('hide')));
log('Cookie-баннер показан', await page.$('#cookie-bar.show') !== null);
await page.screenshot({ path: path.join(root, '.pwshots', 'next_cookie.png') });

// smooth anchor
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await page.click('header nav a[href="#program"]');
await page.waitForTimeout(1600);
const sy = await page.evaluate(() => window.scrollY);
log('Плавный скролл по якорю «Программа»', sy > 200, 'scrollY=' + Math.round(sy));

// accept cookie hides banner
await page.click('#cookie-bar button.btn-primary');
await page.waitForTimeout(300);
log('Cookie «Принять» скрывает баннер', await page.$('#cookie-bar') === null);

/* COURSE: click a card navigates to /course/N */
await page.evaluate(() => document.getElementById('program').scrollIntoView({ block: 'center' }));
await page.waitForTimeout(700);
const mb = await (await page.$('#c-mask')).boundingBox();
await page.mouse.move(mb.x + mb.width / 2, mb.y + mb.height / 2);
await page.waitForTimeout(500);
let cardHref = null;
for (const c of await page.$$('#program-track a.c-card')) { const bx = await c.boundingBox(); if (bx && bx.x > 60 && bx.x + bx.width < 1300 && bx.y > 60) { cardHref = await c.getAttribute('href'); await c.click(); break; } }
await page.waitForTimeout(1200);
log('Клик по блоку ведёт на страницу /course/N', page.url().includes('/course/'), page.url().replace('http://localhost:' + PORT, ''));
log('Страница блока: заголовок есть', (await page.$$eval('h1', e => e.length)) > 0 && (await page.evaluate(() => document.querySelector('h1').textContent.length > 3)));
await page.screenshot({ path: path.join(root, '.pwshots', 'next_course.png') });

/* direct course page */
await page.goto(u('/course/9/'), { waitUntil: 'networkidle' });
log('/course/9 — «Сезонность»', await page.evaluate(() => document.body.innerText.includes('Сезонность')));

/* legal pages */
await page.goto(u('/cookie/'), { waitUntil: 'networkidle' });
log('Cookie-политика загрузилась', await page.evaluate(() => document.body.innerText.includes('cookie') || document.body.innerText.includes('Cookie')));
await page.goto(u('/consent/'), { waitUntil: 'networkidle' });
log('Согласие на ПДн загрузилось', await page.evaluate(() => document.body.innerText.includes('согласие') || document.body.innerText.includes('Согласие')));
await page.goto(u('/privacy/'), { waitUntil: 'networkidle' });
log('Политика 152-ФЗ загрузилась', await page.evaluate(() => document.body.innerText.includes('152')));

log('Нет JS-ошибок', errors.length === 0, errors.slice(0, 3).join(' | '));

await b.close(); server.close();
console.log('\n=== ' + results.filter(Boolean).length + '/' + results.length + ' ===');
process.exit(results.every(Boolean) ? 0 : 1);
