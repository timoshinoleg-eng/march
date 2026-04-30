"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { trackGoal, trackMessengerClick } from "@/lib/metrika";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MessageSquareMore,
  MenuSquare,
  ReceiptText,
  Shield,
  ShoppingCart,
  Store,
  Truck,
} from "lucide-react";

const TELEGRAM_URL =
  "https://t.me/chatbot24su?text=%D0%A5%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5%20%D0%BE%20RestoBot";

const audience = [
  "Кафе и кофейни с 1–3 точками",
  "Небольшие рестораны",
  "Доставка и dark kitchen",
  "Заведения, где заказы всё ещё живут в звонках и мессенджерах",
];

const problems = [
  {
    icon: MessageSquareMore,
    title: "Заказы теряются в звонках и чатах",
    description:
      "Когда заявки приходят по телефону, в WhatsApp и в личные сообщения, сотрудник легко теряет адрес, время или сам заказ.",
  },
  {
    icon: MenuSquare,
    title: "Меню сложно поддерживать актуальным",
    description:
      "Цены меняются, блюда заканчиваются, а клиент продолжает видеть старую версию меню.",
  },
  {
    icon: Clock3,
    title: "Сайт и подрядчик превращаются в длинный проект",
    description:
      "Заведению нужен рабочий канал заказов, а не ещё один цикл согласований и правок на недели.",
  },
  {
    icon: ReceiptText,
    title: "Агрегаторы забирают маржу и клиента",
    description:
      "У заведения нет собственного канала заказов и прямого контакта с клиентом.",
  },
];

const capabilities = [
  {
    icon: Store,
    title: "Меню-каталог",
    description: "Клиент видит актуальные позиции и категории в Telegram.",
  },
  {
    icon: ShoppingCart,
    title: "Оформление заказа",
    description:
      "Клиент выбирает блюда, оставляет имя, телефон и комментарий к заказу.",
  },
  {
    icon: Truck,
    title: "Самовывоз и доставка",
    description:
      "В сценарии заказа видно, как клиент получает заказ: самовывозом или доставкой.",
  },
  {
    icon: CheckCircle2,
    title: "Статусы заказа",
    description:
      "Администратор меняет статус, а клиент получает понятный прогресс по заказу.",
  },
];

const launchSteps = [
  "Пишете в Telegram и получаете стартовый сценарий.",
  "Передаёте меню и базовые данные по заведению.",
  "Поднимается пилотный контур и проверяется путь клиента.",
  "Проходим тестовый заказ и запускаем ссылку или QR для клиентов.",
];

const faq = [
  {
    q: "Нужен ли отдельный сайт?",
    a: "Нет. Для первого пилота RestoBot не требует отдельного сайта. Заказный контур работает в Telegram.",
  },
  {
    q: "Что нужно от заведения на старте?",
    a: "Название заведения, список позиций, цены и выбранный способ получения заказов. Этого достаточно для первого пилотного запуска.",
  },
  {
    q: "Как обновляется меню?",
    a: "Меню поддерживается через управляемый контур без необходимости каждый раз переделывать сайт или печатные материалы.",
  },
  {
    q: "Что происходит после бесплатного месяца?",
    a: "После пилотного периода подключается платный тариф. Финальная тарифная упаковка подтверждается отдельно до начала активных продаж.",
  },
  {
    q: "Что с данными клиентов?",
    a: "Работа строится в российском инфраструктурном контуре. На странице мы не даём неподтверждённых юридических обещаний и сохраняем формулировки в аккуратной зоне доверия.",
  },
];

function trackTelegram(source: string) {
  trackGoal("restobot_telegram_click", { source });
  trackMessengerClick("telegram_restobot");
}

