"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { 
  MessageCircle, 
  Send, 
  Loader2, 
  X,
  Bot,
  User,
  FileText,
  Sparkles
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { calculateLeadScore, getLeadCategory } from "@/lib/scoring-simple";
import { analyzeSentiment } from "@/lib/sentiment-simple";
import { checkGuardrails } from "@/lib/guardrails-simple";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sentiment?: {
    label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
    score: number;
  };
}

interface LeadData {
  name: string;
  phone: string;
  email: string;
  budget: string;
  timeline: string;
}

// Quick action buttons
const QUICK_BUTTONS = [
  { label: "Сколько стоит?", action: "price" },
  { label: "Сроки разработки", action: "timeline" },
  { label: "Какие возможности?", action: "features" },
  { label: "Получить консультацию", action: "consultation" },
];

export default function ChatWidgetAdvanced() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({ 
    name: "", 
    phone: "", 
    email: "", 
    budget: "",
    timeline: "" 
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Привет! 👋 Я AI-ассистент ChatBot24.\n\nПомогаю автоматизировать обработку заявок. Задайте вопрос или расскажите о вашей задаче!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(`session_${Date.now()}`);

  // CRITICAL: Only render on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showForm, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !showForm && isClient) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, showForm, isClient]);

  // Track analytics
  useEffect(() => {
    if (isOpen && isClient) {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "chat_start",
          data: { sessionId: sessionId.current, timestamp: Date.now() },
        }),
      }).catch(console.error);
    }
  }, [isOpen, isClient]);

  const handleQuickAction = (action: string) => {
    let message = "";
    switch (action) {
      case "price":
        message = "Сколько стоит разработка чат-бота?";
        break;
      case "timeline":
        message = "Какие сроки разработки?";
        break;
      case "features":
        message = "Какие возможности у ваших ботов?";
        break;
      case "consultation":
        message = "Хочу получить консультацию";
        break;
      default:
        message = action;
    }
    handleSend(message);
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    // Guardrails check
    const guardrailsResult = checkGuardrails(messageText);
    if (!guardrailsResult.allowed) {
      setMessages(prev => [...prev, {
        id: `guardrail_${Date.now()}`,
        role: "assistant",
        content: guardrailsResult.message || "Извините, я не могу обсуждать эту тему. Давайте поговорим об автоматизации заявок?",
        timestamp: new Date(),
      }]);
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
    setTypingIndicator(true);

    try {
      // Analyze sentiment
      const sentiment = analyzeSentiment(messageText);
      
      // Track message
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "chat_message",
          data: { 
            sessionId: sessionId.current, 
            sentiment: sentiment.label,
            messageLength: messageText.length 
          },
        }),
      }).catch(console.error);

      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: messageText }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      const aiResponse = data.response || data.content || "Извините, произошла ошибка. Попробуйте ещё раз.";

      setTypingIndicator(false);
      
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
        sentiment,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check if we should show lead form
      const triggerWords = ["контакт", "телефон", "менеджер", "связаться", "передать", "консультация", "заявка"];
      const shouldShowForm = triggerWords.some(word => 
        aiResponse.toLowerCase().includes(word)
      );
      
      if (shouldShowForm && !leadSubmitted && messages.length > 3) {
        setTimeout(() => setShowForm(true), 1000);
      }

    } catch (err) {
      console.error("Chat error:", err);
      setTypingIndicator(false);
      setError("Ошибка соединения. Попробуйте снова.");
      setMessages(prev => [...prev, {
        id: `error_${Date.now()}`,
        role: "assistant",
        content: "Извините, произошла ошибка соединения. Пожалуйста, попробуйте ещё раз или свяжитесь с нами по телефону.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await handleSend();
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadData.name || !leadData.phone) return;

    setIsLoading(true);

    try {
      // Calculate lead score
      const score = calculateLeadScore({
        budget: leadData.budget,
        timeline: leadData.timeline,
      });
      const category = getLeadCategory(score);

      // Send to API
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadData,
          score,
          category,
          sessionId: sessionId.current,
          source: "chat_widget",
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      // Track conversion
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "lead_created",
          data: { 
            sessionId: sessionId.current, 
            score,
            category 
          },
        }),
      }).catch(console.error);

      setLeadSubmitted(true);
      setShowForm(false);
      
      setMessages(prev => [...prev, {
        id: `confirmation_${Date.now()}`,
        role: "assistant",
        content: `✅ Заявка принята!\n\nМенеджер свяжется с вами в течение рабочего дня.`,
        timestamp: new Date(),
      }]);

    } catch (err) {
      console.error("Lead submission error:", err);
      setError("Ошибка отправки. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent hydration mismatch - don't render until client-side
  if (!isClient) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center"
          aria-label="Открыть чат"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center group"
          aria-label="Открыть чат"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[420px] h-[600px] max-h-[80vh] bg-bg-primary rounded-2xl shadow-2xl border border-primary-500/20 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500/20 to-primary-400/10 p-4 border-b border-primary-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI-ассистент</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Онлайн
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
              aria-label="Закрыть чат"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user"
                      ? "bg-primary-500/20 text-primary-400"
                      : "bg-gradient-to-br from-primary-500 to-primary-400 text-white"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                    message.role === "user"
                      ? "bg-primary-500 text-white rounded-tr-sm"
                      : "bg-bg-secondary text-gray-200 rounded-tl-sm border border-primary-500/10"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {typingIndicator && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 border border-primary-500/10">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Lead Form */}
            {showForm && !leadSubmitted && (
              <div className="bg-bg-secondary rounded-2xl p-4 border border-primary-500/20">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary-400" />
                  Оставить заявку
                </h4>
                <form onSubmit={submitLead} className="space-y-3">
                  <Input
                    placeholder="Ваше имя"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Телефон"
                    type="tel"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Email (необязательно)"
                    type="email"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                  />
                  <select
                    value={leadData.budget}
                    onChange={(e) => setLeadData({ ...leadData, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary-500/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="">Бюджет (необязательно)</option>
                    <option value="до 50 000₽">до 50 000₽</option>
                    <option value="50 000₽ - 100 000₽">50 000₽ - 100 000₽</option>
                    <option value="100 000₽ - 250 000₽">100 000₽ - 250 000₽</option>
                    <option value="250 000₽+">250 000₽+</option>
                  </select>
                  <select
                    value={leadData.timeline}
                    onChange={(e) => setLeadData({ ...leadData, timeline: e.target.value })}
                    className="w-full px-4 py-3 bg-bg-secondary border border-primary-500/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="">Сроки (необязательно)</option>
                    <option value="Срочно">Срочно</option>
                    <option value="1 неделя">1 неделя</option>
                    <option value="1 месяц">1 месяц</option>
                    <option value="Не определено">Не определено</option>
                  </select>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowForm(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      isLoading={isLoading}
                      className="flex-1"
                    >
                      Отправить
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Buttons */}
          {!showForm && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_BUTTONS.map((btn) => (
                <button
                  key={btn.action}
                  onClick={() => handleQuickAction(btn.action)}
                  className="px-3 py-1.5 text-xs bg-bg-secondary hover:bg-primary-500/10 border border-primary-500/20 hover:border-primary-500/40 text-gray-300 hover:text-primary-400 rounded-full transition-colors"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {!showForm && (
            <form onSubmit={handleSubmit} className="p-4 border-t border-primary-500/20">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Напишите сообщение..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="sm"
                  className="px-3"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="px-4 py-2 bg-bg-secondary/50 border-t border-primary-500/10 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-primary-400" />
              AI-ассистент ChatBot24
            </p>
          </div>
        </div>
      )}
    </>
  );
}
