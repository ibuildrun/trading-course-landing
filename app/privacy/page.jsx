import Script from 'next/script';
import html from '@/partials/privacy';

export const metadata = { title: 'Политика конфиденциальности | MindTrade' };

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/trading-course-landing/js/legal.js" strategy="afterInteractive" />
    </>
  );
}
