"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { trackGoal } from "@/lib/metrika";
import { 
  Clock, 
  Zap,
  CheckCircle,
  ArrowRight,
  Bot,
  BarChart3,
  Users,
  Shield
} from "lucide-react";
import { openChatWidget } from "@/lib/chat";
import Link from "next/link";

export default function AIAutomationLanding() {
  const handleCTAClick = () => {
    trackGoal("landing_ai_automation_click");
    openChatWidget("brief");
  };

  const painPoints = [
    {
      icon: Clock,
      title: "Заявки теряются",
      description: "Клиенты пишут в нерабочее время, а менеджеры отвечают с опозданием"
    },
    {
      icon: Users,
      title: "Ручная обработка",
      description: "Менеджеры тратят 70% времени на рутину вместо продаж"
    },
    {
      icon: BarChart3,
      title: "Нет аналитики",
      description: "Не понятно, сколько заявок обработано и где теряются клиенты"
    }
  ];

  const solutions = [
    {
      icon: Bot,
      title: "ИИ-ассистент 24/7",
      description: "Отвечает на вопросы, квалифицирует заявки, передаёт готовых клиентов"
    },
    {
      icon: Zap,
      title: "Интеграция с CRM",
      description: "Автоматически создаёт сделки, обновляет статусы, отправляет уведомления"
    },
    {
      icon: Shield,
      title: "Контроль качества",
      description: "Каждый диалог записан, анализируется, ничего не потеряется"
    }
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full mb-8"
            >
              <Zap className="w-4 h-4 text-accent-primary" />
              <span className="text-sm text-accent-primary font-medium">
                Запуск за 7 дней • Без предоплаты
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              Автоматизация заявок
              <span className="text-gradient block mt-2">с помощью ИИ</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
            >
              Чат-бот отвечает на заявки 24/7, экономит 20+ часов в неделю 
              и передаёт готовых клиентов менеджерам
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                size="lg" 
                className="group"
                onClick={handleCTAClick}
              >
                Бесплатный аудит системы
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/checklist-gotovnosti-chatbot24.pdf" target="_blank">
                <Button variant="outline" size="lg">
                  Скачать чек-лист
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Внедрение за 7 дней
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Оплата по результату
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Поддержка 24/7
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Проблемы, с которыми сталкиваются 90% компаний
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Каждая упущенная заявка — это потерянная выручка
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-bg-primary rounded-xl border border-border-primary hover:border-accent-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {point.title}
                </h3>
                <p className="text-text-secondary">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Как это работает
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              ИИ берёт рутину на себя — менеджеры занимаются продажами
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-bg-secondary rounded-xl border border-border-primary hover:border-accent-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-accent-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <solution.icon className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {solution.title}
                </h3>
                <p className="text-text-secondary">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-bg-primary rounded-2xl p-8 sm:p-12 border border-border-primary"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                PwC
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary">PwC</h3>
                <p className="text-text-muted">Консалтинговая компания</p>
              </div>
            </div>

            <blockquote className="text-lg text-text-secondary mb-6 italic">
              "Внедрение чат-бота для обработки HR-запросов увеличило конверсию 
              обращений в заявки на 56% и сократило время ответа с 4 часов до мгновенного"
            </blockquote>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-primary mb-1">+56%</div>
                <div className="text-sm text-text-muted">Конверсия</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-primary mb-1">4ч → 0с</div>
                <div className="text-sm text-text-muted">Время ответа</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-primary mb-1">24/7</div>
                <div className="text-sm text-text-muted">Доступность</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Готовы автоматизировать обработку заявок?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Получите бесплатный аудит системы. Покажем, сколько заявок 
              вы теряете и как это исправить.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="group"
                onClick={handleCTAClick}
              >
                Получить бесплатный аудит
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-text-muted">
              Аудит займёт 30 минут. Никаких обязательств.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
