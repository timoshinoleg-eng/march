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

export default function FinalCTA() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    dailyLeads: "",
    crmType: "",
  });
  
  const [utmData, setUtmData] = useState({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Сбор UTM-меток из URL
  useEffect(() => {
    setUtmData({
      utmSource: searchParams.get("utm_source") || "",
      utmMedium: searchParams.get("utm_medium") || "",
      utmCampaign: searchParams.get("utm_campaign") || "",
      utmContent: searchParams.get("utm_content") || "",
      utmTerm: searchParams.get("utm_term") || "",
    });
  }, [searchParams]);

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

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...utmData,
        }),
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="gradient" className="relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                  <Calculator className="w-4 h-4 text-primary-400" />
                  <span className="text-sm text-primary-300">
                    Бесплатный расчет
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Готовы перестать
                  <br />
                  <span className="bg-gradient-emerald bg-clip-text text-transparent">
                    терять заявки?
                  </span>
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                  Оставьте контакты — мы рассчитаем, сколько заявок и денег
                  вы теряете сейчас, и подготовим персональное предложение
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Заявка отправлена!
                  </h3>
                  <p className="text-gray-400">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше имя *"
                      required
                    />
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Компания *"
                      required
                    />
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (___) ___-__-__ *"
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    
                    {/* Select для dailyLeads */}
                    <div className="relative">
                      <select
                        name="dailyLeads"
                        value={formData.dailyLeads}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-secondary border border-primary-500/20 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {dailyLeadsOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-bg-secondary">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Select для crmType */}
                    <div className="relative">
                      <select
                        name="crmType"
                        value={formData.crmType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-secondary border border-primary-500/20 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        {crmTypeOptions.map((option) => (
                          <option key={option.value} value={option.value} className="bg-bg-secondary">
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  >
                    Получить расчет
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-primary-400" />
                  <span>Ответ в течение 2 часов</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-primary-400" />
                  <span>Бесплатный аудит</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-primary-400" />
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
