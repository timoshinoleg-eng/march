"use client";

import { useState } from "react";

interface GuideDownloadFormProps {
  title?: string;
  description?: string;
}

export default function GuideDownloadForm({
  title = "Получить гайд",
  description = "PDF, 1 страница. Проверьте готовность команды к ИИ.",
}: GuideDownloadFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отправляем данные в Telegram
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "guide_download",
          email,
          telegram,
          guide_name: "ai_readiness_checklist",
        }),
      });
    } catch (error) {
      console.error("Failed to send lead:", error);
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-6 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
        <p className="text-emerald-400 font-medium mb-2">✅ Гайд отправлен!</p>
        <p className="text-sm text-gray-400">
          Проверьте email или Telegram в течение 5 минут
        </p>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
        >
          {title}
        </button>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
      <h4 className="text-white font-semibold mb-4">Куда прислать гайд?</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            required={!telegram}
          />
        </div>

        <div className="text-center text-gray-500 text-sm">или</div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Telegram</label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="@username"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            required={!email}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
        >
          Получить гайд
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="w-full py-2 text-gray-400 hover:text-gray-300 text-sm"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
