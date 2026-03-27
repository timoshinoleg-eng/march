import { HighlightBox } from "./HighlightBox";

export function CalculatorBlock({ className = "" }: { className?: string }) {
  return (
    <HighlightBox variant="info" className={className}>
      <h3 className="text-xl font-bold mb-4 text-white">
        Считаем по-простому: калькулятор окупаемости
      </h3>
      
      <p className="text-gray-300 mb-6">
        Не верьте мне на слово — посчитайте сами. Вот что происходит, если у вас{' '}
        <strong className="text-white">100 обращений в день</strong>:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-5 text-center shadow-sm border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">В день вы теряете</div>
          <div className="text-3xl font-bold text-red-400">9 800 ₽</div>
          <div className="text-xs text-gray-500 mt-1">разница между 12 100 ₽ и 2 300 ₽</div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-5 text-center shadow-sm border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">В месяц</div>
          <div className="text-3xl font-bold text-red-400">215 600 ₽</div>
          <div className="text-xs text-gray-500 mt-1">22 рабочих дня</div>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-5 text-center shadow-sm border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">В год</div>
          <div className="text-3xl font-bold text-red-400">2 587 200 ₽</div>
          <div className="text-xs text-amber-400 mt-1 font-medium">🚗 ваш новенький Haval Dargo</div>
        </div>
      </div>
      
      <h4 className="font-semibold mb-4 text-white">Детальный расчёт:</h4>
      
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-sm font-bold">1</span>
            <span className="font-medium text-white">Стоимость обработки человеком:</span>
          </div>
          <div className="pl-8 text-sm text-gray-400 space-y-1">
            <div>Зарплата оператора (с налогами): <strong className="text-gray-200">80 000 ₽/мес</strong></div>
            <div>Количество обращений в день: <strong className="text-gray-200">30</strong></div>
            <div>Стоимость одного обращения: <strong className="text-white">121 ₽</strong></div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-400 flex items-center justify-center text-sm font-bold">2</span>
            <span className="font-medium text-white">Стоимость через автоматизацию:</span>
          </div>
          <div className="pl-8 text-sm text-gray-400 space-y-1">
            <div>Платформа + обслуживание: <strong className="text-gray-200">~15 000 ₽/мес</strong></div>
            <div>Стоимость одного обращения: <strong className="text-emerald-400">23 ₽</strong></div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-blue-900 text-blue-400 flex items-center justify-center text-sm font-bold">3</span>
            <span className="font-medium text-white">Точка безубыточности:</span>
          </div>
          <div className="pl-8 text-sm text-gray-400 space-y-1">
            <div>Стоимость внедрения: <strong className="text-gray-200">180 000 ₽</strong></div>
            <div>Экономия на обращении: <strong className="text-gray-200">98 ₽</strong></div>
            <div className="text-gray-200 font-medium"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-emerald-900/50 rounded-lg text-center border border-emerald-700/50">
        <span className="text-emerald-200 font-semibold"></span>
        <p className="text-emerald-200 font-medium">
          При потоке от 50 обращений в день — окупаемость{' '}
          <strong>3.7 месяца</strong>
        </p>
      </div>
      
      <p className="mt-4 text-sm text-gray-400">
        Если у вас меньше 10 обращений в день — пока не беритесь. 
        Если больше 50 — каждый месяц вы «сжигаете» деньги, не автоматизируя это.
      </p>
    </HighlightBox>
  );
}

export default CalculatorBlock;
