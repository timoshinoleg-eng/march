"use client";

import { useState, useEffect } from "react";

interface Stats {
  sessions: {
    total_sessions: number;
    with_contacts: number;
    anonymous: number;
  };
  messages: {
    total_messages: number;
    user_messages: number;
    bot_messages: number;
  };
  briefs: {
    total_briefs: number;
    hot_leads: number;
    warm_leads: number;
    cold_leads: number;
  };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (secret: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats?days=7", {
        headers: { "x-admin-secret": secret },
      });

      if (res.status === 401) {
        setError("Неверный пароль");
        setAuthenticated(false);
        return;
      }

      const data = await res.json();
      setStats(data);
      setAuthenticated(true);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(password);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-bg-secondary p-8 rounded-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">🔐 Админ-панель</h1>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-bg-primary border border-white/10 rounded-xl mb-4"
          />
          {error && <p className="text-red-400 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-500 rounded-xl font-medium"
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📊 Статистика за 7 дней</h1>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Сессии */}
            <div className="bg-bg-secondary p-6 rounded-2xl">
              <h2 className="text-lg font-medium mb-4 text-gray-400">💬 Сессии</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Всего:</span>
                  <span className="font-bold">{stats.sessions.total_sessions}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span>С контактами:</span>
                  <span>{stats.sessions.with_contacts}</span>
                </div>
                <div className="flex justify-between text-yellow-400">
                  <span>Анонимные:</span>
                  <span>{stats.sessions.anonymous}</span>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            <div className="bg-bg-secondary p-6 rounded-2xl">
              <h2 className="text-lg font-medium mb-4 text-gray-400">📝 Сообщения</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Всего:</span>
                  <span className="font-bold">{stats.messages.total_messages}</span>
                </div>
                <div className="flex justify-between">
                  <span>От клиентов:</span>
                  <span>{stats.messages.user_messages}</span>
                </div>
                <div className="flex justify-between">
                  <span>От бота:</span>
                  <span>{stats.messages.bot_messages}</span>
                </div>
              </div>
            </div>

            {/* Брифы */}
            <div className="bg-bg-secondary p-6 rounded-2xl">
              <h2 className="text-lg font-medium mb-4 text-gray-400">📋 Брифы</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Всего:</span>
                  <span className="font-bold">{stats.briefs.total_briefs}</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>🔥 HOT:</span>
                  <span>{stats.briefs.hot_leads}</span>
                </div>
                <div className="flex justify-between text-yellow-400">
                  <span>⚡ WARM:</span>
                  <span>{stats.briefs.warm_leads}</span>
                </div>
                <div className="flex justify-between text-blue-400">
                  <span>❄️ COLD:</span>
                  <span>{stats.briefs.cold_leads}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p>💡 Данные обновляются в реальном времени</p>
          <p>📱 Telegram-уведомления приходят на каждое сообщение и бриф</p>
        </div>
      </div>
    </div>
  );
}
