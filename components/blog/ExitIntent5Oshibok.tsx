'use client';

import { useEffect, useState } from "react";

export function ExitIntent5Oshibok() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Проверяем, что мы на клиенте и на нужной странице
    if (typeof window === 'undefined') return;
    if (!window.location.pathname.includes('5-oshibok')) return;
    
    // Проверяем localStorage - показывали ли уже
    if (localStorage.getItem('exit5oshibokShown')) return;

    let shown = false;
    
    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY < 10 && !shown) {
        shown = true;
        setShowModal(true);
        localStorage.setItem('exit5oshibokShown', 'true');
      }
    };

    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80">
      <div className="bg-dark-200 border border-primary-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">🛡️</div>
        <h3 className="text-2xl font-bold text-red-400 mb-4">Не уходите с ошибками!</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Получите <strong className="text-white">чек-лист проверки</strong> вашего чат-бота + 
          индивидуальный расчет, как избежать этих 6 ошибок
        </p>
        <a 
          href="/calculator?utm_source=blog&utm_medium=exit_modal&utm_campaign=5_oshibok"
          className="block w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors mb-3"
        >
          Получить чек-лист + расчет
        </a>
        <button
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-gray-300 text-sm py-2"
        >
          Спасибо, уже знаю
        </button>
      </div>
    </div>
  );
}
