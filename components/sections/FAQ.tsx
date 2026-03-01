"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Сколько времени занимает запуск системы?",
    answer:
      "Стандартный запуск занимает 7–14 дней. Срок зависит от сложности интеграций и количества каналов коммуникации. MVP-бот запускаем за 5–7 дней, полноценную Sales-систему — за 10–14 дней.",
  },
  {
    question: "Какие мессенджеры и каналы можно подключить?",
    answer:
      "Поддерживаем все популярные каналы: Telegram, WhatsApp, Instagram Direct, Facebook Messenger, ВКонтакте, а также виджеты на сайт и email. Можно подключить несколько каналов одновременно с единой базой клиентов.",
  },
  {
    question: "Будет ли работать интеграция с нашей CRM?",
    answer:
      "Да, интегрируемся с любыми CRM: Bitrix24, amoCRM, МойСклад, retailCRM и другими. Также делаем интеграции по API с кастомными системами. Все данные о клиентах и заявках автоматически попадают в вашу CRM.",
  },
  {
    question: "Что если бот не справится со сложным вопросом?",
    answer:
      "Бот автоматически распознает сложные ситуации и переключает диалог на оператора. Вы сами настраиваете критерии эскалации: по ключевым словам, тональности или по запросу клиента. Ни одна заявка не потеряется.",
  },
  {
    question: "Какая гарантия на работу системы?",
    answer:
      "Даем гарантию 12 месяцев на все разработанное ПО. Включаем 1 месяц бесплатной поддержки после запуска. Прописываем KPI в договоре: время ответа, процент обработанных заявок. Не достигаем показателей — дорабатываем за свой счет.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq">
      <div className="text-center mb-16">
        <span className="text-primary-400 font-medium mb-4 block">
          FAQ
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Ответы на
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            частые вопросы
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Всё, что нужно знать перед запуском системы автоматизации
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl bg-bg-secondary border border-primary-500/10 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-tertiary/30 transition-colors"
            >
              <span className="text-white font-medium pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-primary-400 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
