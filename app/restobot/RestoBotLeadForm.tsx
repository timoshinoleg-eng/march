"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { trackFormSubmit, trackGoal } from "@/lib/metrika";

interface FormState {
  restaurantName: string;
  name: string;
  phone: string;
  telegram: string;
  restaurantFormat: string;
  orderMode: string;
  menuStatus: string;
  city: string;
}

const initialFormState: FormState = {
  restaurantName: "",
  name: "",
  phone: "",
  telegram: "",
  restaurantFormat: "Кафе / кофейня",
  orderMode: "Самовывоз и доставка",
  menuStatus: "Есть меню в таблице или PDF",
  city: "",
};

const restaurantFormats = [
  "Кафе / кофейня",
  "Небольшой ресторан",
  "Доставка / dark kitchen",
  "Сеть до 3 точек",
];

const orderModes = [
  "Самовывоз и доставка",
  "Только самовывоз",
  "Только доставка",
  "Хочу проверить сценарий",
];

const menuStatuses = [
  "Есть меню в таблице или PDF",
  "Есть меню на сайте",
  "Меню нужно собрать",
  "Пока хочу демо",
];

export default function RestoBotLeadForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    trackGoal("restobot_lead_submit_attempt");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          product: "restobot",
          source: "RestoBot Landing",
          category: "RESTOBOT",
          score: 90,
          budget: "14 дней бесплатно, далее от 2 990 ₽/мес.",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Не удалось отправить заявку");
      }

      trackFormSubmit("restobot_pilot");
      trackGoal("restobot_lead_submit_success");
      setStatus("success");
      setFormData(initialFormState);
    } catch (submitError) {
      setStatus("error");
      trackGoal("restobot_lead_submit_error");
      setError(submitError instanceof Error ? submitError.message : "Не удалось отправить заявку");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-primary-500/20 bg-bg-secondary/70 p-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/10">
          <CheckCircle2 className="h-8 w-8 text-primary-300" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-white">Заявка на пилот принята</h3>
        <p className="mt-3 text-sm leading-6 text-gray-400">
          Мы получили контекст по заведению и свяжемся с вами, чтобы обсудить меню,
          тестовый заказ и запуск RestoBot.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-primary-500/20 bg-bg-secondary/70 p-6 shadow-lg shadow-primary-500/10 sm:p-7"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
          Бриф на тест RestoBot
        </p>
        <h3 className="mt-2 text-2xl font-bold text-white">Получите 14 дней бесплатного теста</h3>
        <p className="mt-2 text-sm leading-6 text-gray-400">
          Заполните короткий бриф, чтобы менеджер сразу увидел формат заведения,
          меню и сценарий заказов.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm text-gray-300">Название заведения *</span>
          <input
            required
            value={formData.restaurantName}
            onChange={(event) => updateField("restaurantName", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary-400 focus:outline-none"
            placeholder="Например, Coffee Point"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-gray-300">Имя *</span>
          <input
            required
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary-400 focus:outline-none"
            placeholder="Как к вам обращаться"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-gray-300">Телефон *</span>
          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary-400 focus:outline-none"
            placeholder="+7"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-gray-300">Telegram</span>
          <input
            value={formData.telegram}
            onChange={(event) => updateField("telegram", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary-400 focus:outline-none"
            placeholder="@username"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-gray-300">Город</span>
          <input
            value={formData.city}
            onChange={(event) => updateField("city", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white placeholder:text-gray-600 focus:border-primary-400 focus:outline-none"
            placeholder="Москва"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm text-gray-300">Формат</span>
          <select
            value={formData.restaurantFormat}
            onChange={(event) => updateField("restaurantFormat", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white focus:border-primary-400 focus:outline-none"
          >
            {restaurantFormats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-2 block text-sm text-gray-300">Сценарий</span>
          <select
            value={formData.orderMode}
            onChange={(event) => updateField("orderMode", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white focus:border-primary-400 focus:outline-none"
          >
            {orderModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </label>

        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm text-gray-300">Меню</span>
          <select
            value={formData.menuStatus}
            onChange={(event) => updateField("menuStatus", event.target.value)}
            className="w-full rounded-lg border border-primary-500/20 bg-bg-primary px-4 py-3 text-white focus:border-primary-400 focus:outline-none"
          >
            {menuStatuses.map((menuStatus) => (
              <option key={menuStatus} value={menuStatus}>
                {menuStatus}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-emerald px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary-500/25 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : null}
        Отправить бриф и получить тест
      </button>
    </form>
  );
}
