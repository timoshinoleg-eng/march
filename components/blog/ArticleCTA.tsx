'use client';
import { trackGoal } from "@/lib/metrika";
import { BookingButton } from "@/components/BookingButton";

interface ArticleCTAProps {
  primary?: {
    text: string;
    href: string;
    description: string;
  };
  secondary?: {
    text: string;
    href: string;
    description: string;
  };
  showChecklist?: boolean;
}

export function ArticleCTA({ 
  primary = {
    text: "Записаться на аудит",
    href: "/brief",
    description: "Без generic презентаций. Только цифры и конкретика."
  },
  secondary = {
    text: "Скачать чек-лист",
    href: "#form",
    description: "PDF, 1 страница."
  },
  showChecklist = false
}: ArticleCTAProps) {
  const handleChecklistClick = () => {
    if (secondary?.href?.includes('checklist')) {
      trackGoal('checklist_download');
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-2xl p-8 my-12 border border-emerald-700/50">
      <h3 className="text-2xl font-bold mb-2 text-center text-white">
        Где именно в вашем бизнесе автоматизация даст результат быстрее всего?
      </h3>
      
      <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
        Мы проводим «Аудит пригодности процессов к автоматизации» — 25-минутный разговор, на котором:
      </p>
      
      <ul className="max-w-xl mx-auto mb-8 space-y-2 text-gray-300">
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Разбираем ваш текущий поток обращений
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Находим 2–3 точки с максимальным потенциалом экономии
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Считаем ROI на ваших реальных цифрах
        </li>
        <li className="flex items-center gap-2">
          <span className="text-emerald-400">✓</span> Даём честный вердикт: стоит ли сейчас запускать
        </li>
      </ul>
      
      <div className="bg-emerald-600 text-white rounded-xl p-6 mb-6 text-center">
        <h4 className="text-xl font-semibold mb-2">{primary?.text}</h4>
        <p className="text-emerald-100 mb-4">{primary?.description}</p>
        <BookingButton 
          variant="outline"
          className="bg-white text-emerald-700 hover:bg-emerald-50 border-2 border-white px-8 py-3 font-semibold"
        >
          Записаться →
        </BookingButton>
      </div>
      
      {showChecklist && (
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-2">Или</p>
          <a 
            href={secondary?.href} 
            onClick={handleChecklistClick}
            className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline"
          >
            {secondary?.text}
          </a>
          <p className="text-gray-500 text-sm mt-1">{secondary?.description}</p>
        </div>
      )}
    </div>
  );
}

export default ArticleCTA;
