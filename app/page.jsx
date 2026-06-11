import Script from 'next/script';
import html from '@/partials/landing';

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/trading-course-landing/js/landing.js" strategy="afterInteractive" />
    </>
  );
}
