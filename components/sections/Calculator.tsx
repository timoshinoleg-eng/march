"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { trackGoal } from "@/lib/metrika";
import {
  Calculator as CalculatorIcon,
  TrendingUp,
  Building2,
  Wrench,
  CalendarDays,
  PhoneMissed,
  Receipt,
  Percent,
  Clock,
} from "lucide-react";

// Стоимость тарифа Base для расчета окупаемости
const BASE_PRICE = 39000;

type Industry = "dental" | "repair";

interface CalculatorFields {
  leadsPerDay: number;
  workDays: number;
  lossRate: number;
  avgCheck: number;
  conversion: number;
}

const DEFAULT_FIELDS: Record<Industry, CalculatorFields> = {
  dental: {
    leadsPerDay: 10,
    workDays: 30,
    lossRate: 35,
    avgCheck: 4500,
    conversion: 22,
  },
  repair: {
    leadsPerDay: 20,
    workDays: 30,
    lossRate: 50,
    avgCheck: 120000,
    conversion: 8,
  },
};

const INDUSTRY_CONFIG: Record<
  Industry,
  { label: string; icon: typeof Building2; lossLabel: string; conversionLabel: string }
> = {
  dental: {
    label: "Стоматология",
    icon: Building2,
    lossLabel: "Потери в нерабочее время (%)",
    conversionLabel: "Конверсия в запись (%)",
  },
  repair: {
    label: "Ремонт квартир",
    icon: Wrench,
    lossLabel: "Потери на первом контакте (%)",
    conversionLabel: "Конверсия в договор (%)",
  },
};

