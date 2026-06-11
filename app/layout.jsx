import './globals.css';
import './polish.css';
import { Inter, Manrope } from 'next/font/google';
import SitePolish from '@/components/SitePolish';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'optional' });
const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'optional' });

export const metadata = {
  title: 'Курс трейдинга | Без иллюзий',
  description: 'Авторский курс по трейдингу от ментора с 8-летним опытом. Система, риск-менеджмент и психология. Без обещаний лёгких денег и гарантий прибыли.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link rel="preload" href="/trading-course-landing/fa/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/trading-course-landing/fa/webfonts/fa-brands-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/trading-course-landing/fa/css/all.min.css" />
        <script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('mt-splashed')==='1')document.documentElement.classList.add('splashed')}catch(e){}" }} />
      </head>
      <body>
        <div className="route-content">{children}</div>
        <SitePolish />
        <CookieConsent />
      </body>
    </html>
  );
}
