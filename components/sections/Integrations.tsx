"use client"

import { MessageCircle, Phone, Building2, Building, Cloud, Brain } from "lucide-react"

const integrations = [
  { icon: MessageCircle, name: "Telegram", color: "#229ED9" },
  { icon: Phone, name: "WhatsApp", color: "#25D366" },
  { icon: Building2, name: "Bitrix24", color: "#3BA2D1" },
  { icon: Building, name: "amoCRM", color: "#3B8DD4" },
  { icon: Cloud, name: "Яндекс Cloud", color: "#FFCC00" },
  { icon: Brain, name: "OpenAI", color: "#10A37F" },
]

export default function Integrations() {
  return (
    <section className="section-landing">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Технологии и интеграции
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Работаем с популярными платформами и сервисами
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="p-6 bg-white/[0.03] border border-white/[0.1] rounded-xl transition-all duration-300 hover:bg-white/[0.06] hover:border-[#14b8a6]/30 flex flex-col items-center text-center"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <span className="text-sm font-medium text-white/80">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
