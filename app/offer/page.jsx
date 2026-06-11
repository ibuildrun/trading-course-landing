import Script from 'next/script';
import html from '@/partials/offer';

export const metadata = { title: 'Публичная оферта | MindTrade' };

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/trading-course-landing/js/legal.js" strategy="afterInteractive" />
    </>
  );
}
