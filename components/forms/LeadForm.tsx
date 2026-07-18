"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LeadFormData } from "@/lib/validations";
import { trackFormSubmit } from "@/lib/metrika";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface LeadFormProps {
  onSuccess?: () => void;
  className?: string;
}

/**
 * Форма заявки.
 *
 * P0.7: подтверждение показывается ТОЛЬКО при response.ok && data.success
 *       && data.telegramSent. При ошибке — пользователь видит сообщение
 *       и может повторить.
 * P0.9: обязательный чекбокс согласия на обработку ПДн.
 *       Без согласия кнопка submit disabled и API вернёт 400.
 */
export default function LeadForm({ onSuccess, className = "" }: LeadFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
  });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // P0.9: жёсткая проверка согласия на клиенте (дублирует серверную).
    if (!consent) {
      setSubmitError(
        "Нужно согласие на обработку персональных данных, чтобы отправить заявку."
      );
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // P0.9: передаём факт согласия и версию документа.
          consent: true,
          consentVersion: "2026-07",
          consentSource: "lead_form",
        }),
      });

      // P0.7: сервер всегда возвращает JSON (даже при ошибке).
      let data: {
        success?: boolean;
        telegramSent?: boolean;
        error?: string;
        details?: { path: string[]; message: string }[];
      } = {};
      try {
        data = await response.json();
      } catch {
        // не JSON — считаем ошибкой
      }

      // P0.7: успех = HTTP 2xx И success:true И telegramSent:true.
      const delivered =
        response.ok && data.success === true && data.telegramSent === true;

      if (delivered) {
        setIsSuccess(true);
        trackFormSubmit("lead_form");
        setFormData({ name: "", phone: "", email: "", company: "" });
        setConsent(false);
        onSuccess?.();
        router.push("/thanks?source=lead_form");
      } else {
        // Показываем ошибку. Если есть field-errors — подсвечиваем поля.
        if (Array.isArray(data.details) && data.details.length > 0) {
          const fieldErrors: Record<string, string> = {};
          data.details.forEach((err) => {
            if (err.path && err.path[0]) fieldErrors[err.path[0]] = err.message;
          });
          setErrors(fieldErrors);
        }
        setSubmitError(
          data.error ||
            (data.telegramSent === false
              ? "Не удалось отправить уведомление менеджеру. Попробуйте ещё раз или напишите в Telegram."
              : "Не удалось отправить заявку. Попробуйте ещё раз.")
        );
      }
    } catch (error) {
      // P0.7: network-ошибка — показываем пользователю, не молчим.
      console.error("Form submission error:", error);
      setSubmitError(
        "Сеть недоступна. Проверьте соединение и попробуйте ещё раз, или напишите нам в Telegram."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={className}>
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
          suppressHydrationWarning
        >
          <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary-400" />
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">
            Заявка отправлена!
          </h4>
          <p className="text-gray-400">
            Мы свяжемся с вами в рабочее время.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
          suppressHydrationWarning
        >
          <Input
            label="Ваше имя *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Иван Иванов"
            error={errors.name}
            required
          />
          <Input
            label="Телефон *"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (999) 999-99-99"
            error={errors.phone}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="info@company.ru"
            error={errors.email}
          />
          <Input
            label="Компания"
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            placeholder="ООО Компания"
            error={errors.company}
          />

          {/* P0.9: согласие на обработку ПДн — обязательно. */}
          <label className="flex items-start gap-3 text-xs text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (e.target.checked) setSubmitError(null);
              }}
              className="mt-0.5 w-4 h-4 rounded border-gray-600 bg-bg-secondary text-primary-500 focus:ring-primary-500 flex-shrink-0"
              required
            />
            <span>
              Я согласен с{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                Политикой конфиденциальности
              </Link>{" "}
              и{" "}
              <Link
                href="/personal-data-consent"
                target="_blank"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                согласием на обработку персональных данных
              </Link>
              .
            </span>
          </label>

          {/* P0.7: явное сообщение об ошибке отправки. */}
          {submitError && (
            <div
              role="alert"
              aria-live="polite"
              className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            disabled={!consent}
          >
            <Send className="w-4 h-4 mr-2" />
            Отправить заявку
          </Button>
        </motion.form>
      )}
    </div>
  );
}
