import Script from 'next/script';
import html from '@/partials/login';

export const metadata = { title: 'Вход в кабинет | MindTrade' };

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/trading-course-landing/js/login.js" strategy="afterInteractive" />
    </>
  );
}
