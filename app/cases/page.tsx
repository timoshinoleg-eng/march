"use client";

import { ArrowLeft, Clock, Building2, GraduationCap, ShoppingCart, Factory, Code } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useCallback } from "react";

const cases = [
  {
    id: "medical",
    title: "Сеть клиник в Москве",
    subtitle: "Автоматизация записи на приём",
    industry: "Медицина",
    icon: Building2,
    duration: "14 дней",
    results: [
      { value: "45 сек", label: "время записи (было 4 мин)" },
      { value: "70%", label: "записей через бот" },
      { value: "−85%", label: "пропущенных звонков" },
      { value: "+45%", label: "конверсия в визит" },
      { value: "280%", label: "ROI за 6 месяцев" },
    ],
    problem: `Сеть из четырёх клиник с 50+ врачами и 200+ записями в день столкнулась с критической нагрузкой на ресепшен. В пиковые часы операторы не справлялись: 80% звонков были типовыми — запись, перенос, отмена. Очереди на линии доходили до 15-20 минут.

Особенно остро проблема проявлялась в нерабочее время: 30% заявок оставались без ответа. Каждый пропущенный звонок — потеря 2 000–3 000 ₽ выручки, около 400 000 ₽ в месяц. Постоянная перегрузка приводила к текучке кадров: операторы увольнялись каждые 3–4 месяца.`,
    solution: `Telegram-бот для автоматизации записи с полной интеграцией в медицинскую информационную систему (МИС).

• Интеграция с МИС через API для проверки расписания в реальном времени
• Автонапоминания за сутки и за 2 часа до приёма
• Функция автоотмены с возможностью моментальной перезаписи
• Эскалация на оператора при сложных запросах
• Сохранение "человеческого" отношения: бот приветствует по имени, предлагает помощь оператора`,
    implementation: `Проект занял 14 дней.

Неделя 1: Проектирование сценариев, согласование логики с медицинским директором, разработка интеграции с МИС. Обработка краевых случаев: изменение расписания, двойные бронирования.

Неделя 2: Тестирование на одном филиале, обучение персонала, доработка по обратной связи, полный запуск на всех четырёх клиниках.`,
    quote: "После запуска бота мы наконец смогли перестроить работу ресепшена. Теперь операторы занимаются сложными вопросами, а рутину берёт на себя бот. Довольны и мы, и пациенты — многие из них специально выбирают запись через Telegram, потому что это быстрее, чем звонить.",
    author: "Анна Сергеева, операционный директор сети клиник",
  },
  {
    id: "education",
    title: "Онлайн-школа иностранных языков",
    subtitle: "Автоматизация лидогенерации",
    industry: "Образование",
    icon: GraduationCap,
    duration: "10 дней",
    results: [
      { value: "+120%", label: "рост лидов" },
      { value: "+35%", label: "конверсия в пробный" },
      { value: "+60%", label: "доходимость до урока" },
      { value: "−70%", label: "рутина менеджеров" },
      { value: "+850K", label: "₽/мес выручка" },
    ],
    problem: `Школа с 1 200 студентов и 15 преподавателей не справлялась с потоком заявок. Среднее время ответа — 2-4 часа, за это время "горячие" клиенты находили альтернативы.

Проблемы были комплексными: ручная запись на пробные уроки приводила к путанице в расписании, не было сегментации по уровню языка, менеджеры тратили 60% времени на сбор базовой информации вместо продаж.

Конверсия из заявки в пробный урок была всего 18%, а из пробного в покупку — 22%.`,
    solution: `Чат-бот в Telegram с интеграцией в amoCRM и автоворонкой продаж. Ключевая особенность — полноценная квалификация лидов до передачи менеджеру.

• Интерактивный квиз для определения уровня языка (A1–C1) с 8 вопросами
• Автоматическая запись на пробный урок в Google Calendar с учётом расписания преподавателя
• Сегментация по уровню и целям обучения (работа, путешествия, IELTS/TOEFL)
• Авторассылка материалов перед пробным уроком
• Интеграция с amoCRM: создание сделки, задача менеджеру, теги`,
    implementation: `Проект занял 10 дней — рекордно короткий срок благодаря чёткому ТЗ.

Дни 1–3: Разработка сценария квиза, согласование вопросов, интеграция с amoCRM.

Дни 4–7: Подключение Google Calendar, настройка рассылок, тестирование воронки.

Дни 8–10: Пилот на 20% трафика, доработка, полный запуск.`,
    quote: "Бот стал нашим лучшим менеджером по продажам. Он не устаёт, не забывает перезвонить и работает даже ночью, когда приходят заявки из других часовых поясов. Наши живые менеджеры теперь занимаются только продажами курсов тем, кто уже прошёл квалификацию.",
    author: "Дмитрий Волков, основатель онлайн-школы",
  },
  {
    id: "ecommerce",
    title: "Интернет-магазин электроники",
    subtitle: "Круглосуточная поддержка",
    industry: "E-commerce",
    icon: ShoppingCart,
    duration: "21 день",
    results: [
      { value: "80%", label: "автоматизация запросов" },
      { value: "2-10 сек", label: "время ответа 24/7" },
      { value: "4.7/5", label: "удовлетворённость (CSAT)" },
      { value: "450K", label: "₽/мес экономия" },
      { value: "+25%", label: "повторные продажи" },
    ],
    problem: `Магазин с каталогом из 5 000+ товаров и штатом из 10 менеджеров испытывал постоянную перегрузку на поддержку. 60% вопросов клиентов были типовыми: наличие, цена, сроки доставки, условия возврата.

Каждый менеджер обрабатывал 150+ сообщений в день, что приводило к ошибкам в ценах и наличии. Вечером и в выходные на линии оставался 1 менеджер вместо 5 — заявки ждали ответа до следующего рабочего дня.`,
    solution: `AI-чат-бот с интеграцией в 1С и WhatsApp Business API. Ключевое отличие — использование NLP для понимания вопросов с опечатками и синонимами.

• AI-движок, обученный на 2 000+ диалогах
• Прямая интеграция с 1С для проверки остатков в реальном времени
• Расчёт доставки через API СДЭК, Почты России
• Эскалация на человека при сложных вопросах (гарантия, ремонт, оптовые заказы)`,
    implementation: `Проект занял 21 день.

Неделя 1: Сбор и разметка 2 000+ диалогов для обучения AI, интеграция с 1С.

Неделя 2: Обучение модели, настройка сценариев, тестирование на выборке из 500 диалогов.

Неделя 3: Подключение WhatsApp Business API, финальное тестирование, запуск.`,
    quote: "Теперь наши менеджеры занимаются только сложными консультациями и продажами. Рутину полностью забрал бот — и делает это лучше человека, потому что не ошибается в ценах и наличии. Клиенты ценят мгновенные ответы, даже если пишут в 2 часа ночи.",
    author: "Игорь Мельников, руководитель отдела продаж",
  },
  {
    id: "b2b",
    title: "Поставщик промышленного оборудования",
    subtitle: "B2B-автоматизация",
    industry: "B2B / Производство",
    icon: Factory,
    duration: "18 дней",
    results: [
      { value: "−60%", label: "время обработки заявки" },
      { value: "−90%", label: "ошибки в заявках" },
      { value: "0", label: "потерянных заявок" },
      { value: "+15%", label: "средний чек" },
      { value: "340%", label: "ROI за год" },
    ],
    problem: `Компания с клиентской базой из 200+ заводов столкнулась с хаосом в обработке заявок. Заказы приходили по разным каналам: email, телефон, WhatsApp — не было единой точки входа.

Менеджеры тратили 40% времени на сбор информации: что нужно, в каком количестве, к какому сроку. При смене менеджера клиенту приходилось заново объяснять потребности. В B2B каждая потерянная заявка — потенциальный контракт на сотни тысяч рублей.`,
    solution: `Telegram-бот с интеграцией в Битрикс24 и построением единой CRM-системы. Ключевая особенность — структурированный сбор данных, исключающий недопонимание.

• Последовательный сбор: наименование, количество, срок поставки, реквизиты
• Автоматическое создание сделки в Битрикс24 с тегами
• Уведомление менеджера с кнопкой "Принять в работу"
• Автоподстановка клиента из базы по номеру телефона
• История всех обращений сохраняется в карточке клиента`,
    implementation: `Проект занял 18 дней.

Неделя 1: Аудит процессов, проектирование сценариев, интеграция с Битрикс24.

Неделя 2: Разработка бота, настройка воронки продаж, обучение менеджеров.

Неделя 3: Тестирование на 10% клиентов, добавление функции загрузки файлов (ТЗ, фото), полный запуск.`,
    quote: "Для B2B скорость реакции — всё. Теперь заявка от крупного завода мгновенно попадает в систему, и мы можем ответить за 5 минут вместо 2 часов. Это выигрывает тендеры. Клиенты отмечают, что с нами проще работать — не нужно звонить и объяснять по десять раз.",
    author: "Сергей Панов, коммерческий директор",
  },
  {
    id: "saas",
    title: "Разработчик SaaS-решений",
    subtitle: "AI-чат-бот для техподдержки",
    industry: "IT / SaaS",
    icon: Code,
    duration: "30 дней",
    results: [
      { value: "65%", label: "разрешение без агента" },
      { value: "−80%", label: "время первого ответа" },
      { value: "−65%", label: "нагрузка на первую линию" },
      { value: "+25", label: "пунктов NPS" },
      { value: "−50%", label: "текучка кадров" },
    ],
    problem: `Разработчик с 500+ клиентов и службой поддержки из 8 человек стал жертвой собственного роста. 70% обращений были типовыми: сброс пароля, "как сделать X", сообщения о багах, вопросы по тарифам.

Первая линия была постоянно перегружена — в пиковые часы очередь доходила до 50+ тикетов. SLA по времени первого ответа (30 минут) не выдерживался. Высокая текучка кадров: средний стаж на первой линии был всего 4 месяца.

База знаний содержала ответы на 90% вопросов, но клиенты не находили их самостоятельно.`,
    solution: `AI-чат-бот техподдержки с интеграцией в Confluence и Jira. Ключевая особенность — гибридный подход: бот решает типовые проблемы, сложные — эскалирует с полным контекстом.

• Обучение на 2 000+ реальных диалогах из истории поддержки
• Интеграция с Confluence для поиска актуальных инструкций
• Автоматическое создание тикета в Jira с категорией и приоритетом
• Эскалация по таймауту или ключевым словам
• Передача диалога агенту с полным контекстом — клиент не повторяет проблему`,
    implementation: `Проект занял 30 дней.

Недели 1–2: Сбор и разметка исторических диалогов, обучение AI-модели.

Недели 3–3.5: Интеграция с Confluence и Jira, тестирование на выборке из 500 диалогов.

Недели 3.5–4: Пилот на 20% клиентов, добавление кнопок оценки качества, полный запуск.`,
    quote: "Бот знает ответы на вопросы, которые раньше задавали только опытные сотрудники. Он работает как старший инженер поддержки, который никогда не спит и не уходит в отпуск. Наши клиенты из других часовых поясов наконец-то получают помощь в удобное для них время.",
    author: "Алексей Козлов, CTO компании",
  },
];

