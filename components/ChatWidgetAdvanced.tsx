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
  Sparkles,
  CheckCircle
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

interface BriefData {
  businessType?: string;
  channels?: string[];
  dailyRequests?: string;
  botTasks?: string[];
  hasExamples?: string;
  budget?: string;
  name?: string;
  phone?: string;
  email?: string;
}

// Quick action buttons for initial chat
const QUICK_BUTTONS = [
  { label: "Сколько стоит?", action: "price" },
  { label: "Сроки разработки", action: "timeline" },
  { label: "Какие возможности?", action: "features" },
  { label: "Заполнить бриф", action: "brief" },
];

// Brief steps configuration
const BRIEF_STEPS = [
  {
    id: "businessType",
    question: "Какая у вас сфера бизнеса?",
    options: ["Магазин/ритейл", "Услуги", "Образование", "Медицина", "Недвижимость", "Другое"],
    multiple: false,
  },
  {
    id: "channels",
    question: "Где приходят заявки? (можно несколько)",
    options: ["Telegram", "WhatsApp", "Instagram", "Сайт", "Звонки"],
    multiple: true,
  },
  {
    id: "dailyRequests",
    question: "Сколько заявок в день обрабатываете?",
    options: ["До 10", "10-50", "50-100", "100+"],
    multiple: false,
  },
  {
    id: "botTasks",
    question: "Что должен делать бот? (можно несколько)",
    options: ["Отвечать на вопросы", "Записывать клиентов", "Считать стоимость", "Подключить к CRM", "Собирать отзывы"],
    multiple: true,
  },
  {
    id: "hasExamples",
    question: "Есть примеры ботов для вдохновения?",
    options: ["Да, пришлю ссылку", "Нет", "Есть свои идеи"],
    multiple: false,
  },
  {
    id: "budget",
    question: "Какой бюджет планируете?",
    options: ["До 50 000₽", "50-100к", "100-200к", "200к+", "Обсудить с менеджером"],
    multiple: false,
  },
];

// Get response message based on current time
function getTimeBasedResponse(): string {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = day === 0 || day === 6;
  
  if (isWeekend || hour >= 18) {
    return "Отлично! Бриф заполнен. Ваша заявка в приоритете — менеджер свяжется с вами в первый рабочий день утром.";
  } else if (hour < 14) {
    return "Отлично! Бриф заполнен. Менеджер уже получил заявку и готовит для вас предложение — отправим в ближайшие часы.";
  } else {
    return "Отлично! Бриф заполнен. Менеджер получил заявку и свяжется с вами сегодня. Если не успеем до вечера — точно утром.";
  }
}

