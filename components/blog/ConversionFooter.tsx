'use client';

import Link from "next/link";
import { Calculator, ArrowRight, MessageCircle } from "lucide-react";

interface ConversionFooterProps {
  utmCampaign?: string;
}

export function ConversionFooter({ 
  utmCampaign = "blog_footer"
}: ConversionFooterProps) {
  const calcHref = `/calculator?utm_source=blog&utm_medium=footer&utm_campaign=${utmCampaign}`;
  const telegramHref = "https://t.me/chatbot24su";
  
  return (
    <div className="bg-dark-200/50 border border-primary-500/20 rounded-xl p-6 mt-10">
      <h3 className="text-xl font-bold text-white mb-5 text-center">
        Готовы автоматизировать?
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Link
          href={calcHref}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-emerald text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all"
        >
          <Calculator className="w-5 h-5" />
          Рассчитать стоимость бота
          <ArrowRight className="w-4 h-4" />
        </Link>
        
        <Link
          href="/cases"
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-transparent border-2 border-primary-500 text-primary-400 font-semibold rounded-lg hover:bg-primary-500/10 transition-all"
        >
          Смотреть кейсы
        </Link>
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        Или напишите в{" "}
        <Link 
          href={telegramHref}
          className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300 font-medium"
        >
          <MessageCircle className="w-4 h-4" />
          Telegram
        </Link>
        {" "}— ответим за 5 минут
      </p>
    </div>
  );
}

export default ConversionFooter;
