"use client"

import { useState, useEffect } from "react"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"
import ChatWidget from "@/components/ChatWidget"

export default function AdminPage() {
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    total: 0,
  })

  useEffect(() => {
    // Fetch stats from API
    fetch("/api/health")
      .then((res) => res.json())
      .then(() => {
        // In real app, fetch actual stats
        setStats({ today: 5, week: 23, total: 156 })
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="container-landing">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold tracking-tight mb-8">
              Админ-панель
            </h1>

            <div className="grid gap-6">
              {/* Stats Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl">
                  <div className="text-sm text-white/65 mb-1">Заявки сегодня</div>
                  <div className="text-3xl font-bold text-[#14b8a6]">{stats.today}</div>
                </div>
                <div className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl">
                  <div className="text-sm text-white/65 mb-1">Заявки за неделю</div>
                  <div className="text-3xl font-bold text-white">{stats.week}</div>
                </div>
                <div className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl">
                  <div className="text-sm text-white/65 mb-1">Всего заявок</div>
                  <div className="text-3xl font-bold text-white">{stats.total}</div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Быстрые ссылки</h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://t.me/ChatBot24su_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#14b8a6]/10 border border-[#14b8a6]/20 rounded-lg text-sm text-[#14b8a6] hover:bg-[#14b8a6]/20 transition-colors"
                  >
                    Открыть Telegram-бота
                  </a>
                  <a
                    href="/api/health"
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/65 hover:bg-white/10 transition-colors"
                  >
                    Проверить API
                  </a>
                  <a
                    href="/"
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/65 hover:bg-white/10 transition-colors"
                  >
                    На главную
                  </a>
                </div>
              </div>

              {/* System Status */}
              <div className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Статус системы</h2>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white/80">Все системы работают нормально</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
