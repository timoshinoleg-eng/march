"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import { Calculator, TrendingDown, AlertTriangle, Wallet, BarChart3 } from "lucide-react";

// Стоимость тарифа Base для расчета окупаемости (обновлено 2026-04-03)
const BASE_PRICE = 39000;

export default function ROICalculator() {
  // Параметры для расчета потерь
  const [requestsPerDay, setRequestsPerDay] = useState(30);
  const [lossPercent, setLossPercent] = useState(20);
  const [avgCheck, setAvgCheck] = useState(50000);

  // Расчет потерь: заявки/день × 30 × (процент потерь / 100) × средний чек
  const monthlyLoss = useMemo(() => {
    return requestsPerDay * 30 * (lossPercent / 100) * avgCheck;
  }, [requestsPerDay, lossPercent, avgCheck]);

  // Окупаемость тарифа Base (BASE_PRICE / потери в месяц) - v3
  const paybackMonths = useMemo(() => {
    if (monthlyLoss === 0) return 0;
    return BASE_PRICE / monthlyLoss;
  }, [monthlyLoss]);

  // Потери в год
  const yearlyLoss = monthlyLoss * 12;

  return (
    <Section id="calculator" className="bg-bg-secondary/30">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary-400 font-medium mb-4 block"
        >
          Калькулятор потерь
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Сколько вы теряете
          <br />
          <span className="bg-gradient-emerald bg-clip-text text-transparent">
            на необработанных заявках?
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          Каждая необработанная заявка — это упущенная прибыль. 
          Рассчитайте свои потери за месяц и год.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-500/10">
                <Calculator className="w-5 h-5 text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Параметры</h3>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Заявок в день
                  </label>
                  <span className="text-white font-medium">{requestsPerDay}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={requestsPerDay}
                  onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5</span>
                  <span>250</span>
                  <span>500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Процент потерь (%)
                  </label>
                  <span className="text-white font-medium">{lossPercent}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={lossPercent}
                  onChange={(e) => setLossPercent(Number(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5%</span>
                  <span>27%</span>
                  <span>50%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Средний чек (₽)
                  </label>
                  <span className="text-white font-medium">
                    {avgCheck.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={avgCheck}
                  onChange={(e) => setAvgCheck(Number(e.target.value))}
                  className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 000</span>
                  <span>250 000</span>
                  <span>500 000</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-red-500/5 border border-red-500/10">
              <p className="text-sm text-gray-400">
                <span className="text-red-400 font-medium">Формула расчета:</span> заявки/день × 30 дней × процент потерь × средний чек
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="gradient" className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-red-500/20">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Ваши потери</h3>
            </div>

            <div className="space-y-6">
              <div className="text-center p-6 rounded-xl bg-bg-primary/50 border border-red-500/20">
                <div className="text-sm text-gray-400 mb-2">Потери в месяц</div>
                <div className="text-4xl sm:text-5xl font-bold text-red-400">
                  {Math.round(monthlyLoss).toLocaleString()} ₽
                </div>
              </div>

              <div className="text-center p-6 rounded-xl bg-bg-primary/50 border border-red-500/10">
                <div className="text-sm text-gray-400 mb-2">Потери в год</div>
                <div className="text-3xl sm:text-4xl font-bold text-red-400/80">
                  {Math.round(yearlyLoss).toLocaleString()} ₽
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-bg-primary/50">
                  {/* Tariff name - Base v3 */}
                  <div className="text-sm text-gray-400 mb-1">Тариф Base</div>
                  <div className="text-2xl font-bold text-primary-400">
                    {BASE_PRICE.toLocaleString()} ₽
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-bg-primary/50">
                  <div className="text-sm text-gray-400 mb-1">Окупаемость</div>
                  <div className="text-2xl font-bold text-primary-400">
                    {paybackMonths < 1 
                      ? `${(paybackMonths * 30).toFixed(0)} дней`
                      : `${paybackMonths.toFixed(1)} мес`
                    }
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <h4 className="font-medium text-white mb-2">Что это значит:</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 mt-1">•</span>
                    Каждый месяц вы теряете <span className="text-red-400 font-medium">{Math.round(monthlyLoss).toLocaleString()} ₽</span> из-за необработанных заявок
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 mt-1">•</span>
                    Внедрение чат-бота окупится за <span className="text-primary-400 font-medium">
                      {paybackMonths < 1 
                        ? `${(paybackMonths * 30).toFixed(0)} дней`
                        : `${paybackMonths.toFixed(1)} месяцев`
                      }
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400 mt-1">•</span>
                    Экономия за год составит <span className="text-primary-400 font-medium">{Math.round(yearlyLoss - BASE_PRICE).toLocaleString()} ₽</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
// Force rebuild Fri Apr  3 01:58:03 AM CST 2026
// Force rebuild 1775159415
// Clean build Fri Apr  3 03:54:06 AM CST 2026
// Cache cleared Fri Apr  3 04:11:40 AM CST 2026
