import './globals.css';
import './polish.css';
import { Inter, Manrope } from 'next/font/google';
import SitePolish from '@/components/SitePolish';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['600', '700', '800'], variable: '--font-manrope', display: 'swap' });

export const metadata = {
  title: 'Курс трейдинга | Без иллюзий',
  description: 'Авторский курс по трейдингу от ментора с 8-летним опытом. Система, риск-менеджмент и психология. Без обещаний лёгких денег и гарантий прибыли.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </head>
      <body>
        <div className="route-content">{children}</div>
        <SitePolish />
        <CookieConsent />
      </body>
    </html>
  );
}
