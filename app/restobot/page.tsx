import type { Metadata } from "next";
import Script from "next/script";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Coffee,
  CreditCard,
  Database,
  EyeOff,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Package,
  PhoneMissed,
  QrCode,
  RefreshCcw,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
  Truck,
  Utensils,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import RestoBotActions from "./RestoBotActions";
import RestoBotAnalytics from "./RestoBotAnalytics";
import RestoBotLeadForm from "./RestoBotLeadForm";

interface CardItem {
  title: string;
  description: string;
  Icon: LucideIcon;
}

interface StepItem {
  title: string;
  description: string;
}

const audience: CardItem[] = [
  {
    title: "Кафе и кофейни",
    description: "Для точек с быстрым потоком гостей, где заказ должен оформляться без очереди у стойки и лишних звонков.",
    Icon: Coffee,
  },
  {
    title: "Небольшие рестораны",
    description: "Для заведений, которым нужен собственный канал заказов, бронирований и повторных обращений гостей.",
    Icon: Store,
  },
  {
    title: "Доставка и самовывоз",
    description: "Для кухонь, которые хотят принимать заказы напрямую и не отдавать постоянных гостей агрегаторам.",
    Icon: Truck,
  },
  {
    title: "Dark kitchen",
    description: "Для запуска меню, заказов и статусов без разработки отдельного сайта или мобильного приложения.",
    Icon: Utensils,
  },
];

const problems: CardItem[] = [
  {
    title: "Заказы теряются в звонках",
    description: "В пиковые часы администратор отвечает гостям в зале, принимает оплату и легко пропускает звонок или важный комментарий.",
    Icon: PhoneMissed,
  },
  {
    title: "Переписки превращаются в ручную работу",
    description: "Адрес, состав заказа, время самовывоза и пожелания гостя приходится собирать из сообщений вручную.",
    Icon: MessageSquare,
  },
  {
    title: "Меню быстро устаревает",
    description: "Позиции заканчиваются, цены меняются, а гость продолжает видеть старую версию меню в PDF, соцсетях или на сайте.",
    Icon: RefreshCcw,
  },
  {
    title: "Агрегаторы забирают маржу",
    description: "Комиссии растут, а данные о гостях и повторные продажи остаются не у ресторана, а у сторонней площадки.",
    Icon: ArrowRight,
  },
];

const capabilities: CardItem[] = [
  {
    title: "Живое меню",
    description: "Категории, блюда, описания, цены и доступность показываются гостю в актуальном виде прямо в Telegram.",
    Icon: ClipboardList,
  },
  {
    title: "Заказ без звонка",
    description: "Гость выбирает блюда, оставляет телефон, комментарий и способ получения заказа без ожидания ответа администратора.",
    Icon: MessageSquare,
  },
  {
    title: "Самовывоз и доставка",
    description: "Можно запускать самовывоз, доставку, заказ в зале или предзаказ под конкретное время.",
    Icon: Package,
  },
  {
    title: "Статусы заказа",
    description: "Команда меняет статус заказа, чтобы внутри заведения было понятно, что уже подтверждено, готовится или готово.",
    Icon: ListChecks,
  },
  {
    title: "Стоп-лист",
    description: "Закончилось блюдо или ингредиент, позицию можно скрыть из меню до следующей поставки.",
    Icon: EyeOff,
  },
  {
    title: "Панель управления",
    description: "Заказы, меню, бронирования, настройки и аналитика собраны в понятной админ-панели для команды.",
    Icon: LayoutDashboard,
  },
];

const productFlow: CardItem[] = [
  {
    title: "Гость сканирует QR или открывает ссылку",
    description:
      "Меню открывается в Telegram по QR-коду на столе, ссылке в профиле или сообщению от ресторана. Отдельное приложение не требуется.",
    Icon: QrCode,
  },
  {
    title: "Собирает корзину в мини-приложении",
    description:
      "Гость видит категории, карточки блюд, цены и доступность, добавляет позиции в корзину и выбирает удобный формат получения.",
    Icon: ShoppingCart,
  },
  {
    title: "Оставляет контакты и подтверждает заказ",
    description:
      "Имя, телефон, комментарий и согласие на обработку данных попадают в заказ сразу. При необходимости подключается онлайн-оплата через YooKassa.",
    Icon: CreditCard,
  },
  {
    title: "Команда видит заказ в админ-панели",
    description:
      "Администратор получает структурированный заказ: состав, сумма, тип получения, адрес и комментарий уже собраны в одном месте.",
    Icon: LayoutDashboard,
  },
];

