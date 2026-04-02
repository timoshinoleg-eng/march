'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface MobileStickyCTAProps {
  utmCampaign?: string;
}

export function MobileStickyCTA({ 
  utmCampaign = "blog_mobile"
}: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const href = `/calculator?utm_source=blog&utm_medium=mobile_sticky&utm_campaign=${utmCampaign}`;
  
  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      // Показываем после прокрутки 800px на мобильных
      if (window.scrollY > 800 && window.innerWidth < 768) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-200 border-t-2 border-primary-500 p-3 shadow-lg z-50 lg:hidden">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Расчет стоимости бота</p>
          <p className="text-gray-400 text-xs">2 вопроса, 20 секунд</p>
        </div>
        
        <Link
          href={href}
          className="flex-shrink-0 py-2 px-4 bg-gradient-emerald text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Рассчитать
        </Link>
        
        <button
          onClick={() => {
            setIsDismissed(true);
            setIsVisible(false);
          }}
          className="flex-shrink-0 p-1 text-gray-500 hover:text-gray-300"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default MobileStickyCTA;
