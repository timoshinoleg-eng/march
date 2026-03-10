"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageCircle, Minimize2, Bot, User, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  options?: string[]
}

const quickButtons = [
  "Сколько стоит?",
  "Сроки запуска",
  "Примеры внедрения",
  "Оставить заявку",
]

// Brief steps configuration
const briefSteps = [
  {
    field: "niche",
    question: "В какой сфере работает ваш бизнес?",
    options: ["Ритейл", "Услуги", "Образование", "Медицина", "Недвижимость", "Другое"],
  },
  {
    field: "channels",
    question: "Какие каналы связи используете?",
    options: ["Telegram", "WhatsApp", "Instagram", "Сайт", "MAX", "Другие"],
  },
  {
    field: "leadsPerDay",
    question: "Сколько заявок получаете в день?",
    options: ["До 10", "10-50", "50-100", "100+"],
  },
  {
    field: "tasks",
    question: "Какие задачи должен решать бот?",
    options: ["FAQ и консультации", "Запись на приём", "Квалификация лидов", "Прайсы и каталог", "CRM интеграция"],
  },
  {
    field: "examples",
    question: "Есть ли примеры ботов, которые вам нравятся?",
    options: ["Да, есть примеры", "Нет, нужна консультация", "Свои идеи"],
  },
  {
    field: "budget",
    question: "Какой бюджет планируете?",
    options: ["До 50 000₽", "50 000 - 100 000₽", "100 000 - 200 000₽", "200 000₽+", "Обсудить варианты"],
  },
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Привет! 👋\n\nЯ чат-бот ChatBot24. Готов ответить на вопросы о наших системах автоматизации или собрать заявку для менеджера.",
      options: quickButtons,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isBriefMode, setIsBriefMode] = useState(false)
  const [briefStep, setBriefStep] = useState(0)
  const [briefData, setBriefData] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (role: "user" | "assistant", content: string, options?: string[]) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), role, content, options }])
  }

  const handleOptionClick = async (option: string) => {
    addMessage("user", option)

    if (isBriefMode && !isCompleted) {
      const currentStep = briefSteps[briefStep]
      const newData = { ...briefData, [currentStep.field]: option }
      setBriefData(newData)

      if (briefStep < briefSteps.length - 1) {
        setIsTyping(true)
        setTimeout(() => {
          setBriefStep(briefStep + 1)
          const nextStep = briefSteps[briefStep + 1]
          addMessage("assistant", nextStep.question, nextStep.options)
          setIsTyping(false)
        }, 500)
      } else {
        // Final step - ask for contact
        setIsTyping(true)
        setTimeout(() => {
          setIsCompleted(true)
          addMessage("assistant", "Спасибо за информацию! 🎉\n\nОставьте ваш телефон или Telegram, чтобы менеджер связался с готовым решением:")
          setIsTyping(false)
        }, 500)
      }
      return
    }

    if (option === "Оставить заявку") {
      setIsBriefMode(true)
      setIsTyping(true)
      setTimeout(() => {
        const firstStep = briefSteps[0]
        addMessage("assistant", firstStep.question, firstStep.options)
        setIsTyping(false)
      }, 500)
      return
    }

    // Regular response
    setIsTyping(true)
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: option }),
      })
      const data = await res.json()
      
      setTimeout(() => {
        addMessage("assistant", data.response, quickButtons)
        setIsTyping(false)
      }, 800)
    } catch {
      setTimeout(() => {
        addMessage("assistant", "Извините, произошла ошибка. Попробуйте позже или напишите нам в Telegram @ChatBot24su_bot", quickButtons)
        setIsTyping(false)
      }, 500)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    addMessage("user", userMessage)
    setInput("")

    if (isCompleted) {
      // Save lead with contact info
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            telegram: userMessage,
            ...briefData,
            source: "widget",
          }),
        })
      } catch {}
      
      addMessage("assistant", "Отлично! Заявка отправлена. Менеджер свяжется с вами в течение часа. 🚀")
      return
    }

    setIsTyping(true)
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })
      const data = await res.json()
      
      setTimeout(() => {
        addMessage("assistant", data.response, quickButtons)
        setIsTyping(false)
      }, 800)
    } catch {
      setTimeout(() => {
        addMessage("assistant", "Извините, произошла ошибка. Попробуйте позже.", quickButtons)
        setIsTyping(false)
      }, 500)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#14b8a6] text-white shadow-[0_8px_30px_rgba(20,184,166,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(20,184,166,0.5)]"
        aria-label="Открыть чат"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] animate-fade-in-up">
      <div className="bg-gradient-to-br from-[#021c1b] to-[#042f2e] border border-[#14b8a6]/20 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#14b8a6]/10 border-b border-[#14b8a6]/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-[#14b8a6] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#021c1b] rounded-full" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">ChatBot24</div>
              <div className="text-xs text-white/60">Обычно отвечает за минуту</div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[380px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] ${
                  message.role === "user"
                    ? "bg-[#14b8a6] text-white rounded-2xl rounded-br-[4px]"
                    : "bg-white/5 border border-white/10 text-white rounded-2xl rounded-bl-[4px]"
                } px-4 py-3`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {message.role === "assistant" ? (
                    <Bot className="w-3.5 h-3.5 text-[#14b8a6]" />
                  ) : (
                    <User className="w-3.5 h-3.5 opacity-70" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.role === "assistant" ? "Бот" : "Вы"}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-line leading-relaxed">
                  {message.content}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-[4px] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-[#14b8a6]/60 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-[#14b8a6]/60 rounded-full animate-bounce [animation-delay:0.16s]" />
                  <span className="w-2 h-2 bg-[#14b8a6]/60 rounded-full animate-bounce [animation-delay:0.32s]" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Options */}
        {messages[messages.length - 1]?.options && (
          <div className="px-4 py-3 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {messages[messages.length - 1].options!.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={isTyping}
                  className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-[#14b8a6]/10 hover:border-[#14b8a6]/40 transition-colors disabled:opacity-50"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-white/5">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isCompleted ? "Введите телефон или @telegram" : "Введите сообщение..."}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#14b8a6]/50"
            />
            <Button type="submit" size="icon" className="bg-[#14b8a6] hover:bg-[#2dd4bf] flex-shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