const adminSteps: CardItem[] = [
  {
    title: "Дашборд",
    description:
      "Владелец или управляющий видит заказы за день, выручку, средний чек, активные брони, недельную динамику и популярные блюда.",
    Icon: BarChart3,
  },
  {
    title: "Меню",
    description:
      "Можно добавить блюдо, описание, цену, категорию и фото. Если позиция закончилась, достаточно отключить доступность.",
    Icon: ClipboardList,
  },
  {
    title: "Заказы",
    description:
      "Заказы фильтруются по статусу и дате. Команда открывает детали, проверяет оплату и переводит заказ по этапам обработки.",
    Icon: ListChecks,
  },
  {
    title: "Бронирования",
    description:
      "Стол, имя гостя, телефон, время и количество гостей отображаются в одной таблице. Бронь можно подтвердить или отменить.",
    Icon: CalendarCheck,
  },
  {
    title: "Настройки ресторана",
    description:
      "Задаются название, минимальная сумма заказа, радиус доставки, валюта, НДС для чека и часы работы по дням недели.",
    Icon: Settings,
  },
  {
    title: "Склад, лояльность и персонал",
    description:
      "Дополнительно можно вести ингредиенты, низкий запас, бонусы, скидки и сотрудников с ролями для смены.",
    Icon: Users,
  },
];

const ownerBenefits: CardItem[] = [
  {
    title: "Свой канал без комиссии агрегатора",
    description:
      "RestoBot помогает принимать повторные заказы напрямую, сохраняя маржу и контакт с постоянными гостями.",
    Icon: Store,
  },
  {
    title: "База гостей остаётся у заведения",
    description:
      "Контакты, история заказов и предпочтения гостей становятся основой для повторных продаж, бонусов и персональных предложений.",
    Icon: Users,
  },
  {
    title: "Меню меняется быстрее, чем печатается QR",
    description:
      "Цены, описания, фото и доступность меняются в админ-панели. QR-код остаётся прежним, а гость видит новое меню.",
    Icon: RefreshCcw,
  },
  {
    title: "Запуск без разработки приложения",
    description:
      "Для старта нужны меню, способы получения заказов и тестовый сценарий. Проверить RestoBot можно за 14 дней бесплатного периода.",
    Icon: Smartphone,
  },
];

const launchSteps: StepItem[] = [
  {
    title: "Оставляете заявку на тест",
    description: "Расскажите формат заведения, город, меню и сценарий заказов, который хотите проверить первым.",
  },
  {
    title: "Передаёте меню",
    description: "Нужны категории, позиции, цены, описания, фото при наличии и правила самовывоза или доставки.",
  },
  {
    title: "Собираем тестовую версию",
    description: "Настраиваем Telegram-меню, корзину, оформление заказа и базовую админ-панель для обработки заказов.",
  },
  {
    title: "Проверяем тестовый заказ",
    description: "Проходим путь гостя от QR-кода до заказа и путь сотрудника от нового заказа до смены статуса.",
  },
  {
    title: "Запускаете на гостях",
    description: "Размещаете QR-код, ссылку в Telegram или соцсетях и принимаете первые реальные заказы.",
  },
];

const offerItems = [
  "14 дней, чтобы проверить RestoBot на своём меню и реальном сценарии",
  "Подписка от 2 990 ₽/мес. после тестового периода",
  "Без setup fee для первого пилотного запуска",
  "Telegram-меню, корзина, заказы и статусы",
  "Админ-панель для меню, заказов, бронирований и аналитики",
  "Размещение данных на российской инфраструктуре",
];

const notIncludedItems: StepItem[] = [
  {
    title: "Не заменяем кассу и POS",
    description: "Первый запуск не подменяет кассовую систему, складскую программу или ресторанную ERP.",
  },
  {
    title: "Не обещаем всё сразу",
    description: "Сначала проверяем меню, заказ и статусы. Сложные интеграции подключаются после понятного результата пилота.",
  },
  {
    title: "Не растягиваем запуск на месяцы",
    description: "Пилот строится вокруг Telegram-сценария, чтобы быстро проверить спрос и процесс обработки заказов.",
  },
];

