'use client';

import { useEffect } from 'react';

export default function YandexMetrika() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // @ts-ignore
    (function(m,e,t,r,i,k,a){
      // @ts-ignore
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      // @ts-ignore
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=107072365', 'ym');
    
    // @ts-ignore
    ym(107072365, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      accurateTrackBounce: true,
      trackLinks: true
    });
  }, []);

  return (
    <noscript>
      <div>
        <img 
          src="https://mc.yandex.ru/watch/107072365" 
          style={{ position: 'absolute', left: '-9999px' }} 
          alt="" 
        />
      </div>
    </noscript>
  );
}
