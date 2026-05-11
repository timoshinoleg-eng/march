import type { Metadata } from "next";
import Script from "next/script";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Coffee,
  Database,
  EyeOff,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Package,
  PhoneMissed,
  RefreshCcw,
  ShieldCheck,
  Store,
  Truck,
  Utensils,
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
    description: "Для заведений, где важно быстро принимать заказы без длинного IT-проекта.",
    Icon: Coffee,
  },
  {
    title: "Небольшие рестораны",
    description: "Для команд, которым нужен собственный канал заказов рядом с текущими процессами.",
    Icon: Store,
  },
  {
    title: "Доставка и самовывоз",
    description: "Для сценариев, где клиенту проще открыть меню в Telegram и оформить заказ.",
    Icon: Truck,
  },
  {
    title: "Dark kitchen",
    description: "Для пилотного запуска меню, заказов и статусов без отдельного сайта.",
    Icon: Utensils,
  },
];

const problems: CardItem[] = [
  {
    title: "Заказы теряются в звонках",
    description: "В пиковые часы сотрудник легко пропускает звонок, адрес, время или комментарий.",
    Icon: PhoneMissed,
  },
  {
    title: "Мессенджеры создают ручной хаос",
    description: "Заявки приходят в разные чаты, а единого понятного контура обработки нет.",
    Icon: MessageSquare,
  },
  {
    title: "Меню быстро устаревает",
    description: "Цены меняются, позиции заканчиваются, а клиент всё ещё видит старую версию.",
    Icon: RefreshCcw,
  },
  {
    title: "Агрегаторы забирают маржу",
    description: "Заведению нужен собственный канал, база клиентов и прямой контакт с гостем.",
    Icon: ArrowRight,
  },
];

const capabilities: CardItem[] = [
  {
    title: "Меню-каталог",
    description: "Актуальные категории, позиции, цены и описание блюд в клиентском сценарии.",
    Icon: ClipboardList,
  },
  {
    title: "Оформление заказа",
    description: "Клиент выбирает блюда, оставляет контакты и комментарий без звонка.",
    Icon: MessageSquare,
  },
  {
    title: "Самовывоз и доставка",
    description: "В пилоте можно принимать заказы под доступные способы получения.",
    Icon: Package,
  },
  {
    title: "Статусы заказа",
    description: "Администратор меняет статус, а клиент видит понятный прогресс.",
    Icon: ListChecks,
  },
  {
    title: "Стоп-лист",
    description: "Недоступные позиции можно скрыть, чтобы клиент не заказывал лишнее.",
    Icon: EyeOff,
  },
  {
    title: "Базовый admin-контур",
    description: "Заведение видит заказы и управляет ими без тяжёлой системы.",
    Icon: LayoutDashboard,
  },
];

const launchSteps: StepItem[] = [
  {
    title: "Пишете в Telegram",
    description: "Получаете стартовый сценарий и шаблон для меню.",
  },
  {
    title: "Передаёте меню",
    description: "Нужны позиции, цены, категории и способы получения заказов.",
  },
  {
    title: "Настраиваем пилот",
    description: "Поднимаем меню, клиентский путь и базовую обработку заказа.",
  },
  {
    title: "Проверяем тестовый заказ",
    description: "Проходим сценарий от клиента до администратора.",
  },
  {
    title: "Запускаете QR или ссылку",
    description: "После проверки можно начинать пилот на реальных клиентах.",
  },
];

const offerItems = [
  "Первый месяц бесплатно",
  "Без setup fee на пилотном запуске",
  "Подписка после проверки сценария",
  "Меню, заказы и статусы в Telegram",
  "Российский инфраструктурный контур",
];

const notIncludedItems: StepItem[] = [
  {
    title: "Не заменяем POS и склад",
    description: "RestoBot не претендует на роль кассовой, складской или ресторанной ERP-системы в первом пилоте.",
  },
  {
    title: "Не обещаем полную автоматизацию",
    description: "Первый контур закрывает меню, заказ и статусы. Сложные интеграции обсуждаются после проверки сценария.",
  },
  {
    title: "Не делаем новый сайт на месяцы",
    description: "Пилот запускается вокруг Telegram-сценария, чтобы быстрее проверить спрос и процесс обработки заказа.",
  },
];

const faqItems: StepItem[] = [
  {
    title: "RestoBot — это Telegram бот для ресторана?",
    description: "Да. RestoBot — Telegram-first бот для ресторана, кафе или доставки еды: клиент открывает меню в Telegram, выбирает позиции и оформляет заказ.",
  },
  {
    title: "Можно ли использовать как бот для кафе без сайта?",
    description: "Да. Для первого пилота не нужен отдельный сайт: меню, заказ и статусы работают в Telegram-сценарии.",
  },
  {
    title: "Сколько времени занимает запуск?",
    description: "Сначала собираем меню и базовые данные, затем настраиваем пилотный контур и проходим тестовый заказ. Конкретный срок зависит от готовности меню.",
  },
  {
    title: "Нужен ли заведению сайт?",
    description: "Нет. Для первого пилота достаточно Telegram-сценария с меню и заказом.",
  },
  {
    title: "Как обновляется меню?",
    description: "Меню поддерживается через управляемый контур: можно обновлять позиции, цены и стоп-лист без переделки сайта.",
  },
  {
    title: "Как клиент делает заказ?",
    description: "Клиент открывает меню в Telegram, выбирает позиции, оставляет контакты и получает статус в том же канале.",
  },
  {
    title: "Что происходит после бесплатного месяца?",
    description: "После пилота подключается платная подписка. Пакет и условия подтверждаются перед коммерческим запуском.",
  },
  {
    title: "Что с данными клиентов?",
    description: "Работа строится в российском инфраструктурном контуре. Юридические формулировки по compliance фиксируются аккуратно и без неподтверждённых обещаний.",
  },
];

