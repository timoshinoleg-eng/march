'use client';

import Link from "next/link";
import { Calculator, Check } from "lucide-react";

interface SidebarCalculatorCTAProps {
  utmCampaign?: string;
}

export function SidebarCalculatorCTA({ 
  utmCampaign = "blog_sidebar"
}: SidebarCalculatorCTAProps) {
  const href = `/calculator?utm_source=blog&utm_medium=sidebar&utm_campaign=${utmCampaign}`;
  
  return (
    <div className="hidden lg:block sticky top-24 bg-dark-200 border border-primary-500/20 rounded-xl p-5 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary-400" />
        </div>
        <h4 className="text-lg font-bold text-white">Сколько стоит ваш бот?</h4>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">
        3 вопроса — точная цена за 20 секунд
      </p>
      
      <Link
        href={href}
        className="w-full block text-center py-3 px-4 bg-gradient-emerald text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all"
      >
        Запустить расчет
      </Link>
      
      <div className="mt-4 pt-4 border-t border-primary-500/10">
        <p className="text-xs text-gray-500 text-center">
          <span className="text-emerald-400 mr-1">✓</span>
          Уже рассчитали 150+ бизнесов
        </p>
      </div>
    </div>
  );
}

export default SidebarCalculatorCTA;