function formatMoney(value: number): string {
  return Math.round(value).toLocaleString("ru-RU");
}

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<Industry>("dental");
  const [fields, setFields] = useState<CalculatorFields>(
    DEFAULT_FIELDS["dental"]
  );
  const [result, setResult] = useState<{
    monthlyRevenue: number;
    paybackDays: number;
  } | null>(null);

  const handleTabChange = (industry: Industry) => {
    setActiveTab(industry);
    setFields(DEFAULT_FIELDS[industry]);
    setResult(null);
  };

  const handleFieldChange = (
    field: keyof CalculatorFields,
    value: string
  ) => {
    const numValue = value === "" ? 0 : Number(value);
    if (numValue < 0) return;
    setFields((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    trackGoal("calculator_use", { industry: activeTab });

    const monthlyRevenue =
      fields.leadsPerDay *
      fields.workDays *
      (fields.lossRate / 100) *
      fields.avgCheck *
      (fields.conversion / 100);

    const paybackDays =
      monthlyRevenue > 0 ? BASE_PRICE / (monthlyRevenue / fields.workDays) : 0;

    setResult({ monthlyRevenue, paybackDays });
  };

  const config = INDUSTRY_CONFIG[activeTab];
  const IconComponent = config.icon;

  const inputBaseClass =
    "w-full bg-bg-primary border border-primary-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <Section id="calculator" className="bg-bg-secondary/30">
      {/* Заголовок секции */}
      <div className="text-center mb-12 md:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-400 font-medium mb-4 block"
        >
          Калькулятор окупаемости
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Посчитайте вашу экономию с ChatBot24{" "}
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            за 1 минуту
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Выберите вашу отрасль и укажите параметры — рассчитаем, сколько денег
          вы теряете на необработанных заявках
        </motion.p>
      </div>

      {/* Табы */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex gap-3 mb-8 justify-center overflow-x-auto pb-2"
      >
        {(Object.entries(INDUSTRY_CONFIG) as [Industry, typeof config][]).map(
          ([key, cfg]) => {
            const TabIcon = cfg.icon;
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === key
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "bg-bg-secondary text-gray-400 border border-primary-500/20 hover:border-primary-500/40 hover:text-white"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {cfg.label}
              </button>
            );
          }
        )}
      </motion.div>

      {/* Контент */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Левая колонка — поля ввода */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-500/10">
                <CalculatorIcon className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Параметры</h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Заявок в день */}
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    Заявок в день
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={fields.leadsPerDay || ""}
                    onChange={(e) =>
                      handleFieldChange("leadsPerDay", e.target.value)
                    }
                    className={inputBaseClass}
                  />
                </div>

                {/* Дней в месяце */}
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                    <CalendarDays className="w-4 h-4" />
                    Дней в месяце
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={fields.workDays || ""}
                    disabled
                    readOnly
                    className={`${inputBaseClass} opacity-60 cursor-not-allowed bg-bg-secondary`}
                  />
                </div>

                {/* Потери (%) */}
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                    <PhoneMissed className="w-4 h-4" />
                    {config.lossLabel}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={fields.lossRate || ""}
                    onChange={(e) =>
                      handleFieldChange("lossRate", e.target.value)
                    }
                    className={inputBaseClass}
                  />
                </div>

                {/* Средний чек */}
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                    <Receipt className="w-4 h-4" />
                    Средний чек (₽)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={fields.avgCheck || ""}
                    onChange={(e) =>
                      handleFieldChange("avgCheck", e.target.value)
                    }
                    className={inputBaseClass}
                  />
                </div>

                {/* Конверсия */}
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                    <Percent className="w-4 h-4" />
                    {config.conversionLabel}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={fields.conversion || ""}
                    onChange={(e) =>
                      handleFieldChange("conversion", e.target.value)
                    }
                    className={inputBaseClass}
                  />
                </div>

                {/* Кнопка расчёта */}
                <Button
                  onClick={handleCalculate}
                  size="lg"
                  className="w-full mt-2"
                >
                  <CalculatorIcon className="w-5 h-5 mr-2" />
                  Рассчитать
                </Button>
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Правая колонка — результат */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="gradient" className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-500/20">
                <TrendingUp className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Результат</h3>
            </div>

            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Основное число */}
                  <div className="text-center p-6 rounded-xl bg-bg-primary/50 border border-primary-500/20">
                    <div className="text-sm text-gray-400 mb-2">
                      Дополнительная выручка с ChatBot24
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold text-primary-400">
                      ≈ {formatMoney(result.monthlyRevenue)} ₽/мес
                    </div>
                  </div>

                  {/* Срок окупаемости */}
                  <div className="text-center p-6 rounded-xl bg-bg-primary/50 border border-primary-500/10">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
                      <Clock className="w-4 h-4" />
                      Срок окупаемости тарифа Base
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-white">
                      {result.paybackDays < 1
                        ? "< 1 дня"
                        : `${Math.ceil(result.paybackDays)} ${
                            getDayLabel(Math.ceil(result.paybackDays))
                          }`}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      при стоимости {BASE_PRICE.toLocaleString("ru-RU")} ₽/мес
                    </div>
                  </div>

                  {/* Формула */}
                  <div className="p-4 rounded-lg bg-primary-500/5 border border-primary-500/10">
                    <p className="text-sm text-gray-400">
                      <span className="text-primary-400 font-medium">
                        Формула расчета:
                      </span>{" "}
                      {fields.leadsPerDay} заявок/день × {fields.workDays} дней
                      × {fields.lossRate}% потерь ×{" "}
                      {fields.avgCheck.toLocaleString("ru-RU")} ₽ ×{" "}
                      {fields.conversion}% конверсия
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[300px] text-center"
                >
                  <div className="p-4 rounded-full bg-primary-500/10 mb-4">
                    <CalculatorIcon className="w-10 h-10 text-primary-400/50" />
                  </div>
                  <p className="text-gray-500 max-w-xs">
                    Введите параметры вашего бизнеса и нажмите «Рассчитать»,
                    чтобы увидеть результат
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

function getDayLabel(days: number): string {
  const lastTwo = days % 100;
  const lastOne = days % 10;
  if (lastTwo >= 11 && lastTwo <= 19) return "дней";
  if (lastOne === 1) return "день";
  if (lastOne >= 2 && lastOne <= 4) return "дня";
  return "дней";
}
