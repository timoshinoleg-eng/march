"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgePercent, Clock3, Utensils, X } from "lucide-react";

import { trackGoal } from "@/lib/metrika";

const restobotBriefHref =
  "/restobot?utm_source=main_site&utm_medium=promo&utm_campaign=restobot#restobot-request";

function trackRestoBotClick(source: string) {
  trackGoal("restobot_click", { source });
  trackGoal(`restobot_click_${source}`);
}

export function RestoBotPromoBar() {
  return (
    <div className="fixed left-0 right-0 top-16 z-40 border-b border-amber-400/20 bg-bg-primary/95 px-4 py-2 backdrop-blur-md sm:top-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2 text-sm text-gray-200">
          <span className="hidden rounded-full bg-amber-400/15 p-2 text-amber-300 sm:inline-flex">
            <Utensils className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            <strong className="font-semibold text-white">Спецпредложение для ресторанов и кафе:</strong>{" "}
            RestoBot, 14 дней бесплатно, далее от 2 990 ₽/мес.
          </span>
        </div>
        <Link
          href={restobotBriefHref.replace("promo", "promo_bar")}
          onClick={() => trackRestoBotClick("promo_bar")}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-amber-300"
        >
          Запустить тест
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export function RestoBotSolutionTeaser() {
  return (
    <section className="bg-bg-primary px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-2xl border border-amber-400/20 bg-bg-secondary/70 p-6 shadow-lg shadow-amber-400/5 md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-sm font-medium text-amber-300">
            <BadgePercent className="h-4 w-4" aria-hidden="true" />
            Отдельный продукт для HoReCa
          </div>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            RestoBot для кафе, ресторанов и доставок
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-300">
            Гость открывает меню в Telegram, выбирает блюда, оставляет контакты,
            бронирует стол или оформляет заказ. Заявка сразу попадает в вашу
            Telegram-группу, поэтому даже при неработающем Битриксе обращение не
            теряется.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={restobotBriefHref.replace("promo", "solution_card")}
              onClick={() => trackRestoBotClick("solution_card")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-emerald px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25"
            >
              Получить 14 дней бесплатно
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/restobot?utm_source=main_site&utm_medium=solution_card&utm_campaign=restobot"
              onClick={() => trackRestoBotClick("solution_card_details")}
              className="inline-flex items-center justify-center rounded-lg border border-primary-500/40 bg-bg-primary px-6 py-3 font-semibold text-primary-300 transition-colors hover:border-primary-400 hover:bg-primary-500/10"
            >
              Посмотреть возможности
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
          {[
            { label: "Меню в Telegram", value: "без сайта и приложения" },
            { label: "Заявки в группу", value: "видит администратор" },
            { label: "Старт подписки", value: "от 2 990 ₽/мес." },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-primary-500/10 bg-bg-primary/70 p-4"
            >
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="mt-1 text-sm text-gray-400">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RestoBotExitPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storageKey = "restobot_popup_seen_at";
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const lastSeen = Number(window.localStorage.getItem(storageKey) || 0);

    if (Date.now() - lastSeen < weekMs) {
      return;
    }

    let hasTriggered = false;

    const show = (source: string) => {
      if (hasTriggered) return;
      hasTriggered = true;
      window.localStorage.setItem(storageKey, String(Date.now()));
      trackGoal("restobot_popup_show", { source });
      setIsVisible(true);
    };

    const timer = window.setTimeout(() => show("timer"), 25000);

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = window.scrollY / scrollableHeight;
      if (progress >= 0.5) {
        show("scroll");
      }
    };

    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        show("exit_intent");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0">
      <div className="relative w-full max-w-lg rounded-2xl border border-amber-400/25 bg-bg-primary p-6 shadow-2xl shadow-black/40">
        <button
          type="button"
          onClick={() => {
            trackGoal("restobot_popup_close");
            setIsVisible(false);
          }}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Закрыть предложение RestoBot"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
          <Clock3 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="pr-10 text-2xl font-bold leading-tight text-white">
          Ресторан теряет заказы в звонках и мессенджерах?
        </h2>
        <p className="mt-3 text-sm leading-6 text-gray-300">
          Запустите меню, заказы и брони в Telegram. Первые 14 дней бесплатно,
          далее от 2 990 ₽/мес.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={restobotBriefHref.replace("promo", "popup")}
            onClick={() => trackRestoBotClick("popup")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-3 font-semibold text-bg-primary transition-colors hover:bg-amber-300"
          >
            Получить тест RestoBot
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => {
              trackGoal("restobot_popup_later");
              setIsVisible(false);
            }}
            className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Не сейчас
          </button>
        </div>
      </div>
    </div>
  );
}
