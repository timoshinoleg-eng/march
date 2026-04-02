import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ShareButtons from "@/components/blog/ShareButtons";
import ArticleCTA from "@/components/blog/ArticleCTA";
import { ConversionFooter } from "@/components/blog/ConversionFooter";

export const metadata: Metadata = {
  title: "5 ошибок при выборе чат-бота, которые стоят вам 200 000 ₽ в месяц | ChatBot24",
  description: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент для автоматизации заявок.",
  openGraph: {
    title: "5 ошибок при выборе чат-бота, которые стоят вам 200 000 ₽ в месяц",
    description: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент.",
    type: "article",
    publishedTime: "2026-01-15T00:00:00Z",
    authors: ["ChatBot24"],
    tags: ["чат-бот", "ошибки", "выбор решения", "автоматизация", "152-ФЗ"],
  },
};

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "5 ошибок при выборе чат-бота, которые стоят вам 200 000 ₽ в месяц",
  "description": "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент для автоматизации заявок.",
  "image": "https://chatbot24.su/og-image.jpg",
  "datePublished": "2026-01-15T00:00:00Z",
  "dateModified": "2026-01-15T00:00:00Z",
  "author": {
    "@type": "Organization",
    "name": "ChatBot24",
    "url": "https://chatbot24.su"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ChatBot24",
    "logo": {
      "@type": "ImageObject",
      "url": "https://chatbot24.su/favicon.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://chatbot24.su/blog/5-oshibok"
  }
};

