"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { Star, Shield, Zap, Flame, Trophy, Diamond } from "lucide-react";
import { pricingPlans, bridgeText, PricingPlan } from "@/data/pricing";
import Link from "next/link";

interface PricingPlanWithSocial extends PricingPlan {
  socialProof: number;
}

const plansWithSocial: PricingPlanWithSocial[] = pricingPlans.map((plan, index) => ({
  ...plan,
  socialProof: [9, 11, 14, 3][index] // Lite: 9, Base: 11, AI-Assist: 14, Enterprise: 3
}));

// Варианты оплаты только для AI-Assist
const aiAssistPaymentOptions = [
  { icon: Zap, label: "14 333 ₽/мес", sublabel: "(помесячно)", highlight: false },
  { icon: Flame, label: "12 900 ₽/мес", sublabel: "(квартал, -10%)", highlight: false },
  { icon: Trophy, label: "10 750 ₽/мес", sublabel: "(год, -25%)", highlight: true },
  { icon: Diamond, label: "9 675 ₽/мес", sublabel: "(2 года, -32.5%)", highlight: false },
];

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

              {/* Варианты оплаты — только для AI-Assist */}
              {plan.id === "ai-assist" && (
                <div className="mb-4 p-3 rounded-lg bg-bg-primary/50 border border-primary-500/10">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Варианты оплаты:</p>
                  <div className="space-y-2">
                    {aiAssistPaymentOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-sm ${
                          opt.highlight
                            ? "text-primary-300 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        <opt.icon className={`w-3.5 h-3.5 flex-shrink-0 ${opt.highlight ? "text-primary-400" : "text-gray-500"}`} />
                        <span>{opt.label}</span>
                        <span className="text-gray-500 text-xs">{opt.sublabel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Гарантия окупаемости — только для AI-Assist */}
              {plan.id === "ai-assist" && (
                <div className="mb-4 p-3 rounded-lg bg-primary-500/5 border border-primary-500/20">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-white font-medium">Гарантия окупаемости 90 дней</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Если бот не окупится за 3 месяца — вернём деньги по договору
                      </p>
                    </div>
                  </div>
                </div>
              )}

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
