import Script from 'next/script';
import html from '@/partials/notfound';

export const metadata = { title: 'Страница не найдена | MindTrade' };

export default function NotFound() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/trading-course-landing/js/legal.js" strategy="afterInteractive" />
    </>
  );
}