export default function ArticlePage() {
  const articleUrl = "https://chatbot24.su/blog/5-oshibok";
  const articleTitle = "5 ошибок при выборе чат-бота, которые стоят вам 200 000 ₽ в месяц";

  return (
    <main className="min-h-screen bg-bg-primary pt-24 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к статьям
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              15 января 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              7 мин чтения
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              ChatBot24
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            5 ошибок при выборе чат-бота, которые{" "}
            <span className="bg-gradient-emerald bg-clip-text text-transparent">
              стоят вам 200 000 ₽ в месяц
            </span>
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Выбор решения
            </span>
            <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm">
              Чат-боты
            </span>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm">
              152-ФЗ
            </span>
          </div>

          <ShareButtons url={articleUrl} title={articleTitle} />
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-emerald max-w-none">
          {/* Введение с ценовым шоком */}
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg mb-8">
            <p className="text-lg text-white font-medium mb-2">
              💰 Шаблонный бот стоит 3 000 ₽/мес, но из-за 5 описанных ниже ошибок бизнес теряет в среднем 120 000–200 000 ₽/мес упущенных заявок.
            </p>
            <p className="text-gray-400 mb-4">
              Кастомный бот окупается за 2 месяца, но выбирают его только 30% компаний — остальные совершают эти ошибки снова и снова.
            </p>
            <Link 
              href="/calculator?utm_source=blog&utm_medium=intro_link&utm_campaign=5_oshibok" 
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium border-b border-primary-400"
            >
              Проверьте, соответствует ли ваш бот требованиям →
            </Link>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            При выборе чат-бота для бизнеса многие совершают одни и те же ошибки. 
            В этой статье разберём 5 главных ловушек, которые могут обернуться 
            потерей клиентов и денег.
          </p>

          {/* Ошибка 1 */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            1. Выбор шаблонного решения без кастомизации
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Готовые шаблоны кажутся привлекательными: дёшево, быстро, не нужно 
            ничего придумывать. Но в реальности шаблонный бот редко понимает 
            специфику вашего бизнеса.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            <strong className="text-white">Реальный кейс:</strong> Салон красоты купил шаблонный бот за 5 000 ₽. 
            Бот не понимал запрос «хочу стрижку как у актрисы из сериала» и отвечал 
            «выберите услугу из списка». 40% клиентов ушли к конкуренту с человеческим администратором.
          </p>
          <p className="text-red-400 font-medium mb-4">
            💸 Цена ошибки: Экономия 20 000 ₽ на разработке оборачивается потерей 150 000 ₽/мес из-за оттока клиентов.
          </p>

          {/* Таблица сравнения */}
          <div className="my-6 p-5 bg-dark-200/50 rounded-lg border border-primary-500/20">
            <h4 className="text-white font-semibold mb-4">Шаблон (BotHelp) vs Кастом (ChatBot24)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary-500/20">
                    <th className="text-left py-2 text-gray-400 font-medium">Параметр</th>
                    <th className="text-left py-2 text-gray-400 font-medium">Шаблон</th>
                    <th className="text-left py-2 text-primary-400 font-medium">Кастом</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-primary-500/10">
                    <td className="py-2">Цена</td>
                    <td className="py-2">3 000 ₽/мес навсегда</td>
                    <td className="py-2 text-primary-400">39 000 ₽ разово + 2 000 ₽/мес</td>
                  </tr>
                  <tr className="border-b border-primary-500/10">
                    <td className="py-2">Владение</td>
                    <td className="py-2">Аренда</td>
                    <td className="py-2 text-primary-400">Собственность (исходники ваши)</td>
                  </tr>
                  <tr className="border-b border-primary-500/10">
                    <td className="py-2">152-ФЗ</td>
                    <td className="py-2 text-red-400">Риск</td>
                    <td className="py-2 text-emerald-400">Гарантия</td>
                  </tr>
                  <tr>
                    <td className="py-2">Масштаб</td>
                    <td className="py-2">Лимиты</td>
                    <td className="py-2 text-primary-400">Безлимит</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              <strong className="text-white">Вывод:</strong> Если клиентов больше 50/мес, кастом окупается за 2 месяца.
            </p>
            <Link 
              href="/calculator?utm_source=blog&utm_medium=compare_table&utm_campaign=5_oshibok" 
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium mt-3"
            >
              Посчитать мой вариант →
            </Link>
          </div>

          {/* Ошибка 2 */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            2. Игнорирование интеграции с CRM
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Чат-бот, который не связан с вашей CRM-системой, — это просто 
            красивая игрушка. Данные о клиентах теряются, заявки не попадают 
            к менеджерам, а история общения не сохраняется.
          </p>
          <p className="text-red-400 font-medium mb-4">
            💸 Цена ошибки: Менеджер тратит 2 часа/день на перенос данных вручную = 20 000 ₽/мес зря.
          </p>

          {/* Ошибка 2.5 — НОВАЯ */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            3. Игнорирование 152-ФЗ (для медицины и персональных данных)
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Использование зарубежных AI (ChatGPT) или хранение данных за границей — 
            прямое нарушение законодательства РФ. Клиника купила бот с ChatGPT за 15 000 ₽. 
            Через 3 месяца Роскомнадзор потребовал удалить бота — данные клиентов уходили 
            на серверы OpenAI в США.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Нарушение <Link href="/calculator?utm_source=blog&utm_medium=inline_text&utm_campaign=5_oshibok" className="text-primary-400 border-b border-primary-400/50 hover:border-primary-400">требований 152-ФЗ грозит штрафом до 500 000 ₽ — проверьте соответствие в калькуляторе</Link>.
          </p>
          <p className="text-emerald-400 font-medium mb-4">
            ✅ Решение: Только российские LLM (YandexGPT) и серверы в РФ.
          </p>

          {/* Ошибка 4 (бывшая 3) */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            4. Отсутствие передачи на оператора
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Даже самый умный бот не справится со всеми ситуациями. Критическая 
            ошибка — не предусмотреть механизм передачи сложных вопросов человеку. 
            Клиент застревает в бесконечном диалоге с ботом и уходит к конкурентам.
          </p>
          <p className="text-red-400 font-medium mb-4">
            💸 Цена ошибки: Бот без передачи на оператора теряет ~25% сложных заявок. 
            При потоке 100 клиентов/мес это 25 недовольных и 250 000 ₽ упущенной выручки.
          </p>

          {/* Inline CTA после ошибки 4 */}
          <div className="my-6 p-5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg">
            <h4 className="text-white font-semibold mb-2">⚠️ Проверьте, не теряете ли вы сейчас клиентов</h4>
            <p className="text-gray-400 mb-4">
              Бот без передачи на оператора теряет ~25% сложных заявок. 
              При потоке 100 клиентов/мес это 25 недовольных и 250 000 ₽ упущенной выручки.
            </p>
            <Link 
              href="/calculator?utm_source=blog&utm_medium=inline_operator&utm_campaign=5_oshibok" 
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Рассчитать: сколько стоит ваша «дыра» в воронке →
            </Link>
          </div>

          {/* Ошибка 5 (бывшая 4) */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            5. Сложный сценарий слишком рано
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Многие пытаются сразу создать «умного» бота с десятками веток сценария. 
            В результате проект затягивается на месяцы, а бот так и не запускается.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Правильный подход — начать с простого MVP и постепенно усложнять 
            на основе реальных данных.
          </p>
          <p className="text-red-400 font-medium mb-4">
            💸 Цена ошибки: Запуск откладывается на 3 месяца = вы теряете сезон/конкурентов. 
            Правильный подход: MVP за 7 дней (3 сценария) → запуск → доработка по данным.
          </p>

          {/* Ошибка 6 (бывшая 5) */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            6. Отсутствие аналитики
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Без аналитики вы не узнаете, где бот теряет клиентов. Нужно отслеживать:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
            <li>Конверсию на каждом этапе воронки</li>
            <li>Точки, где пользователи бросают диалог</li>
            <li>Самые частые вопросы, которые бот не понимает</li>
            <li>Время ответа и удовлетворённость клиентов</li>
          </ul>
          <p className="text-red-400 font-medium mb-4">
            💸 Цена ошибки: Вы не знаете, что бот теряет 40% заявок на 3-м шаге. 
            Без аналитики вы слепы.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4">
            Как избежать этих ошибок?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Мы в ChatBot24 работаем по принципу: сначала — понять бизнес, 
            потом — создать решение. Каждый бот разрабатывается под конкретные 
            задачи с интеграцией в вашу инфраструктуру.
          </p>

          {/* Финальный CTA с 3 слотами */}
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-500/20 to-emerald-500/20 rounded-xl border border-primary-500/30">
            <h3 className="text-xl font-bold text-white mb-4">
              Получите аудит + чек-лист проверки вашего бота
            </h3>
            <p className="text-gray-300 mb-4">
              Бесплатно, 25 минут. Что вы получите:
            </p>
            <ul className="list-none space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-emerald-400">✓</span> Аудит текущего бота (или планов) на соответствие 152-ФЗ
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-emerald-400">✓</span> Расчет ROI для вашей ниши (конкретные цифры)
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-emerald-400">✓</span> Чек-лист из 6 пунктов — отдайте своему подрядчику
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/calculator?utm_source=blog&utm_medium=footer_cta&utm_campaign=5_oshibok" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-emerald text-white font-semibold px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all"
              >
                Забронировать аудит →
              </Link>
            </div>
            <p className="text-amber-400 text-sm mt-4">
              ⚡ Осталось 3 слота на этой неделе
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
            <p className="text-gray-300 mb-2">
              <strong className="text-white">Хотите увидеть, как правильно настроенный бот поднимает продажи?</strong>
            </p>
            <Link 
              href="/blog/konversiya-40?utm_source=blog_5oshibok&utm_medium=internal_link" 
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium"
            >
              Читайте кейс: +40% конверсии за 2 месяца →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-primary-500/10">
          <ShareButtons url={articleUrl} title={articleTitle} />
        </footer>

        {/* CTA */}
        <ArticleCTA />
      </article>

      {/* Exit Intent - специфичный для 5-oshibok */}
      <ExitIntentModal5Oshibok />

      {/* Mobile Sticky - только для 5-oshibok и только после 60% */}
      <MobileSticky5Oshibok />

      {/* Spacer for footer */}
      <div className="h-20" />
    </main>
  );
}

// Специфичный exit-intent для статьи про ошибки
function ExitIntentModal5Oshibok() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      (function() {
        if (!window.location.pathname.includes('5-oshibok')) return;
        
        let showExitIntent = true;
        document.addEventListener('mouseout', function(e) {
          if (e.clientY < 10 && showExitIntent) {
            showExitIntent = false;
            
            const modal = document.createElement('div');
            modal.innerHTML = \`
              <div id="exit-modal-5oshibok" style="position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.8); z-index:9999; display:flex; align-items:center; justify-content:center; padding:20px;">
                <div style="background:#1a1a1a; padding:30px; border-radius:16px; max-width:420px; width:100%; text-align:center; border:1px solid #667eea; box-shadow:0 20px 60px rgba(102,126,234,0.3);">
                  <div style="font-size:3em; margin-bottom:15px;">🛡️</div>
                  <h3 style="margin:0 0 15px 0; color:#ef4444; font-size:1.5em; font-weight:bold;">Не уходите с ошибками!</h3>
                  <p style="color:#9ca3af; margin-bottom:20px; line-height:1.6;">
                    Получите <strong style="color:#fff;">чек-лист проверки</strong> вашего чат-бота + 
                    индивидуальный расчет, как избежать этих 6 ошибок
                  </p>
                  <a href="/calculator?utm_source=blog&utm_medium=exit_modal&utm_campaign=5_oshibok" 
                     style="display:block; background:#667eea; color:#fff; padding:16px; border-radius:8px; text-decoration:none; font-weight:600; margin-bottom:12px; transition:all 0.2s;"
                     onmouseover="this.style.background='#5a6fd6'" 
                     onmouseout="this.style.background='#667eea'">
                    Получить чек-лист + расчет
                  </a>
                  <button onclick="document.getElementById('exit-modal-5oshibok').remove()" 
                          style="background:none; border:none; color:#6b7280; cursor:pointer; font-size:0.9em; padding:8px;">
                    Спасибо, уже знаю
                  </button>
                </div>
              </div>
            \`;
            document.body.appendChild(modal);
          }
        });
      })();
    `}} />
  );
}

// Mobile sticky только для 5-oshibok и только после 60% прокрутки
function MobileSticky5Oshibok() {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      (function() {
        if (!window.location.pathname.includes('5-oshibok')) return;
        if (window.innerWidth >= 768) return;
        
        // Создаем элемент заранее, но скрытый
        const sticky = document.createElement('div');
        sticky.id = 'mobile-sticky-5oshibok';
        sticky.style.cssText = 'display:none; position:fixed; bottom:0; left:0; right:0; background:#1a1a1a; border-top:2px solid #667eea; padding:12px 20px; z-index:9999; box-shadow:0 -4px 20px rgba(0,0,0,0.3);';
        sticky.innerHTML = \`
          <div style="display:flex; justify-content:space-between; align-items:center; max-width:600px; margin:0 auto;">
            <div>
              <div style="font-weight:600; font-size:0.95em; color:#fff;">Расчет стоимости бота</div>
              <div style="font-size:0.8em; color:#9ca3af;">2 вопроса, 20 секунд</div>
            </div>
            <a href="/calculator?utm_source=blog&utm_medium=mobile_sticky&utm_campaign=5_oshibok" 
               style="background:#667eea; color:#fff; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.9em; flex-shrink:0; margin-left:15px;">
              Рассчитать
            </a>
          </div>
        \`;
        document.body.appendChild(sticky);
        
        // Показываем только после 60% прокрутки
        let shown = false;
        window.addEventListener('scroll', function() {
          if (shown) return;
          
          const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
          if (scrollPercent > 0.6) {
            shown = true;
            sticky.style.display = 'block';
            // Добавляем отступ для контента
            document.body.style.paddingBottom = '80px';
          }
        }, { passive: true });
      })();
    `}} />
  );
}
