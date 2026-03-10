"use client"

import { Send, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-16 bg-[#021c1b] border-t border-white/[0.1]">
      <div className="container-landing">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="inline-flex items-center gap-2.5 text-white font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#14b8a6] flex items-center justify-center">
                <span className="text-white font-black text-sm">B24</span>
              </div>
              <span>ChatBot24</span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed">
              Инженерное бюро автоматизации. Создаём системы обработки заявок для бизнеса.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-3">
              <li><a href="#problems" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">Проблемы</a></li>
              <li><a href="#how" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">Как работает</a></li>
              <li><a href="#pricing" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">Тарифы</a></li>
              <li><a href="#cases" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">Кейсы</a></li>
              <li><a href="#faq" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Документы</h4>
            <ul className="space-y-3">
              <li><a href="/privacy" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">Политика конфиденциальности</a></li>
              <li><a href="/blog" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">Блог</a></li>
              <li><a href="/admin" className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm">Админ-панель</a></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://t.me/ChatBot24su_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-[#14b8a6] transition-colors text-sm">
                  <Send className="w-4 h-4" />
                  @ChatBot24su_bot
                </a>
              </li>
              <li>
                <a href="mailto:hello@chatbot24.su" className="flex items-center gap-2 text-white/60 hover:text-[#14b8a6] transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  hello@chatbot24.su
                </a>
              </li>
              <li>
                <a href="tel:+79991234567" className="flex items-center gap-2 text-white/60 hover:text-[#14b8a6] transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  +7 (999) 123-45-67
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.1] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2024 ChatBot24. Все права защищены.
          </p>
          <p className="text-white/50 text-sm">
            Работаем по всей России
          </p>
        </div>
      </div>
    </footer>
  )
}
