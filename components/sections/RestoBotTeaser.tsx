"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { ArrowRight, Store, UtensilsCrossed } from "lucide-react";
import { trackGoal } from "@/lib/metrika";

export default function RestoBotTeaser() {
  return (
    <Section className="py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-primary-500/15 bg-gradient-to-br from-bg-secondary/80 to-bg-primary/90 p-6 sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
              <UtensilsCrossed className="h-4 w-4" />
              Новое направление для HoReCa
            </div>

            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              RestoBot для кафе, ресторанов и доставки
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-gray-300">
              Запускаем отдельный Telegram-first продукт для заведений, которым
              нужен свой канал меню и заказов без тяжёлого внедрения и длинной
              разработки.
            </p>

            <ul className="mt-6 space-y-3 text-gray-200">
              <li className="flex items-start gap-3">
                <Store className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                <span>Меню, заказ и статусы в одном контуре</span>
              </li>
              <li className="flex items-start gap-3">
                <Store className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                <span>Первый месяц бесплатно для пилотного запуска</span>
              </li>
              <li className="flex items-start gap-3">
                <Store className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-400" />
                <span>Отдельная страница и сценарий запуска уже готовы</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-primary-500/15 bg-bg-primary/70 p-6 sm:p-7">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-300">
              Для кого
            </p>
            <p className="mt-4 text-lg text-white">
              Для заведений, которые устали терять заказы в звонках и хотят
              запустить собственный канал заказов в Telegram без нового большого
              IT-проекта.
            </p>

            <div className="mt-6">
              <Link
                href="/restobot"
                onClick={() =>
                  trackGoal("restobot_teaser_click", { source: "home_teaser" })
                }
              >
                <Button size="lg" className="group w-full">
                  Перейти на страницу RestoBot
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
