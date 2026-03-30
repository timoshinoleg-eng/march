import Image from "next/image";
import { HighlightBox } from "@/components/blog/HighlightBox";
import { DataTable } from "@/components/blog/DataTable";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import GuideDownloadForm from "@/components/GuideDownloadForm";
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
          <span>7 минут чтения</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Где топ-менеджеры спотыкаются при внедрении ИИ — и как это исправить
        </h1>
      </header>

      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[400px] mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl md:text-8xl font-bold mb-4">93%</div>
            <div className="text-xl md:text-2xl opacity-80">барьеров — это люди, не технология</div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-200 leading-relaxed mb-6 font-medium">
          Три месяца назад вы запустили ИИ-проект. Бюджет освоен, пилот работает. 
          А масштабирование — буксует. Знакомо?
        </p>

        <p className="mb-4 text-gray-300">
          Исследование The Positive Group при участии Harvard Business School показало:{' '}
          <strong className="text-white">93% барьеров внедрения ИИ — это люди, не технология</strong>. 
          Хорошая новость? Это можно починить.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Почему «всё идёт не так» — норма
        </h2>

        <p className="mb-4 text-gray-300">
          Внедрение ИИ отличается от любой предыдущей трансформации. Если раньше 
          изменения были эпизодическими — новая система, реструктуризация, смена модели — 
          то ИИ приносит непрерывное беспокойство без финишной черты.
        </p>

        <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 py-2">
          <p className="text-lg italic text-gray-300 mb-3">
            «Цель постоянно движется. Я знаю, что мы говорили полгода назад, но цель 
            уже сместилась. Это сложно, потому что доверие пошатывается, когда направление 
            меняется снова и снова».
          </p>
          <footer className="text-sm text-gray-400">
            — Руководитель направления, консалтинг
          </footer>
        </blockquote>

        <p className="mb-6 text-gray-300">
          В chatbot24.su мы видим это постоянно: компания запускает чат-бота, видит 
          первые результаты, через квартал понимает — технология требует новой интеграции. 
          Это не провал. Это новая реальность.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Три барьера
        </h2>

        <h3 className="text-xl font-semibold text-white mt-8 mb-3">
          Барьер 1. «Все хотят успеха, но никто не согласен, что такое ценность»
        </h3>

        <p className="mb-4 text-gray-300">
          Ожидания от ИИ различаются радикально:
        </p>
      </div>

      {/* Table */}
      <HighlightBox variant="info" className="my-8">
        <DataTable
          data={[
            { label: "Акционеры: 'Что вы делаете в ИИ?'", value: "Поверхностные ответы" },
            { label: "Топы: 'Внедряем!'", value: "Игнорирование рисков" },
            { label: "Сотрудники: 'Как это поможет мне?'", value: "Часто самая здравая позиция" },
          ]}
        />
      </HighlightBox>

      <div className="prose prose-lg max-w-none">
        <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 py-2">
          <p className="text-lg italic text-gray-300 mb-3">
            «Самая большая проблема — не сопротивление, а страх упустить возможность 
            у лидерства. Все хотят отчёт об ИИ, прежде чем понять проблему».
          </p>
          <footer className="text-sm text-gray-400">
            — Руководитель направления, глобальный ритейл
          </footer>
        </blockquote>

        <p className="mb-6 text-gray-300">
          Узкий фокус на короткосрочной окупаемости убивает. Когда руководство требует 
          немедленной отдачи, сотрудники перестают предлагать идеи.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-3">
          Барьер 2. «Восторг, страх и угроза идентичности»
        </h3>

        <p className="mb-4 text-gray-300">
          Тревога сильнее всего у опытных профессионалов, чей авторитет строился 
          на глубокой экспертизе.
        </p>

        <blockquote className="border-l-4 border-emerald-500 pl-6 my-8 py-2">
          <p className="text-lg italic text-gray-300 mb-3">
            «Что мешает — не сама технология. Люди беспокоятся, что это значит для их роли: 
            'Это моя работа, вы можете автоматизировать вот это, но не вот это'. 
            Проще продолжать делать как всегда».
          </p>
          <footer className="text-sm text-gray-400">
            — Руководитель направления, консалтинг
          </footer>
        </blockquote>

        <p className="mb-6 text-gray-300">
          В нашем опыте с клиентами chatbot24.su это встречается постоянно: опытные 
          менеджеры сопротивляются чат-ботам, опасаясь, что автоматизация обесценит их 
          компетенции. Ключ — показать, как ИИ освобождает время для сложной работы.
        </p>

        <h3 className="text-xl font-semibold text-white mt-8 mb-3">
          Барьер 3. «Цель постоянно движется»
        </h3>

        <p className="mb-6 text-gray-300">
          Непрерывная эволюция технологий создаёт ощущение отставания. Лидеры меняют 
          курс чаще, чем когда-либо, что подрывает доверие.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Что делают успешные лидеры
        </h2>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">
          Практика 1. Делают обучение видимым
        </h3>

        <blockquote className="border-l-4 border-emerald-500 pl-6 my-6 py-2">
          <p className="text-lg italic text-gray-300 mb-3">
            «Я специально использовал инструменты публично. Брал доклад совета директоров 
            на 100+ страниц и показывал, как использую нейросеть для саммари. Не потому 
            что это идеально, а чтобы показать: не нужно быть техническим специалистом, 
            чтобы получить пользу. Люди перестали спрашивать 'Это разрешено?' и начали 
            спрашивать 'Может ли это помочь в моих задачах?'».
          </p>
          <footer className="text-sm text-gray-400">
            — Старший вице-президент, страхование
          </footer>
        </blockquote>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">
          Практика 2. Расширяют участие
        </h3>

        <blockquote className="border-l-4 border-emerald-500 pl-6 my-6 py-2">
          <p className="text-lg italic text-gray-300 mb-3">
            «Одно из самых эффективных решений — дать инструменты командам HR, 
            юридического отдела и финансов для прямых экспериментов. Люди, ближайшие 
            к работе, часто лучше всего видят, где ИИ может помочь».
          </p>
          <footer className="text-sm text-gray-400">
            — Технический директор, финансы
          </footer>
        </blockquote>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">
          Практика 3. Используют простые истории
        </h3>

        <blockquote className="border-l-4 border-emerald-500 pl-6 my-6 py-2">
          <p className="text-lg italic text-gray-300 mb-3">
            «Нам нужно объяснять ИИ простым языком, достаточно простым, чтобы понял 
            мой шестилетний ребёнок, потому что доступность порождает любопытство и доверие».
          </p>
          <footer className="text-sm text-gray-400">
            — Руководитель направления, потребительский сектор
          </footer>
        </blockquote>

        <h3 className="text-xl font-semibold text-white mt-6 mb-3">
          Практика 4. Строят доверие через прозрачность
        </h3>

        <p className="mb-6 text-gray-300">
          Успешные лидеры не проецируют уверенность, которой не могут поддержать. 
          Они фокусируются на последовательности: объясняют компромиссы, называют риски, 
          показывают, как обучение влияет на следующие шаги.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Российский контекст
        </h2>

        <p className="mb-4 text-gray-300">
          В Сбере, Яндексе, Т-Банке успешное внедрение ИИ строится на тех же принципах, 
          но с учётом культурных особенностей:
        </p>

        <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
          <li><strong className="text-white">Иерархичность требует видимости сверху.</strong> Если генеральный директор не использует ИИ лично, команда воспринимает это как сигнал «это не важно».</li>
          <li><strong className="text-white">Прагматизм помогает.</strong> Российские руководители быстрее отказываются от неработающих пилотов — и это хорошо.</li>
          <li><strong className="text-white">Осторожность требует времени.</strong> Нужно больше циклов объяснения, прежде чем сотрудники поверят, что ИИ — помощник, а не угроза.</li>
        </ul>

        <p className="mb-6 text-gray-300">
          В chatbot24.su мы помогаем клиентам пройти этот путь: от первого пилота 
          чат-бота до масштабирования — с учётом всех трёх барьеров.
        </p>

        <h2 className="text-2xl font-bold text-white mt-10 mb-4">
          Выводы
        </h2>

        <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
          <li>93% барьеров внедрения ИИ — человеческие факторы, не технологические.</li>
          <li>Три типичных вызова: непрерывные изменения, разрозненные ожидания, страх и угроза идентичности.</li>
          <li>Успешные лидеры делают обучение видимым, расширяют участие, используют простые истории, строят доверие через прозрачность.</li>
          <li>ИИ не снижает роль лидерства — повышает планку для него.</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/20 text-center">
          <h3 className="text-white font-semibold mb-2">Записаться на аудит</h3>
          <p className="text-sm text-gray-400 mb-4">Без generic презентаций. Только цифры и конкретика.</p>
          <a
            href="/#final-cta"
            className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
          >
            Записаться →
          </a>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <GuideDownloadForm
            title="Скачать гайд"
            description="PDF, 1 страница. Проверьте готовность команды к ИИ."
          />
        </div>
      </div>

      {/* Sources */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-3">Источники</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>Harvard Business Review, «Where Senior Leaders Are Struggling with AI Adoption», 26 февраля 2026</li>
          <li>The Positive Group, исследование на основе 35 интервью с руководителями</li>
          <li>Внутренние данные chatbot24.su, 2025–2026</li>
        </ul>
        
        <p className="text-xs text-gray-500 mt-4">
          Дисклеймер: Материал подготовлен на основе публичных данных Harvard Business Review 
          и опыта команды chatbot24.su. Мнение авторов может не совпадать с позицией 
          цитируемых источников.
        </p>
      </div>
    </article>
  );
}
