"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Section from "@/components/ui/Section";
import { Calculator, CheckCircle, ArrowRight } from "lucide-react";

// Маска телефона: +7 (XXX) XXX-XX-XX
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").substring(0, 11);
  if (digits.length === 0) return "";
  
  let formatted = "+7";
  if (digits.length > 1) formatted += " (" + digits.substring(1, 4);
  if (digits.length >= 4) {
    const end = Math.min(7, digits.length);
    formatted += ") " + digits.substring(4, end);
  }
  if (digits.length >= 7) {
    const end = Math.min(9, digits.length);
    formatted += "-" + digits.substring(7, end);
  }
  if (digits.length >= 9) {
    formatted += "-" + digits.substring(9, 11);
  }
  return formatted;
}

const dailyLeadsOptions = [
  { value: "", label: "Количество заявок в день" },
  { value: "до 10", label: "До 10" },
  { value: "10-30", label: "10-30" },
  { value: "30-100", label: "30-100" },
  { value: "100+", label: "100+" },
];

const crmTypeOptions = [
  { value: "", label: "Используемая CRM" },
  { value: "bitrix24", label: "Битрикс24" },
  { value: "amocrm", label: "amoCRM" },
  { value: "other", label: "Другая CRM" },
  { value: "none", label: "Нет CRM" },
];

function FinalCTAContent() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    dailyLeads: "",
    crmType: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Сбор UTM-меток из URL
  const utmData = {
    utmSource: searchParams.get("utm_source") || "",
    utmMedium: searchParams.get("utm_medium") || "",
    utmCampaign: searchParams.get("utm_campaign") || "",
    utmContent: searchParams.get("utm_content") || "",
    utmTerm: searchParams.get("utm_term") || "",
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Подготовка данных для API - убираем пустые строки для опциональных полей
    const payload = {
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      ...(formData.email && { email: formData.email }),
      ...(formData.dailyLeads && { dailyLeads: formData.dailyLeads }),
      ...(formData.crmType && { crmType: formData.crmType }),
      ...(utmData.utmSource && { utmSource: utmData.utmSource }),
      ...(utmData.utmMedium && { utmMedium: utmData.utmMedium }),
      ...(utmData.utmCampaign && { utmCampaign: utmData.utmCampaign }),
      ...(utmData.utmContent && { utmContent: utmData.utmContent }),
      ...(utmData.utmTerm && { utmTerm: utmData.utmTerm }),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({
          name: "",
          company: "",
          phone: "",
          email: "",
          dailyLeads: "",
          crmType: "",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="final-cta" className="bg-bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="gradient" className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4 sm:mb-6">
                  <Calculator className="w-4 h-4 text-primary-400" />
                  <span className="text-xs sm:text-sm text-primary-300">
                    Бесплатный расчет
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  Готовы перестать
                  <br />
                  <span className="bg-gradient-emerald bg-clip-text text-transparent">
                    терять заявки?
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto">
                  Оставьте контакты — мы рассчитаем, сколько заявок и денег
                  вы теряете сейчас
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-6 sm:py-8" role="status" aria-live="polite">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Заявка отправлена!
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="name" className="sr-only">Ваше имя</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ваше имя *"
                        required
                        aria-label="Ваше имя"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="sr-only">Компания</label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Компания *"
                        required
                        aria-label="Название компании"
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="sr-only">Телефон</label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__ *"
                        required
                        aria-label="Номер телефона"
                        aria-required="true"
                        inputMode="tel"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        aria-label="Email адрес"
                        inputMode="email"
                      />
                    </div>
                    
                    {/* Select для dailyLeads */}
                    <div className="relative">
                      <label htmlFor="dailyLeads" className="sr-only">Количество заявок в день</label>
                      <select
                        id="dailyLeads"
                        name="dailyLeads"
                        value={formData.dailyLeads}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-bg-secondary border border-primary-500/20 rounded-lg text-white text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-label="Количество заявок в день"
                      >
                        {dailyLeadsOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-bg-secondary">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Select для crmType */}
                    <div className="relative">
                      <label htmlFor="crmType" className="sr-only">Используемая CRM</label>
                      <select
                        id="crmType"
                        name="crmType"
                        value={formData.crmType}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-bg-secondary border border-primary-500/20 rounded-lg text-white text-sm sm:text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        aria-label="Используемая CRM система"
                      >
                        {crmTypeOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-bg-secondary">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    aria-label="Отправить заявку на расчет"
                  >
                    Получить расчет
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </form>
              )}

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-primary-400" aria-hidden="true" />
                  <span>Ответ в течение 2 часов</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-primary-400" aria-hidden="true" />
                  <span>Бесплатный аудит</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-primary-400" aria-hidden="true" />
                  <span>Без спама</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

// Обёртка для предотвращения hydration errors
export default function FinalCTA() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Section id="final-cta" className="bg-bg-secondary/30" aria-label="Контактная форма">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-[400px] sm:h-[450px] bg-bg-secondary/50 rounded-xl animate-pulse" aria-hidden="true" />
        </div>
      </Section>
    );
  }

  return <FinalCTAContent />;
}
