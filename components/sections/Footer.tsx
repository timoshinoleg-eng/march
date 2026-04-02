import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  solutions: [
    { label: "Lite", href: "/calculator?utm_source=site&utm_medium=footer&utm_content=lite" },
    { label: "Base", href: "/calculator?utm_source=site&utm_medium=footer&utm_content=base" },
    { label: "AI", href: "/calculator?utm_source=site&utm_medium=footer&utm_content=ai" },
    { label: "Enterprise", href: "/calculator?utm_source=site&utm_medium=footer&utm_content=enterprise" },
  ],
  company: [
    { label: "Как это работает", href: "#how-it-works" },
    { label: "Кейсы", href: "#cases" },
    { label: "Технологии", href: "#tech-stack" },
    { label: "Процесс работы", href: "#process" },
  ],
  support: [
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contact" },
    { label: "Политика конфиденциальности", href: "#" },
    { label: "Пользовательское соглашение", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-primary-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-emerald">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                ChatBot24
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Инженерное бюро автоматизации. Создаем системы обработки заявок,
              которые работают 24/7 и не пропускают ни одного клиента.
            </p>
            <div className="space-y-3">
              <a 
                href="tel:+79933366102" 
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+7 (993) 336-61-02</span>
              </a>
              <a 
                href="mailto:info@chatbot24.su" 
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-primary-400" />
                <span>info@chatbot24.su</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>г. Москва</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold text-white mb-4">Решения</h4>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Поддержка</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-500/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 ChatBot24. Все права защищены.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Инженерное бюро автоматизации</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
