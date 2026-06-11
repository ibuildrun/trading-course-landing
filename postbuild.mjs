// Пост-обработка static export: вырезаем React-рантайм (страницы статичны, интерактив — ванильный JS),
// подключаем страничные скрипты обычными <script> в конце <body>. Dev-режим (`next dev`) не затрагивается.
import fs from 'fs';
import path from 'path';

const OUT = 'out';
const BASE = '/trading-course-landing';

// маршрут -> страничный скрипт (site.js подключается везде)
function pageScript(rel) {
  if (rel === 'index.html') return '/js/landing.js';
  if (rel === 'login/index.html') return '/js/login.js';
  if (rel === 'app/index.html') return '/js/cabinet.js';
  if (rel === 'admin/index.html') return '/js/admin.js';
  if (/^(privacy|offer|cookie|consent)\/index\.html$/.test(rel)) return '/js/legal.js';
  return null; // course/*, 404 — только site.js
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  return d.isDirectory() ? walk(p) : [p];
});

let htmlCount = 0, bytesSaved = 0, txtRemoved = 0;

for (const file of walk(OUT)) {
  if (file.endsWith('.txt')) { fs.unlinkSync(file); txtRemoved++; continue; } // RSC-payload для client-nav — не используется
  if (!file.endsWith('.html')) continue;

  const rel = path.relative(OUT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  const before = Buffer.byteLength(html);

  // 1) <script src=".../_next/static/...">
  html = html.replace(/<script[^>]*src="[^"]*\/_next\/static\/[^"]*"[^>]*><\/script>/g, '');
  // 2) инлайновый flight-payload гидрации (self.__next_f...)
  html = html.replace(/<script>(?=[^<]{0,80}__next_f)[\s\S]*?<\/script>/g, '');
  // 3) preload скриптов
  html = html.replace(/<link[^>]*as="script"[^>]*\/?>/g, '');

  // 4) наши скрипты в конец body (выполняются в ходе парсинга — раньше, чем ждать гидрацию)
  const inject = [`<script src="${BASE}/js/site.js"></script>`];
  const ps = pageScript(rel);
  if (ps) inject.push(`<script src="${BASE}${ps}"></script>`);
  html = html.replace('</body>', inject.join('') + '</body>');

  fs.writeFileSync(file, html);
  htmlCount++;
  bytesSaved += before - Buffer.byteLength(html);
}

console.log(`postbuild: обработано HTML — ${htmlCount}, удалено .txt — ${txtRemoved}, HTML похудел суммарно на ${(bytesSaved / 1024).toFixed(0)} КБ`);
