'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const METRIKA_ID = 107072365;

declare global {
  interface Window {
    ym?: (id: number, type: string, goal: string, params?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

// Компонент для отслеживания навигации
function NavigationTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const url = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '');
    
    const sendHit = () => {
      if ((window as any).ym) {
        (window as any).ym(METRIKA_ID, 'hit', url, {
          referer: document.referrer,
        });
        console.log('[YM] Page view:', url);
      }
    };

    sendHit();
    setTimeout(sendHit, 500);
  }, [pathname, searchParams]);

  return null;
}

// Компонент инициализации счётчика
function MetrikaInit() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Инициализируем dataLayer для E-commerce
    window.dataLayer = window.dataLayer || [];

    // Загружаем скрипт Яндекс.Метрики
    (function(m: Window, e: Document, t: string, r: string, i: string, k?: HTMLScriptElement, a?: HTMLScriptElement) {
      (m as any)[i] = (m as any)[i] || function() {
        ((m as any)[i].a = (m as any)[i].a || []).push(arguments);
      };
      (m as any)[i].l = 1 * new Date().getTime();
      
      for (var j = 0; j < e.scripts.length; j++) {
        if (e.scripts[j].src === r) return;
      }
      
      k = e.createElement(t) as HTMLScriptElement;
      a = e.getElementsByTagName(t)[0] as HTMLScriptElement;
      k.async = true;
      k.src = r;
      a?.parentNode?.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + METRIKA_ID, 'ym');

    // Инициализация счётчика
    (window as any).ym?.(METRIKA_ID, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      accurateTrackBounce: true,
      trackLinks: true,
      triggerEvent: true,
      defer: true,
    });

    console.log('[YM] Counter initialized');
  }, []);

  return null;
}

export default function YandexMetrika() {
  return (
    <>
      <MetrikaInit />
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
