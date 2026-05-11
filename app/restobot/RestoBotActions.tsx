"use client";

import { ArrowRight, Send } from "lucide-react";

import { trackGoal, trackTelegramClick } from "@/lib/metrika";

interface RestoBotActionsProps {
  source: string;
  className?: string;
  compact?: boolean;
}

const telegramHref = "https://t.me/chatbot24su";

export default function RestoBotActions({
  source,
  className = "",
  compact = false,
}: RestoBotActionsProps) {
  const scrollToRequest = () => {
    trackGoal("restobot_brief_click", { source });
    trackGoal("restobot_request_cta_click", { source });
    document.getElementById("restobot-request")?.scrollIntoView({ behavior: "smooth" });
  };

  const trackTelegram = () => {
    trackTelegramClick(source);
    trackGoal("restobot_telegram_click", { source });
    if (source === "restobot_offer") {
      trackGoal("restobot_offer_click", { source });
    }
  };

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={telegramHref}
        target="_blank"
        rel="noreferrer"
        onClick={trackTelegram}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-emerald px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25"
      >
        <Send className="h-5 w-5" aria-hidden="true" />
        Написать в Telegram
      </a>
      {!compact ? (
        <button
          type="button"
          onClick={scrollToRequest}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-500/40 bg-bg-secondary px-6 py-3 font-semibold text-primary-300 transition-colors hover:border-primary-400 hover:bg-primary-500/10"
        >
          Обсудить пилот
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
