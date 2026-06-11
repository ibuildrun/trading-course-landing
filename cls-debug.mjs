import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const root = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(root, 'out');
const BASE = '/trading-course-landing';
const PORT = 5094;
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

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1366, height: 900 } });
await ctx.addInitScript(() => { try { sessionStorage.setItem('mt-splashed', '1'); } catch {} });
const page = await ctx.newPage();
await page.addInitScript(() => {
  window.__shifts = [];
  new PerformanceObserver((list) => {
    for (const e of list.getEntries()) {
      if (e.hadRecentInput) continue;
      const src = (e.sources || []).map(s => {
        const n = s.node;
        if (!n) return 'unknown';
        const tag = n.tagName ? n.tagName.toLowerCase() : String(n.nodeName);
        const id = n.id ? '#' + n.id : '';
        const cls = n.className && typeof n.className === 'string' ? '.' + n.className.split(' ').slice(0, 3).join('.') : '';
        return tag + id + cls;
      });
      window.__shifts.push({ t: Math.round(e.startTime), v: Math.round(e.value * 1000) / 1000, src });
    }
  }).observe({ type: 'layout-shift', buffered: true });
});
await page.goto('http://localhost:' + PORT + BASE + '/', { waitUntil: 'load' });
await page.waitForTimeout(3500);
const shifts = await page.evaluate(() => window.__shifts);
console.log(JSON.stringify(shifts, null, 1));
await b.close(); server.close();
