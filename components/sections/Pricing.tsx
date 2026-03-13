"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { openChatWidget } from "@/lib/chat";
import { Check, Star } from "lucide-react";
import { pricingPlans } from "@/data/pricing";

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
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

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400">₽</span>
                </div>
                {plan.requestsPerDay && (
                  <p className="text-sm text-primary-400 mt-1">
                    {plan.requestsPerDay}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div
                      className={`p-0.5 rounded-full ${
                        plan.highlight ? "bg-primary-500/20" : "bg-primary-500/10"
                      }`}
                    >
                      <Check className="w-4 h-4 text-primary-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlight ? "primary" : "outline"}
                className="w-full"
                onClick={() => openChatWidget('brief')}
              >
                Выбрать
              </Button>
            </Card>
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