export const metadata: Metadata = {
  title: "RestoBot — меню и заказы в Telegram для ресторанов",
  description:
    "Telegram бот для ресторана, кафе и доставки еды: меню в Telegram, приём заказов, статусы и пилотный запуск без сложного внедрения. Первый месяц бесплатно.",
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
      "Telegram бот для ресторана, кафе и доставки еды: меню, оформление заказа, статусы и пилотный запуск без тяжёлого внедрения.",
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
            "Telegram бот для ресторана, кафе и доставки еды: меню в Telegram, оформление заказа, статусы и базовый административный контур.",
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
                Новый подписочный продукт ChatBot24
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Telegram бот для ресторана: меню и заказы без сложного внедрения
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
                RestoBot помогает кафе, ресторанам и доставке запустить
                собственный канал заказов: клиент видит меню, оформляет заказ,
                а администратор получает заявку и меняет статус в одном контуре.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-300">
                {["Первый месяц бесплатно", "Без setup fee", "Данные в России"].map((item) => (
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
                    <p className="text-lg font-semibold text-white">Меню в Telegram</p>
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
                  <p className="mt-1 text-sm text-gray-400">Статус: готовится</p>
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
              subtitle="RestoBot рассчитан на заведения, которым нужен понятный подписочный сервис для меню и заказов, а не заказная разработка на месяцы."
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
              eyebrow="Проблемы"
              title="Почему заведения теряют заказы"
              subtitle="Проблема обычно не в отсутствии клиентов, а в том, что заказный контур работает вручную и рассыпается в пиковые часы."
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
              eyebrow="MVP"
              title="Что умеет бот для кафе и доставки"
              subtitle="На старте закрываем основной путь: клиент открывает меню в Telegram, оформляет заказ, заведение принимает его и ведёт статус."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item) => (
                <FeatureCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Запуск"
              title="Как проходит пилот"
              subtitle="Короткая настройка, тестовый заказ и понятный старт без тяжёлого внедрения."
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
              eyebrow="SEO-сценарии"
              title="Для каких ресторанных задач подходит RestoBot"
              subtitle="Страница закрывает ключевые запросы владельца: Telegram бот для ресторана, бот для кафе, бот для доставки еды и меню в Telegram."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Telegram бот для ресторана",
                  description: "Собственный канал заказов, где гость видит меню, выбирает блюда и получает статус.",
                },
                {
                  title: "Бот для кафе",
                  description: "Подходит кофейням и небольшим заведениям, которым нужен быстрый пилот без отдельного сайта.",
                },
                {
                  title: "Бот для доставки еды",
                  description: "Помогает принимать заказы на доставку или самовывоз и не терять клиента в переписке.",
                },
                {
                  title: "Меню в Telegram",
                  description: "Клиент открывает актуальное меню в привычном канале, без установки отдельного приложения.",
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
              eyebrow="Границы пилота"
              title="Что не входит в первый MVP"
              subtitle="Так мы сразу выравниваем ожидания: RestoBot запускает собственный канал меню и заказов, но не притворяется полной ресторанной платформой."
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
              title="Первый месяц бесплатно, дальше подписка"
              subtitle="Сначала проверяете сценарий на своём заведении. После пилота подключается платный тариф без долгого контракта."
            />
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.1fr]">
              <div className="rounded-3xl border border-primary-500/30 bg-gradient-to-br from-primary-500/20 to-bg-secondary p-7 shadow-lg shadow-primary-500/10">
                <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
                  Пилот
                </span>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
                  Стартовый оффер
                </p>
                <p className="mt-3 text-4xl font-bold text-white">
                  1 месяц бесплатно
                </p>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Период нужен, чтобы спокойно проверить меню, оформление
                  заказа и обработку статусов на реальном процессе заведения.
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
                  Финальная стоимость подписки подтверждается перед
                  коммерческим запуском и зависит от выбранного пакета. Вход в
                  пилот не требует отдельного большого внедрения.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="restobot-request" className="bg-bg-secondary/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
                Лид-сценарий
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Заявка сразу с контекстом заведения
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-400">
                Эта форма отделяет RestoBot от общих заявок ChatBot24. В Telegram
                и CRM менеджер увидит, что речь о пилоте ресторанного бота, формате
                заведения, сценарии заказов и готовности меню.
              </p>
              <div className="mt-6 space-y-3 text-sm text-gray-300">
                {[
                  "Не нужно заново объяснять, что нужен именно RestoBot",
                  "Сразу понятно, есть ли меню и какой формат заказов запускать",
                  "Подходит для первого разговора без длинного брифа",
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
              eyebrow="Доверие"
              title="Аккуратный запуск и работа с данными"
              subtitle="RestoBot не обещает заменить всю ресторанную инфраструктуру. Он закрывает понятный первый контур и оставляет место для развития после пилота."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Российский контур",
                  description: "Инфраструктура продукта проектируется с размещением данных в России.",
                  Icon: Database,
                },
                {
                  title: "Аккуратная работа с данными",
                  description: "Compliance-блок остаётся практичным: без громких юридических обещаний на лендинге.",
                  Icon: ShieldCheck,
                },
                {
                  title: "Пилот вместо интеграции на полгода",
                  description: "Сначала проверяем рабочий сценарий, потом обсуждаем развитие продукта.",
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
              Проверьте пилотный сценарий на своём заведении
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-400">
              Если вам нужен не большой IT-проект, а понятный способ запустить
              меню и заказы в Telegram, напишите нам и начните пилотный сценарий.
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
