"use client"

import { useState, useEffect } from "react"
import { Menu, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#problems", label: "Проблемы" },
  { href: "#how", label: "Как работает" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#cases", label: "Кейсы" },
  { href: "#faq", label: "FAQ" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#021c1b]/90 backdrop-blur-xl border-b border-white/[0.1]"
          : "bg-transparent"
      }`}
    >
      <div className="container-landing">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 text-white font-bold text-lg flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#14b8a6] flex items-center justify-center">
              <span className="text-white font-black text-sm">B24</span>
            </div>
            <span>ChatBot24</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[15px] font-medium text-white/65 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/[0.05]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/ChatBot24su_bot?start=landing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button size="sm" className="gap-1.5 bg-[#14b8a6] hover:bg-[#2dd4bf]">
                <Send className="w-4 h-4" />
                <span className="hidden md:inline">Обсудить проект</span>
                <span className="md:hidden">Написать</span>
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] transition-colors"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#021c1b] border-b border-white/[0.1] transition-all duration-300 ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="container-landing py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-[15px] font-medium text-white/65 rounded-xl transition-all duration-200 hover:text-white hover:bg-white/[0.05]"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 pt-2 border-t border-white/[0.1]">
            <a
              href="https://t.me/ChatBot24su_bot?start=landing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-[#14b8a6] font-medium"
            >
              <Send className="w-4 h-4" />
              Обсудить проект
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
