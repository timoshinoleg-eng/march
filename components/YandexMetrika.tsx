'use client';

import { Suspense, useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

const METRIKA_ID = 107072365;

declare global {
  interface Window {
    ym?: (id: number, type: string, goal: string, params?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

function NavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialRoute = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Первый pageview отправляет штатный init Метрики. Для SPA-маршрутов шлем hit вручную.
    if (!hasTrackedInitialRoute.current) {
      hasTrackedInitialRoute.current = true;
      return;
    }

    let attempts = 0;
    const sendHit = () => {
      if (typeof window.ym === 'function') {
        (window.ym as any)(METRIKA_ID, 'hit', url, {
          referer: document.referrer,
        });
        console.log('[YM] SPA page view:', url);
        return;
      }

      attempts += 1;
      if (attempts < 20) {
        window.setTimeout(sendHit, 250);
      }
    };

    sendHit();
  }, [pathname, searchParams]);

  return null;
}

export default function YandexMetrika() {
  return (
    <>
      <Script
        id="yandex-metrika-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(${METRIKA_ID}, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: 'dataLayer',
              accurateTrackBounce: true,
              trackLinks: true
            });
          `,
        }}
      />

      <Suspense fallback={null}>
        <NavigationTracker />
      </Suspense>

      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
