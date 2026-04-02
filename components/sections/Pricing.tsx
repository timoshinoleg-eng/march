"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { Star } from "lucide-react";
import { pricingPlans, bridgeText, PricingPlan } from "@/data/pricing";
import Link from "next/link";

interface PricingPlanWithSocial extends PricingPlan {
  socialProof: number;
}

const plansWithSocial: PricingPlanWithSocial[] = pricingPlans.map((plan, index) => ({
  ...plan,
  socialProof: [9, 11, 14, 3][index] // Lite: 9, Base: 11, AI-Assist: 14, Enterprise: 3
}));

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
          Выберите подходящий
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            уровень автоматизации
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          От базового бота до полноценной AI-системы. Масштабируйтесь по мере
          роста вашего бизнеса.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
        {plansWithSocial.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={plan.highlight ? "md:-mt-4 md:mb-4" : ""}
          >
            <Card
              variant={plan.highlight ? "gradient" : "default"}
              className={`h-full flex flex-col ${
                plan.highlight ? "border-primary-500/50 relative" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-emerald text-white text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    Рекомендуем
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
                    {plan.showFrom ? "от " : ""}{plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400">₽</span>
                </div>
                <p className="text-sm text-primary-400 mt-2 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {plan.socialProof} клиентов выбрали в апреле
                </p>
                <p className="text-xs text-gray-500 mt-1">{plan.timeline}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/calculator?utm_source=site&utm_medium=pricing_card&utm_content=${plan.utmContent}`}
                className="block w-full"
              >
                <Button
                  variant={plan.highlight ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.buttonText || "Рассчитать точнее"}
                </Button>
              </Link>
            </Card>
            
            {/* Bridge text after Base card */}
            {plan.id === "base" && (
              <p className="text-xs text-gray-500 mt-3 text-center italic">
                {bridgeText}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12 text-gray-400 text-sm"
      >
        Все тарифы включают настройку под ваш бизнес и обучение работе с системой.
        <br />
        Поддержка и доработки включены в стоимость первого месяца.
      </motion.div>
    </Section>
  );
}
