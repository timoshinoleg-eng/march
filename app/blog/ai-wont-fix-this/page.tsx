import Image from "next/image";
import { HighlightBox } from "@/components/blog/HighlightBox";
import { DataTable } from "@/components/blog/DataTable";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { metadata } from "./metadata";

export { metadata };

export default function ArticlePage() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
          <span>29 марта 2026</span>
          <span>•</span>
          <span>6 минут чтения</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          ИИ не спасёт бизнес без этих 4 компетенций команды
        </h1>
      </header>

      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[400px] mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-5xl md:text-6xl font-bold mb-4">Цифровая<br/>ловкость</div>
            <div className="text-lg md:text-xl opacity-80">4 компетенции для работы с ИИ</div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-200 leading-relaxed mb-6 font-medium">
          Вы купили лицензию на ИИ-инструмент, а эффекта нет? Возможно, искали проблему не там.
        </p>

        <p className="mb-4 text-gray-300">
          Исследователи MIT Sloan Management Review пришли к выводу:{' '}
          <strong className="text-white">чем «умнее» технология, тем более развитые человеческие компетенции ей нужны</strong>. 
          ИИ не исправит слабые процессы и не заменит неготовую команду.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Парадокс «отталкивания сильнее при проверке»
        </h2>

        <p className="mb-4 text-gray-300">
          В MIT Sloan описывают любопытный эффект: когда ИИ проверяет предложение человека 
          и возвращает с правками, это создаёт сопротивление и неопределённость. Чем более 
          «автономна» система, тем больше напряжения она генерирует.
        </p>

        <p className="mb-4 text-gray-300">
          Это противоречит мифу об «ИИ-коллеге», который без трения встраивается в работу. 
          На практике ИИ «отталкивается сильнее» — и требует от людей новых навыков взаимодействия.
        </p>

        <p className="mb-6 text-gray-300">
          В chatbot24.su мы регулярно видим это на примере чат-ботов: сотрудники поддержки 
          сначала сопротивляются «советам» ИИ, считая их навязчивыми. Прорыв наступает, 
          когда команда учится работать с критикой алгоритма.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          «Технологический детерминизм» — ошибка 90% компаний
        </h2>

        <p className="mb-4 text-gray-300">
          Главный враг успешного внедрения — убеждение, что технология сама приведёт к 
          желаемым изменениям. Это технологический детерминизм: купили нейросеть — 
          получили продуктивность. Установили чат-бот — сократили нагрузку.
        </p>

        <p className="mb-6 text-gray-300">
          Реальность сложнее. Исследователи MIT вводят концепцию{' '}
          <strong className="text-white">«цифровой ловкости»</strong> — способности человека 
          эффективно работать с цифровыми инструментами в условиях неопределённости. 
          Это не про технические навыки, а про гибкость мышления и эмоциональную устойчивость.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          4 компонента цифровой ловкости
        </h2>
      </div>

      {/* Table */}
      <HighlightBox variant="info" className="my-8">
        <DataTable
          data={[
            { 
              label: "Когнитивная гибкость", 
              value: "Переключение между моделями мышления. Быстро переходить от творчества к анализу данных ИИ" 
            },
            { 
              label: "Эмоциональная регуляция", 
              value: "Управление раздражением. Не 'срываться', когда ИИ 'не понимает'" 
            },
            { 
              label: "Социальная координация", 
              value: "Работа в условиях размытых границ. Согласовывать, кто принимает решение" 
            },
            { 
              label: "Метакогнитивная осознанность", 
              value: "Понимание собственных процессов. Осознавать, когда ИИ дополняет мышление, а когда — заменяет" 
            },
          ]}
        />
      </HighlightBox>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Как это работает: кейс из практики
        </h2>

        <p className="mb-4 text-gray-300">
          Клиент chatbot24.su — ритейл с 200+ сотрудников в поддержке. Чат-бот обрабатывал 
          40% запросов, но индекс удовлетворённости клиентов падал.
        </p>

        <p className="mb-2 text-gray-300"><strong className="text-white">Диагностика показала:</strong></p>
        <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">
          <li>Операторы эмоционально выгорали от проверки ответов бота (компонент №2)</li>
          <li>Не понимали, когда доверять алгоритму, а когда — сомневаться (компонент №4)</li>
          <li>Не знали, кто отвечает за ошибки ИИ (компонент №3)</li>
        </ul>

        <p className="mb-2 text-gray-300"><strong className="text-white">Решение:</strong></p>
        <ol className="list-decimal pl-6 mb-4 text-gray-300 space-y-1">
          <li>Обучение эмоциональной регуляции: как не воспринимать правки ИИ как личную критику</li>
          <li>Метакогнитивные навыки: когда доверять алгоритму (рутина), когда — сомневаться (сложные случаи)</li>
          <li>Координация: чёткие правила эскалации и зоны ответственности</li>
        </ol>

        <p className="mb-6 text-gray-300">
          <strong className="text-white">Результат за 3 месяца:</strong> индекс удовлетворённости вернулся на прежний уровень, 
          операторы стали предлагать улучшения для бота вместо сопротивления.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Российский контекст
        </h2>

        <p className="mb-4 text-gray-300">
          Российские компании осваивают GigaChat, Яндекс GPT, Salut. Но технологический 
          стек меняется быстрее, чем успевают адаптироваться команды.
        </p>

        <p className="mb-4 text-gray-300">
          СберУниверситет и Школа «Сколково» уже включают цифровую ловкость в программы развития. 
          Но большинство компаний фокусируются на техническом обучении («как написать запрос»), 
          игнорируя эмоции, координацию, рефлексию.
        </p>

        <p className="mb-6 text-gray-300">
          В chatbot24.su мы предлагаем комплексный подход: внедрение чат-бота плюс обучение 
          команды цифровой ловкости. Потому что технология без подготовленных людей — 
          это просто строка в бюджете.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Что делать уже сейчас
        </h2>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">Шаг 1. Диагностика</h3>
        <p className="mb-4 text-gray-300">
          Оцените, какие из 4 компонентов развиты, а какие — зоны роста. Критические роли — 
          менеджеры проектов, руководители поддержки — требуют баланса всех четырёх.
        </p>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">Шаг 2. Встраивание в процессы</h3>
        <p className="mb-4 text-gray-300">
          Цифровая ловкость развивается через практику. Введите ретроспективы с фокусом 
          на взаимодействие с ИИ, не только на результат.
        </p>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">Шаг 3. Лидерство как модель</h3>
        <p className="mb-6 text-gray-300">
          Когда руководитель открыто говорит «Я не уверен в этом выводе ИИ, давайте проверим» — 
          это учит команду метакогнитивной осознанности лучше любого обучения.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Выводы
        </h2>

        <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
          <li>ИИ не заменяет человеческое суждение — требует его усиления.</li>
          <li>Цифровая ловкость: когнитивная гибкость, эмоциональная регуляция, социальная координация, метакогнитивная осознанность.</li>
          <li>Технологический детерминизм — главная ошибка: технология + люди = результат.</li>
          <li>ИИ «отталкивается сильнее при проверке» — чем умнее система, тем больше напряжения.</li>
          <li>Успех требует обучения «как мыслить вместе с ИИ», не «как использовать ИИ».</li>
        </ul>
      </div>

      {/* CTA */}
      <ArticleCTA 
        variant="mixed"
        title="Заказать обучение команды цифровой ловкости"
        description="Или обсудите внедрение чат-бота с экспертом"
        primaryButton={{ text: "Обсудить внедрение", href: "/#final-cta" }}
        secondaryButton={{ text: "Узнать об обучении", href: "/#final-cta" }}
      />

      {/* Sources */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-3">Источники</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>MIT Sloan Management Review, «AI Won't Fix This», 3 марта 2026</li>
          <li>Концепция «цифровой ловкости» (digital dexterity), исследователи MIT</li>
          <li>Внутренние данные chatbot24.su, кейс ритейл-компании, 2025–2026</li>
        </ul>
        
        <p className="text-xs text-gray-500 mt-4">
          Дисклеймер: Материал представляет собой аналитический обзор на основе публичных 
          данных MIT Sloan Management Review и опыта команды chatbot24.su. 
          Мнение авторов может не совпадать с позицией цитируемых источников.
        </p>
      </div>
    </article>
  );
}