export default function CasesPage() {
  const openChat = useCallback(() => {
    window.dispatchEvent(new CustomEvent('openChatWidget'));
  }, []);
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary-400 font-medium mb-4 block">Кейсы</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Реальные результаты
              <br />
              <span className="bg-gradient-emerald bg-clip-text text-transparent">
                внедрения чат-ботов
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Примеры автоматизации бизнес-процессов: от записи в клинике до техподдержки SaaS. 
              Конкретные цифры, сроки и ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {cases.map((caseItem, index) => (
              <article
                key={caseItem.id}
                id={caseItem.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 md:p-10 border-b border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center">
                        <caseItem.icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
                          {caseItem.industry}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {caseItem.title}
                        </h2>
                        <p className="text-gray-400">{caseItem.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Внедрение: {caseItem.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <div className="grid lg:grid-cols-3 gap-10">
                    {/* Left column - Results */}
                    <div className="lg:col-span-1">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                        Результаты
                      </h3>
                      <div className="space-y-3">
                        {caseItem.results.map((result, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                          >
                            <span className="text-2xl font-bold text-primary-400">
                              {result.value}
                            </span>
                            <span className="text-gray-400 text-sm text-right">
                              {result.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Задача</h3>
                        <p className="text-gray-400 whitespace-pre-line">{caseItem.problem}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Решение</h3>
                        <p className="text-gray-400 whitespace-pre-line">{caseItem.solution}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Реализация</h3>
                        <p className="text-gray-400 whitespace-pre-line">{caseItem.implementation}</p>
                      </div>

                      {/* Quote */}
                      <blockquote className="border-l-4 border-primary-500 pl-6 py-2">
                        <p className="text-white italic mb-3">&ldquo;{caseItem.quote}&rdquo;</p>
                        <footer className="text-gray-400 text-sm">
                          — {caseItem.author}
                        </footer>
                      </blockquote>

                      <p className="text-gray-500 text-sm italic">
                        * Название изменено по соглашению о конфиденциальности.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Хотите такие же результаты?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Обсудим вашу задачу и рассчитаем потенциальный ROI автоматизации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="primary"
              onClick={openChat}
            >
              Обсудить проект
            </Button>
            <Link href="/#calculator">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Рассчитать стоимость
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
