"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Logo from "@/components/Logo";
import { openChatWidget } from "@/lib/chat";
import { ArrowRight, Clock, CheckCircle, Building2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Background Effects - оптимизированные для производительности */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl will-change-transform" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl will-change-transform" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#021c1b_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6 sm:mb-8"
          >
            <Logo size="sm" />
            <span className="text-xs sm:text-sm text-primary-300">
              Инженерное бюро автоматизации
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
          >
            <span className="text-white">Автоматизация входящих заявок</span>
            <br />
            <span className="bg-gradient-emerald bg-clip-text text-transparent">
              от 49 000 ₽
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
          >
            Запускаем систему обработки обращений за 7–14 дней. 
            Подходит компаниям с 10+ заявками в день.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4"
          >
            <Button 
              size="lg" 
              className="group w-full sm:w-auto"
              onClick={() => openChatWidget('brief')}
            >
              Получить консультацию
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="#calculator" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Рассчитать потери
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4"
          >
            {[
              {
                icon: Clock,
                title: "Быстрый запуск",
                desc: "7–14 дней до старта",
              },
              {
                icon: CheckCircle,
                title: "Гарантия качества",
                desc: "Доработки включены",
              },
              {
                icon: Building2,
                title: "Инженерный подход",
                desc: "Не фриланс и не студия",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-bg-secondary/50 border border-primary-500/10"
              >
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-400 mb-2 sm:mb-3" />
                <h3 className="font-semibold text-white text-sm sm:text-base mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-primary-500/30 flex justify-center pt-1.5 sm:pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