const faqItems: StepItem[] = [
  {
    title: "RestoBot — это Telegram бот для ресторана?",
    description: "Да. Это Telegram-first сервис для кафе, ресторанов и доставки: гость открывает меню, собирает корзину и отправляет заказ без звонка.",
  },
  {
    title: "Можно ли использовать как бот для кафе без сайта?",
    description: "Да. Для первого запуска отдельный сайт не нужен: меню, заказ и статусы работают внутри Telegram-сценария.",
  },
  {
    title: "Сколько времени занимает запуск?",
    description: "Срок зависит от готовности меню и сценария. Обычно сначала собираем данные, затем настраиваем тестовую версию и проходим заказ вместе с командой.",
  },
  {
    title: "Нужен ли заведению сайт?",
    description: "Нет. Для пилота достаточно Telegram-меню, QR-кода или ссылки, которую можно разместить в зале, соцсетях и рассылках.",
  },
  {
    title: "Как обновляется меню?",
    description: "В админ-панели можно обновлять название, описание, цену, фото и доступность блюда. Если позиция закончилась, её можно скрыть из меню.",
  },
  {
    title: "Как клиент делает заказ?",
    description: "Клиент открывает меню в Telegram, выбирает позиции, оставляет контакты, комментарий и способ получения: доставка, самовывоз или заказ в зале.",
  },
  {
    title: "Как пользоваться админ-панелью?",
    description: "Перед сменой проверьте меню, часы работы и доступность позиций. Во время смены работайте с разделом заказов и меняйте статусы. После смены смотрите дашборд, выручку, средний чек и топ-блюда.",
  },
  {
    title: "Есть ли бронирования, склад и лояльность?",
    description: "В проекте предусмотрены разделы бронирований, склада, лояльности и персонала. Их можно включать в пилот по готовности сценария конкретного заведения.",
  },
  {
    title: "Что происходит после бесплатных 14 дней?",
    description: "Если сценарий подходит заведению, подключается платная подписка от 2 990 ₽/мес. Пакет и условия фиксируются до коммерческого запуска.",
  },
  {
    title: "Что с данными клиентов?",
    description: "Контакты гостей и история заказов обрабатываются аккуратно, с согласием гостя и на российской инфраструктуре.",
  },
];

export const metadata: Metadata = {
  title: "RestoBot — меню и заказы в Telegram для ресторанов",
  description:
    "RestoBot помогает ресторанам, кафе и доставке принимать заказы в Telegram: живое меню, корзина, статусы, админ-панель и 14 дней бесплатного теста.",
  keywords: [
    "telegram бот для ресторана",
    "бот для кафе",
    "бот для доставки еды",
    "меню в telegram",
    "заказы в telegram для ресторана",
    "бот для приема заказов",
    "чат бот для ресторана",
    "RestoBot",
  ],
  alternates: {
    canonical: "https://chatbot24.su/restobot",
  },
  openGraph: {
    title: "RestoBot — меню и заказы в Telegram для ресторанов",
    description:
      "Живое меню, заказы, самовывоз, доставка, статусы и админ-панель для ресторана в Telegram.",
    url: "https://chatbot24.su/restobot",
    type: "website",
    locale: "ru_RU",
    siteName: "ChatBot24",
  },
};

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-7 text-gray-400">{subtitle}</p>
      ) : null}
    </div>
  );
}

function FeatureCard({ item }: { item: CardItem }) {
  const { Icon } = item;

  return (
    <div className="rounded-2xl border border-primary-500/10 bg-bg-secondary/70 p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-400">{item.description}</p>
    </div>
  );
}

function JsonLd() {
  return (
    <>
      <Script
        id="schema-restobot-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "RestoBot",
            provider: {
              "@type": "Organization",
              name: "ChatBot24",
              url: "https://chatbot24.su",
            },
            areaServed: "RU",
          serviceType: "Telegram bot for restaurant menu and orders",
            url: "https://chatbot24.su/restobot",
          description:
            "Сервис для ресторанов, кафе и доставки: QR-меню в Telegram, корзина, самовывоз, доставка, статусы заказов и админ-панель для меню, заказов и аналитики.",
          }),
        }}
      />
      <Script
        id="schema-restobot-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.description,
              },
            })),
          }),
        }}
      />
    </>
  );
}

