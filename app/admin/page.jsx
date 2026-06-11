import Script from 'next/script';
import html from '@/partials/admin';

export const metadata = { title: 'Админ-панель | MindTrade' };

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/trading-course-landing/js/admin.js" strategy="afterInteractive" />
    </>
  );
}
