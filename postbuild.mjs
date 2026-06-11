// Пост-обработка static export:
//  1) вырезаем React-рантайм (страницы статичны, интерактив — ванильный JS)
//  2) инлайним fa-lite.css (минус один блокирующий запрос)
//  3) подключаем страничные скрипты в конце <body>
//  4) минифицируем HTML и JS
//  5) сабсетим текстовые шрифты (веса + чарсет)
// Dev-режим (`next dev`) не затрагивается.
import fs from 'fs';
import path from 'path';
import { transformSync } from 'esbuild';
import { minify as minifyHtml } from 'html-minifier-terser';
import subsetFont from 'subset-font';

const OUT = 'out';
const BASE = '/trading-course-landing';

function pageScript(rel) {
  if (rel === 'index.html') return '/js/landing.js';
  if (rel === 'login/index.html') return '/js/login.js';
  if (rel === 'app/index.html') return '/js/cabinet.js';
  if (rel === 'admin/index.html') return '/js/admin.js';
  if (/^(privacy|offer|cookie|consent)\/index\.html$/.test(rel)) return '/js/legal.js';
  return null;
}

const walk = (dir) => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  return d.isDirectory() ? walk(p) : [p];
}) : [];

const faCss = fs.readFileSync('public/fa/css/fa-lite.css', 'utf8')
  .replace(/\.\.\/webfonts\//g, `${BASE}/fa/webfonts/`); // при инлайне относительные пути резолвятся от страницы
const faLinkRe = new RegExp(`<link[^>]*href="${BASE}/fa/css/fa-lite\\.css"[^>]*/?>`);

let htmlCount = 0, bytesSaved = 0, txtRemoved = 0;

for (const file of walk(OUT)) {
  if (file.endsWith('.txt')) { fs.unlinkSync(file); txtRemoved++; continue; }
  if (!file.endsWith('.html')) continue;

  const rel = path.relative(OUT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  const before = Buffer.byteLength(html);

  // React-рантайм долой
  html = html.replace(/<script[^>]*src="[^"]*\/_next\/static\/[^"]*"[^>]*><\/script>/g, '');
  html = html.replace(/<script>(?=[^<]{0,80}__next_f)[\s\S]*?<\/script>/g, '');
  html = html.replace(/<link[^>]*as="script"[^>]*\/?>/g, '');

  // FA-css инлайном
  html = html.replace(faLinkRe, '<style>' + faCss + '</style>');

  // наши скрипты в конец body
  const inject = [`<script src="${BASE}/js/site.js"></script>`];
  const ps = pageScript(rel);
  if (ps) inject.push(`<script src="${BASE}${ps}"></script>`);
  html = html.replace('</body>', inject.join('') + '</body>');

  // минификация HTML (консервативная)
  html = await minifyHtml(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
    minifyCSS: false,
    minifyJS: false,
  });

  fs.writeFileSync(file, html);
  htmlCount++;
  bytesSaved += before - Buffer.byteLength(html);
}

// минификация наших JS
let jsSaved = 0;
for (const f of fs.readdirSync(path.join(OUT, 'js'))) {
  if (!f.endsWith('.js') || f.includes('.min.')) continue;
  const p = path.join(OUT, 'js', f);
  const src = fs.readFileSync(p, 'utf8');
  const min = transformSync(src, { minify: true, target: 'es2017' }).code;
  fs.writeFileSync(p, min);
  jsSaved += Buffer.byteLength(src) - Buffer.byteLength(min);
}
const swp = path.join(OUT, 'sw.js');
if (fs.existsSync(swp)) {
  fs.writeFileSync(swp, transformSync(fs.readFileSync(swp, 'utf8'), { minify: true, target: 'es2017' }).code);
}

// сабсет текстовых шрифтов: чарсет = контент + latin + кириллица + типографика; веса — только используемые
let fontSaved = 0;
try {
  const chars = new Set();
  for (const dir of ['partials', 'lib', 'app', 'components', 'public/js']) {
    for (const f of walk(dir)) if (/\.(js|jsx|css|html)$/.test(f)) for (const ch of fs.readFileSync(f, 'utf8')) chars.add(ch);
  }
  for (let c = 0x20; c <= 0x7e; c++) chars.add(String.fromCodePoint(c));
  for (let c = 0x400; c <= 0x45f; c++) chars.add(String.fromCodePoint(c));
  for (const ch of '«»—–…“”„‘’•·№₽€£±×÷≈≤≥°∞™©®→←↑↓ ́Ёё') chars.add(ch);
  const text = [...chars].join('');

  // карта файл-шрифта -> семейство из сгенерированного css
  const jobs = {};
  for (const cssFile of walk(path.join(OUT, '_next', 'static', 'css'))) {
    const css = fs.readFileSync(cssFile, 'utf8');
    for (const ff of css.matchAll(/@font-face\s*\{[^}]*\}/g)) {
      const fam = (ff[0].match(/font-family:\s*['"]?([^;'"]+)/) || [])[1] || '';
      const src = (ff[0].match(/url\(([^)]+\.woff2)\)/) || [])[1];
      if (!src) continue;
      const name = path.basename(src);
      if (/Manrope/i.test(fam)) jobs[name] = { min: 600, max: 800 };
      else if (/Inter/i.test(fam)) jobs[name] = { min: 400, max: 700 };
    }
  }
  const mediaDir = path.join(OUT, '_next', 'static', 'media');
  for (const [name, wght] of Object.entries(jobs)) {
    const p = path.join(mediaDir, name);
    if (!fs.existsSync(p)) continue;
    const buf = fs.readFileSync(p);
    const sub = await subsetFont(buf, text, { targetFormat: 'woff2', variationAxes: { wght } });
    if (sub.length < buf.length) { fs.writeFileSync(p, sub); fontSaved += buf.length - sub.length; }
  }
} catch (e) {
  console.log('  (сабсет текстовых шрифтов пропущен: ' + e.message + ')');
}

// полный FA не нужен в деплое
for (const f of ['fa/css/all.min.css', 'fa/webfonts/fa-solid-900.woff2', 'fa/webfonts/fa-solid-900.ttf',
  'fa/webfonts/fa-brands-400.woff2', 'fa/webfonts/fa-brands-400.ttf',
  'fa/webfonts/fa-regular-400.woff2', 'fa/webfonts/fa-regular-400.ttf']) {
  const p = path.join(OUT, f);
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

console.log(`postbuild: HTML ×${htmlCount} (−${(bytesSaved / 1024).toFixed(0)} КБ, FA инлайном), JS −${(jsSaved / 1024).toFixed(0)} КБ, текстовые шрифты −${(fontSaved / 1024).toFixed(0)} КБ, .txt удалено ${txtRemoved}`);
