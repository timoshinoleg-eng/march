'use client'

import Script from 'next/script'

export function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(107072365, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true,
            trackHash:true,
            ecommerce:"dataLayer"
          });
        `}
      </Script>
      <noscript>
        <div>
          <img 
            src="https://mc.yandex.ru/watch/107072365" 
            style={{ position: 'absolute', left: '-9999px' }} 
            alt="" 
          />
        </div>
      </noscript>
      <Script id="yandex-metrika-events" strategy="afterInteractive">
        {`
          document.addEventListener('DOMContentLoaded', function() {
            // Отслеживание форм
            var forms = document.querySelectorAll('form');
            forms.forEach(function(form) {
              form.addEventListener('submit', function(e) {
                var formId = form.id || form.getAttribute('name') || 'unknown_form';
                if (typeof ym !== 'undefined') {
                  ym(107072365, 'reachGoal', 'form_submit');
                  ym(107072365, 'reachGoal', 'form_' + formId);
                }
              });
            });
            
            // Клики по тарифам
            var tariffButtons = document.querySelectorAll('[data-tariff], .tariff-btn, .pricing-btn');
            tariffButtons.forEach(function(btn) {
              btn.addEventListener('click', function() {
                var tariffName = btn.getAttribute('data-tariff') || btn.textContent.trim() || 'unknown';
                if (typeof ym !== 'undefined') {
                  ym(107072365, 'reachGoal', 'tariff_click');
                  ym(107072365, 'reachGoal', 'tariff_' + tariffName.toLowerCase().replace(/\\s+/g, '_'));
                }
              });
            });
            
            // Калькулятор
            var calcOpeners = document.querySelectorAll('[data-calculator], .calculator-btn, #calculator');
            calcOpeners.forEach(function(opener) {
              opener.addEventListener('click', function() {
                if (typeof ym !== 'undefined') {
                  ym(107072365, 'reachGoal', 'calculator_open');
                }
              });
            });
            
            // Блог
            var blogLinks = document.querySelectorAll('a[href*="blog"]');
            blogLinks.forEach(function(link) {
              link.addEventListener('click', function() {
                if (typeof ym !== 'undefined') {
                  ym(107072365, 'reachGoal', 'blog_click');
                }
              });
            });
            
            // Телефон
            var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
            phoneLinks.forEach(function(link) {
              link.addEventListener('click', function() {
                if (typeof ym !== 'undefined') {
                  ym(107072365, 'reachGoal', 'phone_click');
                }
              });
            });
            
            // Email
            var emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(function(link) {
              link.addEventListener('click', function() {
                if (typeof ym !== 'undefined') {
                  ym(107072365, 'reachGoal', 'email_click');
                }
              });
            });
            
            // CTA
            var ctaButtons = document.querySelectorAll('.cta-btn, [data-cta], .order-btn');
            ctaButtons.forEach(function(btn) {
              btn.addEventListener('click', function() {
                var ctaType = btn.getAttribute('data-cta') || btn.textContent.trim() || 'cta';
                if (typeof ym !== 'undefined') {
                  ym(107072365, 'reachGoal', 'cta_click');
                  ym(107072365, 'reachGoal', 'cta_' + ctaType.toLowerCase().replace(/\\s+/g, '_'));
                }
              });
            });
            
            // Скролл
            var scrollDepthTriggered = {};
            window.addEventListener('scroll', function() {
              var scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
              
              if (scrollPercent >= 25 && !scrollDepthTriggered[25]) {
                scrollDepthTriggered[25] = true;
                if (typeof ym !== 'undefined') ym(107072365, 'reachGoal', 'scroll_25');
              }
              if (scrollPercent >= 50 && !scrollDepthTriggered[50]) {
                scrollDepthTriggered[50] = true;
                if (typeof ym !== 'undefined') ym(107072365, 'reachGoal', 'scroll_50');
              }
              if (scrollPercent >= 75 && !scrollDepthTriggered[75]) {
                scrollDepthTriggered[75] = true;
                if (typeof ym !== 'undefined') ym(107072365, 'reachGoal', 'scroll_75');
              }
              if (scrollPercent >= 90 && !scrollDepthTriggered[90]) {
                scrollDepthTriggered[90] = true;
                if (typeof ym !== 'undefined') ym(107072365, 'reachGoal', 'scroll_90');
              }
            });
            
            // Время на сайте
            setTimeout(function() {
              if (typeof ym !== 'undefined') ym(107072365, 'reachGoal', 'time_30s');
            }, 30000);
            
            setTimeout(function() {
              if (typeof ym !== 'undefined') ym(107072365, 'reachGoal', 'time_60s');
            }, 60000);
            
            setTimeout(function() {
              if (typeof ym !== 'undefined') ym(107072365, 'reachGoal', 'time_180s');
            }, 180000);
          });
        `}
      </Script>
    </>
  )
}