export default function ChatWidgetAdvanced() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [briefMode, setBriefMode] = useState(false);
  const [briefStep, setBriefStep] = useState(0);
  const [briefData, setBriefData] = useState<BriefData>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(`session_${Date.now()}`);

  // CRITICAL: Only render on client + init messages
  useEffect(() => {
    setIsClient(true);
    // Initialize welcome message on client only to prevent hydration mismatch
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Привет! 👋 Я Алексей из ChatBot24.\n\nПомогаю автоматизировать обработку заявок. Задайте вопрос или нажмите \"Заполнить бриф\" — это займёт 2 минуты.",
      timestamp: new Date(),
    }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showForm, isLoading]);

  // Listen for external open chat events
  useEffect(() => {
    if (!isClient) return;
    
    const handleOpenChat = (e: CustomEvent<{ mode?: string }>) => {
      setIsOpen(true);
      // If mode is 'brief', start brief immediately
      if (e.detail?.mode === 'brief') {
        setTimeout(() => {
          startBrief();
        }, 300);
      }
    };
    
    window.addEventListener('openChatWidget' as any, handleOpenChat);
    return () => window.removeEventListener('openChatWidget' as any, handleOpenChat);
  }, [isClient]);

  // Track analytics + init session
  useEffect(() => {
    if (isOpen && isClient && !sessionInitialized) {
      // Create session
      fetch("/api/chat/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId.current,
          metadata: {
            referrer: document.referrer,
            userAgent: navigator.userAgent,
            // UTM params from URL
            utm: {
              source: new URLSearchParams(window.location.search).get("utm_source") || undefined,
              medium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
              campaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
            },
          },
        }),
      }).catch(console.error);

      setSessionInitialized(true);

      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "chat_start",
          data: { sessionId: sessionId.current, timestamp: Date.now() },
        }),
      }).catch(console.error);
    }
  }, [isOpen, isClient, sessionInitialized]);

  // Log messages to database
  const logMessage = useCallback((role: "user" | "assistant", content: string, sentiment?: string) => {
    if (!sessionInitialized) return;
    
    fetch("/api/chat/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId.current,
        role,
        content,
        sentiment,
      }),
    }).catch(console.error);
  }, [sessionInitialized]);

  // Log brief completion
  const logBrief = useCallback((contactData?: { name: string; phone: string; email?: string }) => {
    if (!sessionInitialized) return;

    const score = calculateLeadScore({ budget: briefData.budget });
    const category = getLeadCategory(score);

    fetch("/api/chat/brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: sessionId.current,
        businessType: briefData.businessType,
        channels: briefData.channels,
        dailyRequests: briefData.dailyRequests,
        botTasks: briefData.botTasks,
        hasExamples: briefData.hasExamples,
        budget: briefData.budget,
        score,
        category,
        contactName: contactData?.name,
        contactPhone: contactData?.phone,
        contactEmail: contactData?.email,
      }),
    }).catch(console.error);
  }, [sessionInitialized, briefData]);

  // Start brief mode
  const startBrief = () => {
    setBriefMode(true);
    setBriefStep(0);
    const firstStep = BRIEF_STEPS[0];
    setMessages(prev => [...prev, {
      id: `brief_start_${Date.now()}`,
      role: "assistant",
      content: `Давайте заполним короткий бриф — это поможет подготовить точное предложение.\n\n${firstStep.question}`,
      timestamp: new Date(),
    }]);
  };

  // Handle brief step selection
  const handleBriefSelection = (option: string) => {
    const currentStep = BRIEF_STEPS[briefStep];
    const stepId = currentStep.id as keyof BriefData;
    
    // Update brief data
    setBriefData(prev => {
      if (currentStep.multiple) {
        const current = (prev[stepId] as string[]) || [];
        if (current.includes(option)) {
          return { ...prev, [stepId]: current.filter(o => o !== option) };
        }
        return { ...prev, [stepId]: [...current, option] };
      }
      return { ...prev, [stepId]: option };
    });

    // If single selection, move to next step
    if (!currentStep.multiple) {
      if (briefStep < BRIEF_STEPS.length - 1) {
        setBriefStep(prev => prev + 1);
        const nextStep = BRIEF_STEPS[briefStep + 1];
        setMessages(prevMessages => [...prevMessages, 
          { id: `user_${Date.now()}`, role: "user", content: option, timestamp: new Date() },
          { id: `bot_${Date.now()}`, role: "assistant", content: nextStep.question, timestamp: new Date() }
        ]);
      } else {
        // Last step completed, show contact form
        setMessages(prevMessages => [...prevMessages, 
          { id: `user_${Date.now()}`, role: "user", content: option, timestamp: new Date() },
          { id: `bot_${Date.now()}`, role: "assistant", content: "Почти готово! Оставьте контакты, чтобы менеджер мог отправить предложение.", timestamp: new Date() }
        ]);
        setShowForm(true);
      }
    }
  };

  // Handle quick action
  const handleQuickAction = (action: string) => {
    if (action === "brief") {
      startBrief();
    } else {
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
        default:
          message = action;
      }
      handleSend(message);
    }
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

    // Log user message
    logMessage("user", messageText);

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

      // Log assistant message
      logMessage("assistant", aiResponse, sentiment?.label);

      // Check if we should show brief option
      const triggerWords = ["цена", "стоимость", "сколько", "предложение", "консультация", "заявка", "заинтересовал"];
      const shouldSuggestBrief = triggerWords.some(word => 
        messageText.toLowerCase().includes(word) || aiResponse.toLowerCase().includes(word)
      );
      
      if (shouldSuggestBrief && !briefMode && messages.length > 2) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: `suggest_brief_${Date.now()}`,
            role: "assistant",
            content: "💡 Чтобы получить точное предложение, можно заполнить короткий бриф — это займёт 2 минуты.",
            timestamp: new Date(),
          }]);
        }, 500);
      }

    } catch (err) {
      console.error("Chat error:", err);
      setTypingIndicator(false);
      setError("Ошибка соединения. Попробуйте снова.");
      setMessages(prev => [...prev, {
        id: `error_${Date.now()}`,
        role: "assistant",
        content: "Извините, произошла ошибка соединения. Попробуйте ещё раз или нажмите \"Заполнить бриф\".",
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
    
    if (!briefData.name || !briefData.phone) return;

    setIsLoading(true);

    try {
      // Calculate lead score based on brief data
      const score = calculateLeadScore({
        budget: briefData.budget,
        timeline: "Не определено",
      });
      const category = getLeadCategory(score);

      // Send to API with brief data
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: briefData.name,
          phone: briefData.phone,
          email: briefData.email,
          budget: briefData.budget,
          businessType: briefData.businessType,
          channels: briefData.channels,
          dailyRequests: briefData.dailyRequests,
          botTasks: briefData.botTasks,
          hasExamples: briefData.hasExamples,
          score,
          category,
          sessionId: sessionId.current,
          source: "chat_widget_brief",
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
            category,
            hasBrief: true,
          },
        }),
      }).catch(console.error);

      // Log brief to database and Telegram
      logBrief({
        name: briefData.name!,
        phone: briefData.phone!,
        email: briefData.email,
      });

      // Update contacts in database
      fetch("/api/chat/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionId.current,
          name: briefData.name,
          phone: briefData.phone,
          email: briefData.email,
        }),
      }).catch(console.error);

      setLeadSubmitted(true);
      setShowForm(false);
      
      // Time-based response
      const timeMessage = getTimeBasedResponse();
      
      setMessages(prev => [...prev, {
        id: `confirmation_${Date.now()}`,
        role: "assistant",
        content: timeMessage,
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

  // Get current brief step options
  const currentBriefStep = briefMode && briefStep < BRIEF_STEPS.length ? BRIEF_STEPS[briefStep] : null;

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
                <h3 className="font-semibold text-white">Алексей</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Консультант ChatBot24
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

            {/* Brief Step Options */}
            {currentBriefStep && !showForm && (
              <div className="bg-bg-secondary rounded-2xl p-4 border border-primary-500/20">
                <p className="text-sm text-gray-400 mb-3">
                  {currentBriefStep.multiple ? "Выберите один или несколько вариантов:" : "Выберите вариант:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentBriefStep.options.map((option) => {
                    const isSelected = currentBriefStep.multiple 
                      ? (briefData[currentBriefStep.id as keyof BriefData] as string[])?.includes(option)
                      : false;
                    return (
                      <button
                        key={option}
                        onClick={() => handleBriefSelection(option)}
                        className={cn(
                          "px-3 py-2 text-sm rounded-lg border transition-all",
                          isSelected
                            ? "bg-primary-500 border-primary-500 text-white"
                            : "bg-bg-primary border-primary-500/20 text-gray-300 hover:border-primary-500/50 hover:bg-primary-500/10"
                        )}
                      >
                        {option}
                        {isSelected && <CheckCircle className="w-3 h-3 inline ml-1" />}
                      </button>
                    );
                  })}
                </div>
                {currentBriefStep.multiple && (
                  <button
                    onClick={() => {
                      if (briefStep < BRIEF_STEPS.length - 1) {
                        setBriefStep(prev => prev + 1);
                        const nextStep = BRIEF_STEPS[briefStep + 1];
                        setMessages(prevMessages => [...prevMessages, {
                          id: `bot_${Date.now()}`,
                          role: "assistant",
                          content: nextStep.question,
                          timestamp: new Date(),
                        }]);
                      }
                    }}
                    className="mt-3 px-4 py-2 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
                  >
                    Далее →
                  </button>
                )}
              </div>
            )}

            {/* Contact Form */}
            {showForm && !leadSubmitted && (
              <div className="bg-bg-secondary rounded-2xl p-4 border border-primary-500/20">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary-400" />
                  Оставьте контакты
                </h4>
                <form onSubmit={submitLead} className="space-y-3">
                  <Input
                    placeholder="Ваше имя"
                    value={briefData.name || ""}
                    onChange={(e) => setBriefData({ ...briefData, name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Телефон"
                    type="tel"
                    value={briefData.phone || ""}
                    onChange={(e) => setBriefData({ ...briefData, phone: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Email (необязательно)"
                    type="email"
                    value={briefData.email || ""}
                    onChange={(e) => setBriefData({ ...briefData, email: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                    >
                      Назад
                    </Button>
                    <Button
                      type="submit"
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
          {!showForm && !currentBriefStep && (
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
          {!showForm && !currentBriefStep && (
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
              ChatBot24 — Автоматизация заявок
            </p>
          </div>
        </div>
      )}
    </>
  );
}
