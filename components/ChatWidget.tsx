'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  MessageCircle, 
  Send, 
  Loader2, 
  CheckCircle2,
  Sparkles,
  Minimize2
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface LeadData {
  name: string;
  phone: string;
  email: string;
  budget: string;
}

export default function ChatWidget() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({ name: '', phone: '', email: '', budget: '' });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Привет! Я Алексей, AI-ассистент ChatBot24 🤖\n\nПомогаю автоматизировать обработку заявок бизнесу. Расскажите, чем занимаетесь и какая у вас задача?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // CRITICAL: Only render on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showForm, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !showForm && isClient) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, showForm, isClient]);

  // Show form after 3 user messages if not shown yet
  useEffect(() => {
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length >= 3 && !showForm && !leadSubmitted) {
      setShowForm(true);
    }
  }, [messages, showForm, leadSubmitted]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      role: 'user',
      content: trimmedInput
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: ''
    }]);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: trimmedInput }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages(prev => prev.map(m => 
          m.id === assistantId 
            ? { ...m, content: fullContent }
            : m
        ));
      }

      const triggerWords = ['контакт', 'телефон', 'менеджер', 'связаться', 'передать'];
      const shouldShowForm = triggerWords.some(word => 
        fullContent.toLowerCase().includes(word)
      );
      
      if (shouldShowForm && !leadSubmitted) {
        setTimeout(() => setShowForm(true), 1000);
      }

    } catch (err) {
      console.error('Chat error:', err);
      setError('Ошибка соединения. Попробуйте снова.');
      setMessages(prev => prev.filter(m => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, leadSubmitted]);

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leadData.name.trim() || !leadData.phone.trim()) {
      return;
    }

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...leadData, 
          source: 'AI Chat Widget',
          message: messages.map(m => `${m.role}: ${m.content}`).join('\n')
        }),
      });

      if (res.ok) {
        setLeadSubmitted(true);
        setMessages(prev => [...prev, {
          id: 'confirmation',
          role: 'assistant',
          content: `✅ Спасибо, ${leadData.name}! Заявка принята. Наш менеджер свяжется с вами в течение рабочего дня по номеру ${leadData.phone}.`
        }]);
        setShowForm(false);
      } else {
        const error = await res.json();
        alert(error.error || 'Ошибка отправки. Попробуйте позже.');
      }
    } catch (err) {
      console.error('Lead submit error:', err);
      alert('Ошибка соединения. Попробуйте позже.');
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Привет! Я Алексей, AI-ассистент ChatBot24 🤖\n\nПомогаю автоматизировать обработку заявок бизнесу. Расскажите, чем занимаетесь и какая у вас задача?'
      }
    ]);
    setShowForm(false);
    setLeadSubmitted(false);
    setLeadData({ name: '', phone: '', email: '', budget: '' });
    setError(null);
  };

  // CRITICAL: Return null during SSR to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  // Closed state - floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Открыть чат"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20" />
          <div className="relative p-4 bg-primary-500 rounded-full shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 group-hover:bg-primary-400">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-primary" />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-bg-primary rounded-2xl shadow-2xl shadow-black/40 border border-primary-500/20 flex flex-col max-h-[600px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-400 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-primary-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">ChatBot24 AI</h3>
              <p className="text-xs text-white/80">Алексей • Онлайн</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={resetChat}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Начать новый диалог"
            >
              <span className="text-white/90 text-xs">Новый чат</span>
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Закрыть чат"
            >
              <Minimize2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px] bg-bg-secondary/30">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primary-500 text-white rounded-br-md'
                    : 'bg-bg-secondary border border-white/10 text-gray-200 rounded-bl-md'
                }`}
              >
                {m.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-bg-secondary border border-white/10 rounded-2xl rounded-bl-md p-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary-500" />
                <span className="text-xs text-gray-400">Алексей печатает...</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-red-400">{error}</p>
                <button 
                  onClick={() => handleSubmit()}
                  className="text-xs text-primary-400 hover:text-primary-300 mt-1"
                >
                  Попробовать снова
                </button>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Lead Form */}
        {showForm && !leadSubmitted && (
          <div className="p-4 border-t border-white/10 bg-bg-secondary/50 animate-in slide-in-from-bottom-2 duration-300">
            <p className="text-sm text-gray-300 mb-3 text-center">Оставьте контакты — менеджер свяжется с вами</p>
            <form onSubmit={submitLead} className="space-y-2.5">
              <input
                type="text"
                placeholder="Ваше имя *"
                required
                value={leadData.name}
                onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-bg-primary border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                required
                value={leadData.phone}
                onChange={e => setLeadData({ ...leadData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-bg-primary border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
              />
              <input
                type="email"
                placeholder="Email (необязательно)"
                value={leadData.email}
                onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-bg-primary border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
              />
              <select
                value={leadData.budget}
                onChange={e => setLeadData({ ...leadData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-bg-primary border border-white/10 rounded-xl text-sm text-gray-300 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all appearance-none cursor-pointer"
              >
                <option value="">Бюджет (необязательно)</option>
                <option value="до 50 000₽">до 50 000₽</option>
                <option value="50 000₽ - 100 000₽">50 000₽ - 100 000₽</option>
                <option value="100 000₽ - 250 000₽">100 000₽ - 250 000₽</option>
                <option value="250 000₽+">250 000₽+</option>
              </select>
              <button
                type="submit"
                className="w-full py-3 bg-primary-500 hover:bg-primary-400 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <Send className="w-4 h-4" />
                Отправить заявку
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Продолжить без контактов
              </button>
            </form>
          </div>
        )}

        {/* Success state after lead submission */}
        {leadSubmitted && (
          <div className="p-4 border-t border-white/10 bg-green-500/10 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-sm text-green-300">Заявка отправлена! Мы скоро свяжемся.</p>
          </div>
        )}

        {/* Chat Input */}
        {!showForm && !leadSubmitted && (
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-bg-primary">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Напишите сообщение..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-bg-secondary border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-3 bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all flex items-center justify-center hover:shadow-lg hover:shadow-primary-500/25"
                aria-label="Отправить"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-2">
              AI-ассистент может допускать ошибки. Важные данные проверяйте самостоятельно.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
