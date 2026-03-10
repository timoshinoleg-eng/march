"use client"

import { useState, useEffect } from "react"
import { CalculatorIcon, TrendingDown, Calendar, Wallet } from "lucide-react"

export default function Calculator() {
  const [leadsPerDay, setLeadsPerDay] = useState(30)
  const [lossPercent, setLossPercent] = useState(20)
  const [avgCheck, setAvgCheck] = useState(50000)

  const [monthlyLoss, setMonthlyLoss] = useState(0)
  const [yearlyLoss, setYearlyLoss] = useState(0)
  const [paybackDays, setPaybackDays] = useState(0)

  useEffect(() => {
    const dailyLoss = leadsPerDay * (lossPercent / 100)
    const monthly = dailyLoss * 30 * avgCheck
    const yearly = monthly * 12
    const payback = Math.ceil(49000 / (dailyLoss * avgCheck))

    setMonthlyLoss(monthly)
    setYearlyLoss(yearly)
    setPaybackDays(payback > 365 ? 30 : payback)
  }, [leadsPerDay, lossPercent, avgCheck])

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="section-landing">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Сколько вы теряете на{" "}
            <span className="bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] bg-clip-text text-transparent">
              необработанных заявках?
            </span>
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Рассчитайте реальные потери вашего бизнеса
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Inputs */}
          <div className="p-8 bg-white/[0.03] border border-white/[0.1] rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <CalculatorIcon className="w-5 h-5 text-[#14b8a6]" />
              Ваши данные
            </h3>

            <div className="space-y-8">
              {/* Leads per day */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white/80">Заявок в день</label>
                  <span className="text-[#14b8a6] font-semibold">{leadsPerDay}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={leadsPerDay}
                  onChange={(e) => setLeadsPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#14b8a6]"
                />
                <div className="flex justify-between text-xs text-white/40 mt-2">
                  <span>5</span>
                  <span>200+</span>
                </div>
              </div>

              {/* Loss percent */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white/80">Процент потерь</label>
                  <span className="text-[#14b8a6] font-semibold">{lossPercent}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={lossPercent}
                  onChange={(e) => setLossPercent(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#14b8a6]"
                />
                <div className="flex justify-between text-xs text-white/40 mt-2">
                  <span>5%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Average check */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-white/80">Средний чек</label>
                  <span className="text-[#14b8a6] font-semibold">{formatMoney(avgCheck)}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={avgCheck}
                  onChange={(e) => setAvgCheck(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#14b8a6]"
                />
                <div className="flex justify-between text-xs text-white/40 mt-2">
                  <span>10к</span>
                  <span>500к</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-8 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-[#14b8a6]" />
              Ваши потери
            </h3>

            <div className="space-y-6">
              <div className="p-4 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Потери в месяц</span>
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {formatMoney(monthlyLoss)}
                </div>
              </div>

              <div className="p-4 bg-white/[0.03] rounded-xl">
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm">Потери в год</span>
                </div>
                <div className="text-3xl font-extrabold text-[#14b8a6]">
                  {formatMoney(yearlyLoss)}
                </div>
              </div>

              <div className="p-4 bg-[#14b8a6]/20 rounded-xl border border-[#14b8a6]/30">
                <div className="text-sm text-[#14b8a6] mb-1">Окупаемость системы</div>
                <div className="text-2xl font-bold text-white">
                  {paybackDays <= 30 ? "< 1 месяца" : `${paybackDays} дней`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
