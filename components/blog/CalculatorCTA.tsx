'use client';

import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

interface CalculatorCTAProps {
  variant?: "inline" | "card";
}

export function CalculatorCTA({ variant = "card" }: CalculatorCTAProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2 my-6 p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
        <Calculator className="w-5 h-5 text-primary-400 flex-shrink-0" />
        <span className="text-gray-300">
          Хотите узнать точную стоимость чат-бота для вашего бизнеса?{"&nbsp;"}
          <Link 
            href="/calculator" 
            className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1 hover:underline"
          >
            Рассчитайте за 20 секунд
            <ArrowRight className="w-4 h-4" />
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary-500/20 to-emerald-500/20 rounded-2xl p-8 my-12 border border-primary-500/30">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center">
          <Calculator className="w-8 h-8 text-primary-400" />
        </div>
        
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-2">
            Узнайте стоимость чат-бота для вашего бизнеса
          </h3>
          <p className="text-gray-400">
            Ответьте на 2 вопроса и получите точную цену за 20 секунд. Без регистрации и звонков.
          </p>
        </div>
        
        <Link
          href="/calculator"
          className="flex-shrink-0 px-6 py-3 bg-gradient-emerald text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all inline-flex items-center gap-2 whitespace-nowrap"
        >
          Рассчитать стоимость
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default CalculatorCTA;
