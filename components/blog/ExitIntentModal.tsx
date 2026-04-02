'use client';

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { X, Gift } from "lucide-react";

interface ExitIntentModalProps {
  utmCampaign?: string;
}

export function ExitIntentModal({ 
  utmCampaign = "blog_exit"
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  
  const href = `/calculator?utm_source=blog&utm_medium=exit_intent&utm_campaign=${utmCampaign}`;
  
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (hasShown) return;
    
    // Курсор ушел вверх (к закрытию вкладки)
    if (e.clientY < 10) {
      setIsVisible(true);
      setHasShown(true);
    }
  }, [hasShown]);
  
  useEffect(() => {
    document.addEventListener('mouseout', handleMouseLeave);
    return () => document.removeEventListener('mouseout', handleMouseLeave);
  }, [handleMouseLeave]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-dark-200 border border-primary-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-primary-500/20 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-primary-400" />
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-gray-500 hover:text-gray-300"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">
          Уходите уже?
        </h3>
        
        <p className="text-gray-400 mb-6">
          Получите расчет стоимости бота + бесплатный аудит процессов. 
          Без спама, только цифры.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link
            href={href}
            className="w-full py-3 px-4 bg-gradient-emerald text-white font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-primary-500/25 transition-all"
            onClick={() => setIsVisible(false)}
          >
            Получить расчет + аудит
          </Link>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 text-sm hover:text-gray-300"
          >
            Нет, спасибо
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitIntentModal;
