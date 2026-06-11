import Script from 'next/script';
import html from '@/partials/cabinet';

export const metadata = { title: 'Личный кабинет | MindTrade' };

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/trading-course-landing/js/cabinet.js" strategy="afterInteractive" />
    </>
  );
}
