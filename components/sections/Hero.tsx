"use client"

import { Zap, Shield, Users, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  { icon: Zap, title: "Быстрый запуск", desc: "7–14 дней до старта" },
  { icon: Shield, title: "Гарантия качества", desc: "Доработки включены" },
  { icon: Users, title: "Инженерный подход", desc: "Не фриланс и не студия" },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#021c1b] via-[#021c1b] to-[#042f2e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(20,184,166,0.08)_0%,_transparent_50%)]" />
      
      <div className="container-landing relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/20 text-[#14b8a6] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
            Новые слоты на февраль 2025
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Инженерное бюро
            <br />
            <span className="bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] bg-clip-text text-transparent">
              автоматизации
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-white/90 mb-4">
            Автоматизация входящих заявок
            <br />
            <span className="text-[#14b8a6] font-bold">от 49 000 ₽</span>
          </p>

          {/* Description */}
          <p className="text-lg text-white/65 max-w-2xl mx-auto mb-10">
            Запускаем систему обработки обращений за 7–14 дней. 
            Подходит компаниям с 10+ заявками в день.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="https://t.me/ChatBot24su_bot?start=landing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 bg-[#14b8a6] hover:bg-[#2dd4bf] text-white px-8 py-6 text-base">
                <Send className="w-5 h-5" />
                Обсудить проект
              </Button>
            </a>
            <a href="#pricing">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-base">
                Смотреть тарифы
              </Button>
            </a>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center mb-3">
                  <benefit.icon className="w-6 h-6 text-[#14b8a6]" />
                </div>
                <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-sm text-white/50">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
