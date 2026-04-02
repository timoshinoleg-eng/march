'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function MobileSticky5Oshibok() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Только на клиенте
    if (typeof window === 'undefined') return;
    
    // Только для 5-oshibok
    if (!window.location.pathname.includes('5-oshibok')) return;
    
    // Только на мобильных
    if (window.innerWidth >= 768) return;

    let shown = false;

    const handleScroll = () => {
      if (shown || isDismissed) return;
      
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.6) {
        shown = true;
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-dark-200 border-t-2 border-primary-500 p-3 z-[9999] lg:hidden">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Расчет стоимости бота</p>
            <p className="text-gray-400 text-xs">2 вопроса, 20 секунд</p>
          </div>
          
          <Link
            href="/calculator?utm_source=blog&utm_medium=mobile_sticky&utm_campaign=5_oshibok"
            className="flex-shrink-0 py-2.5 px-5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Рассчитать
          </Link>
          
          <button
            onClick={() => {
              setIsDismissed(true);
              setIsVisible(false);
            }}
            className="flex-shrink-0 p-1.5 text-gray-500 hover:text-gray-300"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Отступ для контента */}
      <style jsx global>{`
        body {
          padding-bottom: 80px !important;
        }
      `}</style>
    </>
  );
}
