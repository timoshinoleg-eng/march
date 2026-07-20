'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { springSheet } from "@/components/animations/springs";

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
  
  // Translucent material (раздел 12 скилла): контент статьи читается
  // сквозь панель, вместо opaque-полосы. Панель «выезжает снизу» —
  // инерция оправдана, поэтому springSheet (лёгкий bounce).
  // fallback на prefers-reduced-transparency: при запросе большей
  // прозрачности → opaque, как требует скилл.
  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 p-3 shadow-lg z-50 lg:hidden mobile-sticky-material"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={springSheet}
        >
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">Расчет стоимости бота</p>
              <p className="text-gray-300 text-xs">2 вопроса, 20 секунд</p>
            </div>
            
            <Link
              href={href}
              className="flex-shrink-0 py-2 px-4 bg-gradient-emerald text-white text-sm font-semibold rounded-lg transition-[box-shadow,transform] duration-200 hover:shadow-lg active:scale-95"
              style={{ transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
            >
              Рассчитать
            </Link>
            
            <button
              onClick={() => {
                setIsDismissed(true);
                setIsVisible(false);
              }}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-200 transition-colors duration-150 active:scale-90"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileStickyCTA;