export default function RestoBotLanding() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary">
        <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-24 left-0 h-72 w-72 rounded-full bg-primary-500/20 blur-[120px]" />
            <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-primary-300/10 blur-[140px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent_45%)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-5xl text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
                <Store className="h-4 w-4" />
                Отдельное решение для ресторанов, кафе и доставки
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Запустите меню и заказы в Telegram
                <span className="block bg-gradient-emerald bg-clip-text text-transparent">
                  без сложного внедрения
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 sm:text-xl">
                RestoBot помогает кафе и ресторанам быстро запустить свой канал
                заказов: клиент видит меню, оформляет заказ, а администратор
                получает заявку и меняет статус в одном контуре.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={TELEGRAM_URL}
                  target="_blank"
                  onClick={() => trackTelegram("hero_primary")}
                >
                  <Button size="lg" className="group min-w-[240px]">
                    Запустить бесплатно
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link
                  href={TELEGRAM_URL}
                  target="_blank"
                  onClick={() => trackTelegram("hero_secondary")}
                >
                  <Button variant="outline" size="lg" className="min-w-[240px]">
                    Получить демо в Telegram
                  </Button>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
                <span className="rounded-full border border-primary-500/15 bg-bg-secondary/60 px-3 py-1.5">
                  Первый месяц бесплатно
                </span>
                <span className="rounded-full border border-primary-500/15 bg-bg-secondary/60 px-3 py-1.5">
                  Без setup fee
                </span>
                <span className="rounded-full border border-primary-500/15 bg-bg-secondary/60 px-3 py-1.5">
                  Данные и инфраструктурный контур в России
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white sm:text-4xl"
              >
                Для кого подходит RestoBot
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 max-w-2xl text-lg text-gray-400"
              >
                Это не тяжёлая система автоматизации ресторана. Это быстрый
                pilot-first контур для заведений, которым нужен собственный
                канал заказов без нового длинного проекта.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-primary-500/15 bg-bg-secondary/50 p-6"
            >
              <ul className="space-y-4">
                {audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Section>

        <Section className="bg-bg-secondary/25">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Почему заведения теряют заказы
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-3xl text-lg text-gray-400"
            >
              Обычно проблема не в отсутствии спроса, а в том, что заказный
              контур работает вручную и рассыпается в пиковые часы.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-primary-500/15 bg-bg-primary/70 p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300">
                  <problem.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{problem.title}</h3>
                <p className="mt-3 text-gray-400">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Что уже умеет MVP
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-4 max-w-3xl text-lg text-gray-400"
            >
              На старте показываем только тот набор, который реально нужен для
              первого пилота.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-primary-500/15 bg-bg-secondary/45 p-6"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-300">
                  <capability.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 text-gray-400">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section className="bg-bg-secondary/25">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white sm:text-4xl"
              >
                Как проходит запуск
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-4 max-w-2xl text-lg text-gray-400"
              >
                Запуск строится как короткий pilot-first процесс, а не как
                длинное внедрение.
              </motion.p>
            </div>

            <div className="space-y-4">
              {launchSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="flex gap-4 rounded-2xl border border-primary-500/15 bg-bg-primary/70 p-5"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-emerald font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-2 text-gray-200">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-primary-500/15 bg-bg-secondary/45 p-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
                <Shield className="h-4 w-4" />
                Доверие и инфраструктура
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">
                Аккуратный запуск и работа с данными
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                RestoBot разворачивается в российском инфраструктурном контуре и
                изначально проектируется как пилотный SaaS-сценарий для
                аккуратной работы с клиентскими данными.
              </p>
              <p className="mt-4 text-gray-400">
                Это не главный рекламный лозунг страницы, но это важная часть
                доверия к продукту.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-primary-500/15 bg-bg-primary/75 p-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
                <CheckCircle2 className="h-4 w-4" />
                Первый месяц бесплатно
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">
                Проверяете сценарий на реальном заведении
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Первый месяц нужен не для “акции ради акции”, а чтобы заведение
                спокойно проверило сценарий на реальных клиентах и заказах.
              </p>

              <ul className="mt-6 space-y-3 text-gray-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <span>Первый месяц бесплатно</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <span>Без setup fee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                  <span>Запуск как пилот, а не как длинный проект</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </Section>

        <Section className="bg-bg-secondary/25">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Частые вопросы
            </motion.h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-primary-500/15 bg-bg-primary/75 p-6"
              >
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-gray-400">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="final-cta">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl rounded-3xl border border-primary-500/15 bg-gradient-to-br from-bg-secondary/70 to-bg-primary/80 p-8 text-center sm:p-12"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Проверьте пилотный сценарий на своём заведении
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Если вам нужен не большой IT-проект, а понятный способ запустить
              меню и заказы в Telegram, следующий шаг один — перейти в Telegram
              и начать пилотный сценарий.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={TELEGRAM_URL}
                target="_blank"
                onClick={() => trackTelegram("final_cta_primary")}
              >
                <Button size="lg" className="group min-w-[240px]">
                  Написать в Telegram
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/" className="min-w-[240px]">
                <Button variant="outline" size="lg" className="w-full">
                  На главную ChatBot24
                </Button>
              </Link>
            </div>
          </motion.div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
