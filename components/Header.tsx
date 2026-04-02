"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Как это работает", href: "/#how-it-works" },
  { label: "Тарифы", href: "/#pricing" },
  { label: "Калькулятор", href: "/calculator" },
  { label: "Кейсы", href: "/#cases" },
  { label: "Блог", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Контакты", href: "/#final-cta" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Если это страница блога и ссылка на главную с якорем
    if (isBlogPage && href.startsWith("/#")) {
      window.location.href = href;
      return;
    }
    
    // Если ссылка на той же странице
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isBlogPage
            ? "bg-bg-primary/90 backdrop-blur-md border-b border-primary-500/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group"
              aria-label="ChatBot24 - на главную"
            >
              <Logo size="sm" />
              <span className="font-bold text-white text-lg hidden sm:block group-hover:text-primary-400 transition-colors">
                ChatBot24
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-white bg-primary-500/20"
                      : "text-gray-300 hover:text-white hover:bg-primary-500/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden md:block">
              <Link
                href="/#final-cta"
                className="px-4 py-2 bg-gradient-emerald text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-shadow"
              >
                Оставить заявку
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 lg:hidden"
          suppressHydrationWarning
        >
            <div 
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-md pt-20"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative z-10 flex flex-col items-center gap-4 p-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-lg py-2 ${
                      pathname === item.href
                        ? "text-primary-400"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="w-full max-w-xs mt-4"
              >
                <Link
                  href="/#final-cta"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 bg-gradient-emerald text-white font-medium rounded-lg text-center"
                >
                  Оставить заявку
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )
      }
    </>
  );
}