export default function RestoBotPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary pt-24">
        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
                14 дней бесплатного теста
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                RestoBot: заказы из Telegram без звонков, путаницы и лишней комиссии
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
                Гость открывает меню по QR-коду или ссылке, выбирает блюда,
                оформляет доставку, самовывоз или заказ в зале. Команда получает
                понятный заказ в админ-панели и ведёт его до готовности.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-300">
                {["14 дней бесплатно", "От 2 990 ₽/мес.", "Данные в России"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary-500/20 bg-bg-secondary/70 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <RestoBotActions source="restobot_hero" className="mt-8" />
            </div>

            <div className="rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-500/15 via-bg-secondary to-bg-tertiary p-4 shadow-2xl shadow-primary-500/10">
              <div className="rounded-2xl border border-primary-500/10 bg-bg-primary/80 p-5">
                <div className="mb-5 flex items-center justify-between border-b border-primary-500/10 pb-4">
                  <div>
                    <p className="text-sm text-primary-300">RestoBot</p>
                    <p className="text-lg font-semibold text-white">Заказ в Telegram</p>
                  </div>
                  <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs text-primary-300">
                    pilot
                  </span>
                </div>
                <div className="space-y-3">
                  {["Пицца Маргарита", "Паста с томатами", "Салат с курицей"].map((dish, index) => (
                    <div
                      key={dish}
                      className="flex items-center justify-between rounded-xl border border-primary-500/10 bg-bg-secondary/70 p-4"
                    >
                      <div>
                        <p className="font-medium text-white">{dish}</p>
                        <p className="text-sm text-gray-500">Категория #{index + 1}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary-300">
                        В заказ
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-primary-500/10 p-4">
                  <p className="text-sm font-medium text-white">Заказ #1042</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Самовывоз на 13:30, оплата картой при получении
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Как работает"
              title="От QR-кода до готового заказа"
              subtitle="RestoBot убирает лишние шаги: гость сам выбирает блюда, а ресторан получает структурированный заказ вместо звонка, голосового сообщения или переписки в личке."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {productFlow.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-primary-500/10 bg-bg-primary/70 p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
                    Пример
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    Пример: кофейня принимает предзаказы на обед
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-gray-400">
                    Утром гость открывает Telegram-меню, выбирает комбо, указывает
                    телефон и время самовывоза. В админ-панели появляется заказ
                    со статусом «новый». Сотрудник подтверждает его, кухня готовит
                    к указанному времени, администратор меняет статус на «готов».
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Не надо принимать заказ на слух в час пик",
                    "Состав, сумма и комментарий уже собраны в заказе",
                    "Недоступные позиции не попадают в корзину гостя",
                    "Контакт гостя остаётся в базе ресторана",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl border border-primary-500/10 bg-bg-secondary/70 p-4 text-sm leading-6 text-gray-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-300" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="restobot-faq" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Для кого"
              title="Кому подходит"
              subtitle="RestoBot подходит заведениям, которым нужен быстрый канал прямых заказов, а не заказная разработка на месяцы."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {audience.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Боль"
              title="Гости хотят заказать быстро. Ресторану важно не потерять маржу"
              subtitle="Проблема часто не в спросе, а в ручной обработке: звонки, личные сообщения, устаревшее меню и отсутствие единого места для заказов."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {problems.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Возможности"
              title="Что видит гость в Telegram"
              subtitle="Гость получает привычный путь онлайн-заказа без установки приложения: меню, корзина, контакты, способ получения и подтверждение."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="admin-panel" className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Админ-панель"
              title="Как ресторан управляет RestoBot"
              subtitle="Панель рассчитана на управляющего, администратора и смену: принять заказ, обновить меню, скрыть блюдо, посмотреть цифры и настроить рабочий день."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {adminSteps.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: "Перед сменой",
                  text: "Проверьте часы работы, доступность блюд, низкий запас ингредиентов и отключите позиции, которые сегодня нельзя продавать.",
                },
                {
                  title: "Во время смены",
                  text: "Работайте в разделе «Заказы»: новые заказы фильтруются по статусу, детали открываются в один клик, статус меняется после подтверждения кухни.",
                },
                {
                  title: "После смены",
                  text: "Откройте дашборд: заказы, выручка, средний чек, активные брони и топ-блюда показывают, что продавалось лучше всего.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-6"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Польза для бизнеса"
              title="Больше прямых заказов, меньше ручной работы"
              subtitle="RestoBot собирает сильные практики ресторанных сервисов в Telegram-сценарии: QR-вход, живое меню, стоп-лист, статусы, аналитика и база гостей для повторных продаж."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {ownerBenefits.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Запуск"
              title="Как проходит тестовый запуск"
              subtitle="Начинаем с одного понятного сценария, проверяем его на вашем меню и только потом расширяем возможности."
            />
            <div className="grid gap-4 lg:grid-cols-5">
              {launchSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-primary-500/10 bg-bg-primary/70 p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary-300" aria-hidden="true" />
                    <span className="font-mono text-sm text-gray-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Сценарии"
              title="Какие задачи закрывает RestoBot"
              subtitle="Можно начать с простого Telegram-меню, а затем добавить самовывоз, доставку, бронирования, статусы и аналитику."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Telegram бот для ресторана",
                  description: "Собственный канал прямых заказов, где гость видит меню, выбирает блюда и оставляет контакты.",
                },
                {
                  title: "Бот для кафе",
                  description: "Подходит кофейням и небольшим заведениям, которым нужен быстрый запуск без отдельного сайта.",
                },
                {
                  title: "Бот для доставки еды",
                  description: "Помогает принимать доставку и самовывоз без ручного сбора адресов, телефонов и комментариев.",
                },
                {
                  title: "Меню в Telegram",
                  description: "Гость открывает актуальное меню в привычном канале, без установки отдельного приложения.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-primary-500/10 bg-bg-primary/70 p-6"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Честные рамки"
              title="Сначала продающий сценарий, потом сложные интеграции"
              subtitle="RestoBot запускает собственный канал меню и заказов. Он не притворяется полной ресторанной ERP и не заставляет заведение ждать большой проект."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {notIncludedItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-6"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                    <XCircle className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="offer" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Оффер"
              title="14 дней бесплатно. Дальше подписка от 2 990 ₽/мес."
              subtitle="Проверьте RestoBot на своём меню и процессе. Если сценарий подходит, подключаете подписку без долгого контракта."
            />
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.1fr]">
              <div className="rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 to-bg-secondary p-7 shadow-lg shadow-primary-500/10">
                <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
                  Пилот
                </span>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
                  Тестовый запуск
                </p>
                <p className="mt-3 text-4xl font-bold text-white">
                  14 дней бесплатно
                </p>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  За две недели можно пройти путь гостя, проверить меню, заказ,
                  статусы и понять, как RestoBot вписывается в работу смены.
                </p>
                <RestoBotActions source="restobot_offer" className="mt-8" compact />
              </div>

              <div className="rounded-3xl border border-primary-500/10 bg-bg-secondary/70 p-7">
                <h3 className="text-xl font-bold text-white">Что входит</h3>
                <ul className="mt-6 space-y-4">
                  {offerItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-gray-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-300" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-2xl border border-primary-500/10 bg-bg-primary/70 p-4 text-sm leading-6 text-gray-400">
                  Стоимость подписки начинается от 2 990 ₽/мес. Финальный пакет
                  зависит от сценария и фиксируется до коммерческого запуска.
                  Вход в пилот не требует отдельного большого внедрения.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="restobot-request" className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
                Бесплатный тест
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Получите сценарий RestoBot под ваше заведение
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Оставьте короткую заявку, и мы подготовим разговор не с нуля, а
                вокруг вашего меню, формата заведения и нужного сценария:
                самовывоз, доставка, заказы в зале или бронирования.
              </p>
              <div className="mt-6 space-y-3 text-sm text-gray-300">
                {[
                  "Сразу видим формат заведения, город и готовность меню",
                  "Понимаем, какой сценарий запускать первым",
                  "После заявки можно обсуждать запуск, а не заполнять длинные анкеты",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-300" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <RestoBotLeadForm />
          </div>
        </section>

        <section className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Надёжность"
              title="Запуск без лишних обещаний и риска для данных"
              subtitle="RestoBot закрывает первый рабочий сценарий, аккуратно работает с данными гостей и оставляет место для развития после пилота."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Данные в России",
                  description: "Инфраструктура продукта проектируется с размещением данных в России.",
                  Icon: Database,
                },
                {
                  title: "Аккуратная работа с данными",
                  description: "Контакты гостей и история заказов обрабатываются с согласием и без лишнего доступа для сторонних сервисов.",
                  Icon: ShieldCheck,
                },
                {
                  title: "Пилот вместо интеграции на полгода",
                  description: "Сначала проверяем рабочий сценарий на реальном меню, потом обсуждаем развитие и интеграции.",
                  Icon: CheckCircle2,
                },
              ].map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
            <div className="divide-y divide-primary-500/10 rounded-3xl border border-primary-500/10 bg-bg-secondary/70">
              {faqItems.map((item) => (
                <div key={item.title} className="p-6">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-4xl rounded-3xl border border-primary-500/20 bg-gradient-to-br from-bg-secondary to-bg-tertiary p-8 text-center shadow-lg shadow-primary-500/10 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
              Следующий шаг
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Проверьте RestoBot на своём меню
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-400">
              За 14 дней можно понять, подходит ли Telegram-меню вашему заведению:
              как гости оформляют заказ, как команда обрабатывает заказы и какие
              сценарии стоит развивать дальше.
            </p>
            <RestoBotActions source="restobot_final" className="mt-8 justify-center" />
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd />
      <RestoBotAnalytics />
    </>
  );
}
