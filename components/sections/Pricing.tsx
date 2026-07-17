"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { Star } from "lucide-react";
import Link from "next/link";
import {
  PRICING_PLANS,
  CUSTOM_INTEGRATIONS,
  formatPrice,
} from "@/data/catalog";

export default function Pricing() {
  return (
    <Section id="pricing" className="bg-bg-secondary/30">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-400 font-medium mb-4 block"
        >
          Тарифы
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Стоимость под
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            задачу и бюджет
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Пять уровней — от базового бота до комплекта «лендинг + бот + CRM».
          Сложные интеграции оцениваются отдельно по ТЗ.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
        {PRICING_PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={plan.highlight ? "md:-mt-4 md:mb-4" : ""}
          >
            <Card
              variant={plan.highlight ? "gradient" : "default"}
              className={`h-full flex flex-col relative ${
                plan.highlight ? "border-primary-500/50" : ""
              } ${plan.isPromo ? "border-dashed border-primary-500/40" : ""}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-emerald text-white text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    Часто выбирают
                  </div>
                </div>
              )}

              {plan.isPromo && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs font-medium border border-primary-500/30">
                    Акция
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(plan.price, { showFrom: plan.showFrom, withSymbol: false })}
                  </span>
                  <span className="text-gray-400">₽</span>
                </div>
                {plan.condition && (
                  <p className="text-xs text-primary-400 mt-2 italic">
                    {plan.condition}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">{plan.timeline}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/#final-cta?utm_source=site&utm_medium=pricing_card&utm_content=${plan.utmContent}`}
                className="block w-full"
              >
                <Button
                  variant={plan.highlight ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </Card>

            {plan.bridgeText && (
              <p className="text-xs text-gray-500 mt-3 text-center italic">
                {plan.bridgeText}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Блок сложных интеграций — оцениваются отдельно */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 max-w-4xl mx-auto"
      >
        <Card variant="default" className="border border-primary-500/20">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              Сложные интеграции — оценка по ТЗ
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Стоимость рассчитывается индивидуально после короткого брифа.
            </p>
            <div className="flex flex-wrap gap-2">
              {CUSTOM_INTEGRATIONS.map((integration) => (
                <span
                  key={integration.id}
                  className="px-3 py-1.5 rounded-lg bg-bg-secondary/50 border border-primary-500/10 text-gray-300 text-xs"
                >
                  {integration.name}
                </span>
              ))}
            </div>
            <Link
              href="/#final-cta?utm_source=site&utm_medium=pricing_integrations"
              className="inline-block mt-5"
            >
              <Button variant="outline" size="sm">
                Обсудить интеграцию →
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12 text-gray-400 text-sm"
      >
        Все тарифы включают настройку под ваш бизнес и обучение работе с ботом.
        <br />
        Доработки в рамках первого месяца включены в стоимость.
      </motion.div>
    </Section>
  );
}
