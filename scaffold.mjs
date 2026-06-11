// Переносит legacy/*.html в структуру Next: partials/*.js, public/js/*.js, app/globals.css
import fs from 'fs';
import path from 'path';

const BASE = '/trading-course-landing';
const L = (f) => fs.readFileSync(path.join('legacy', f), 'utf8');
const W = (f, c) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, c); console.log('  ->', f); };

const bodyInner = (h) => { const m = h.match(/<body[^>]*>([\s\S]*)<\/body>/i); return m ? m[1] : h; };
const collectStyles = (h) => [...h.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
const inlineScripts = (h) => {
  let out = '';
  for (const m of h.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1] || '', code = m[2] || '';
    if (/\bsrc=/.test(attrs)) continue;        // пропускаем подключаемые (CDN, common.js)
    if (/tailwind\.config/.test(code)) continue; // конфиг переехал в tailwind.config.js
    out += code + '\n\n';
  }
  return out.trim();
};
const stripTags = (s) => s.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '');

function rewriteHrefs(s) {
  return s
    .replace(/href="index\.html(#[^"]*)?"/g, (_, h) => `href="${BASE}/${h || ''}"`)
    .replace(/href="login\.html"/g, `href="${BASE}/login/"`)
    .replace(/href="app\.html(#[^"]*)?"/g, (_, h) => `href="${BASE}/app/${h || ''}"`)
    .replace(/href="admin\.html(#[^"]*)?"/g, (_, h) => `href="${BASE}/admin/${h || ''}"`)
    .replace(/href="privacy\.html"/g, `href="${BASE}/privacy/"`)
    .replace(/href="offer\.html"/g, `href="${BASE}/offer/"`)
    .replace(/href="cookie\.html"/g, `href="${BASE}/cookie/"`)
    .replace(/href="consent\.html"/g, `href="${BASE}/consent/"`);
}
function rewriteScriptNav(s) {
  return s
    .replace(/(['"])app\.html\1/g, `'${BASE}/app/'`)
    .replace(/(['"])login\.html\1/g, `'${BASE}/login/'`)
    .replace(/(['"])index\.html\1/g, `'${BASE}/'`);
}
const escTpl = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const partial = (name, h) => W(path.join('partials', name + '.js'), 'export default `' + escTpl(rewriteHrefs(stripTags(bodyInner(h)))) + '`;\n');

// ---- common.js + диспатч DOMContentLoaded (скрипты грузятся после загрузки DOM) ----
const commonSrc = rewriteScriptNav(L('assets/common.js'));
const FIRE = "\n;(function(){ if (document.readyState !== 'loading') { document.dispatchEvent(new Event('DOMContentLoaded')); } })();\n";

console.log('Партиалы и скрипты:');

// LANDING (самодостаточный скрипт, common не нужен)
partial('landing', L('index.html'));
W('public/js/landing.js', rewriteScriptNav(inlineScripts(L('index.html'))) + '\n');

// LOGIN / CABINET / ADMIN (common + страничный скрипт + диспатч)
for (const [name, file] of [['login', 'login.html'], ['cabinet', 'app.html'], ['admin', 'admin.html']]) {
  partial(name, L(file));
  W(`public/js/${name}.js`, commonSrc + '\n\n' + rewriteScriptNav(inlineScripts(L(file))) + FIRE);
}

// LEGAL (только common + диспатч)
partial('privacy', L('privacy.html'));
partial('offer', L('offer.html'));
partial('notfound', L('404.html'));
W('public/js/legal.js', commonSrc + FIRE);

// ---- globals.css ----
let css = '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n';
css += '/* === style.css === */\n' + L('assets/style.css') + '\n\n';
css += '/* === inline styles из страниц === */\n';
css += collectStyles(L('index.html')) + '\n' + collectStyles(L('login.html')) + '\n';
css += '\n/* === шрифты next/font + тёмный фон html === */\n';
css += 'body { font-family: var(--font-inter), system-ui, sans-serif; }\n';
css += '.font-display { font-family: var(--font-manrope), var(--font-inter), sans-serif; }\n';
css += 'html, body { background-color: #0B1121; }\n';
W('app/globals.css', css);

console.log('Готово.');
