'use client';

import Link from "next/link";
import { Calculator } from "lucide-react";

interface InlineCalculatorCTAProps {
  priceRange?: string;
  utmContent?: string;
}

export function InlineCalculatorCTA({ 
  priceRange = "39 000–69 000 ₽",
  utmContent = "inline"
}: InlineCalculatorCTAProps) {
  const href = `/calculator?utm_source=blog&utm_medium=inline&utm_campaign=ai_automation&utm_content=${utmContent}`;
  
  return (
    <div className="my-6 p-4 bg-primary-500/10 border-l-4 border-primary-500 rounded-r-lg">
      <p className="text-gray-300 text-sm sm:text-base mb-3">
        <span className="mr-2">📊</span>
        <strong className="text-white">Реальная цифра:</strong>{" "}
        такой бот обойдется в {priceRange} — проверьте свой кейс в калькуляторе
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-primary-400 font-semibold hover:text-primary-300 border-b-2 border-primary-500 hover:border-primary-300 transition-colors"
      >
        Рассчитать для моего бизнеса
        <span className="text-lg">→</span>
      </Link>
    </div>
  );
}

export default InlineCalculatorCTA;
