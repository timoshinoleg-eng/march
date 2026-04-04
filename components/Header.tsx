'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#00555A] to-[#003d42] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo_header.png"
              alt="ChatBot24"
              width={40}
              height={40}
              className="rounded-lg object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-2xl font-bold text-white tracking-tight">
              Chat<span className="text-[#00d4d4]">Bot</span>24
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="#features" 
              className="text-white/90 hover:text-[#00d4d4] transition-colors text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#00d4d4] after:transition-all hover:after:w-full"
            >
              Возможности
            </Link>
            <Link 
              href="#pricing" 
              className="text-white/90 hover:text-[#00d4d4] transition-colors text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#00d4d4] after:transition-all hover:after:w-full"
            >
              Тарифы
            </Link>
            <Link 
              href="#cases" 
              className="text-white/90 hover:text-[#00d4d4] transition-colors text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#00d4d4] after:transition-all hover:after:w-full"
            >
              Кейсы
            </Link>
            <Link 
              href="#contacts" 
              className="text-white/90 hover:text-[#00d4d4] transition-colors text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-[#00d4d4] after:transition-all hover:after:w-full"
            >
              Контакты
            </Link>
          </nav>

          {/* CTA Button */}
          <Link 
            href="#demo" 
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#00d4d4] to-[#00a8a8] text-white text-sm font-semibold rounded-full shadow-lg shadow-[#00d4d4]/30 hover:shadow-xl hover:shadow-[#00d4d4]/40 hover:-translate-y-0.5 transition-all"
          >
            Попробовать бесплатно
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Меню"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link 
                href="#features" 
                className="text-white/90 hover:text-[#00d4d4] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Возможности
              </Link>
              <Link 
                href="#pricing" 
                className="text-white/90 hover:text-[#00d4d4] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Тарифы
              </Link>
              <Link 
                href="#cases" 
                className="text-white/90 hover:text-[#00d4d4] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Кейсы
              </Link>
              <Link 
                href="#contacts" 
                className="text-white/90 hover:text-[#00d4d4] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакты
              </Link>
              <Link 
                href="#demo" 
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#00d4d4] to-[#00a8a8] text-white text-sm font-semibold rounded-full mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Попробовать бесплатно
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
