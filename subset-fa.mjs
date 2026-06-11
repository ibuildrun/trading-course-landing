// Сабсеттинг Font Awesome: оставляем только реально используемые иконки.
// Генерирует public/fa/css/fa-lite.css + public/fa/webfonts/*-subset.woff2
import fs from 'fs';
import path from 'path';
import subsetFont from 'subset-font';

const SCAN_DIRS = ['partials', 'public/js', 'app', 'lib', 'components'];
const EXTRA = ['fa-caret-up', 'fa-caret-down']; // динамический шаблон fa-caret-${...}
const BASE_CLASSES = new Set(['fa-solid', 'fa-regular', 'fa-brands', 'fa', 'fas', 'far', 'fab']);

// 1) карта имя -> кодпоинт из полного css
const fullCss = fs.readFileSync('public/fa/css/all.min.css', 'utf8');
const map = {};
for (const m of fullCss.matchAll(/([^{}]+)\{content:"\\([0-9a-f]+)"\}/g)) {
  const cp = parseInt(m[2], 16);
  for (const sel of m[1].split(',')) {
    const name = sel.match(/\.(fa-[a-z0-9-]+):?:before/);
    if (name) map[name[1]] = cp;
  }
}

// 2) собрать используемые имена
const walk = (d) => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : (/\.(js|jsx|css|html)$/.test(e.name) ? [p] : []);
}) : [];
const used = new Set(EXTRA);
for (const dir of SCAN_DIRS) for (const f of walk(dir)) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\bfa-[a-z0-9-]+\b/g)) if (!BASE_CLASSES.has(m[0])) used.add(m[0]);
}
const icons = [...used].filter((n) => map[n]).sort();
const missing = [...used].filter((n) => !map[n] && !BASE_CLASSES.has(n));
if (missing.length) console.log('  (нет в FA, пропущено):', missing.join(', '));

const codepoints = icons.map((n) => map[n]);
const text = codepoints.map((c) => String.fromCodePoint(c)).join('');
console.log(`Иконок используется: ${icons.length}`);

// 3) сабсет трёх шрифтов
const fonts = [
  ['fa-solid-900', 'Font Awesome 6 Free', 900],
  ['fa-regular-400', 'Font Awesome 6 Free', 400],
  ['fa-brands-400', 'Font Awesome 6 Brands', 400],
];
let css = '/* Font Awesome 6 Free (subset) — только используемые иконки. Лицензии: Icons CC BY 4.0, Fonts SIL OFL 1.1 */\n';
for (const [file, family, weight] of fonts) {
  const ttf = fs.readFileSync(`public/fa/webfonts/${file}.ttf`);
  const woff2 = await subsetFont(ttf, text, { targetFormat: 'woff2' });
  fs.writeFileSync(`public/fa/webfonts/${file}-subset.woff2`, woff2);
  console.log(`${file}: ${(ttf.length / 1024).toFixed(0)}KB ttf -> ${(woff2.length / 1024).toFixed(1)}KB woff2 subset`);
  css += `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};font-display:block;src:url(../webfonts/${file}-subset.woff2) format("woff2")}\n`;
}

// 4) базовые классы + :before только для используемых
css += `.fa,.fa-brands,.fa-regular,.fa-solid,.fab,.far,.fas{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;line-height:1;text-rendering:auto}
.fa-solid,.fas{font-family:"Font Awesome 6 Free";font-weight:900}
.fa-regular,.far{font-family:"Font Awesome 6 Free";font-weight:400}
.fa-brands,.fab{font-family:"Font Awesome 6 Brands";font-weight:400}\n`;
for (const n of icons) css += `.${n}:before{content:"\\${map[n].toString(16)}"}\n`;
fs.writeFileSync('public/fa/css/fa-lite.css', css);
console.log(`fa-lite.css: ${(Buffer.byteLength(css) / 1024).toFixed(1)}KB (вместо ${(Buffer.byteLength(fullCss) / 1024).toFixed(0)}KB)`);
