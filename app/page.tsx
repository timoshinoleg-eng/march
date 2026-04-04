import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#00555A] via-[#004a4f] to-[#003d42] text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                  Автоматизация заявок и продаж через{' '}
                  <span className="text-[#00d4d4]">AI-чатботы</span>
                </h1>
                <p className="text-lg lg:text-xl text-white/80 mb-8">
                  Разработка умных чат-ботов для бизнеса. Интеграция с CRM, 
                  квалификация лидов, приём заявок 24/7. Запуск за 7-14 дней.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="#demo" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00d4d4] to-[#00a8a8] text-white font-semibold rounded-full shadow-lg shadow-[#00d4d4]/30 hover:shadow-xl hover:shadow-[#00d4d4]/40 hover:-translate-y-1 transition-all"
                  >
                    Получить консультацию
                  </Link>
                  <Link 
                    href="#pricing" 
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                  >
                    Посмотреть тарифы
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#00d4d4]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    WhatsApp
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#00d4d4]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Telegram
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#00d4d4]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    VK
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative w-96 h-96">
                  <Image
                    src="/images/logo_header.png"
                    alt="ChatBot24"
                    fill
                    className="object-contain animate-pulse"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Возможности чат-ботов
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Автоматизируйте рутинные задачи и увеличьте эффективность вашего бизнеса
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Ответы 24/7',
                  description: 'Бот отвечает на вопросы клиентов круглосуточно без выходных',
                  icon: '🕐',
                },
                {
                  title: 'Интеграция с CRM',
                  description: 'Автоматическая передача данных в amoCRM, Битрикс24 и другие системы',
                  icon: '🔗',
                },
                {
                  title: 'Квалификация лидов',
                  description: 'Сбор информации и определение качества потенциальных клиентов',
                  icon: '🎯',
                },
                {
                  title: 'Мультиканальность',
                  description: 'Работа в WhatsApp, Telegram, VK и на сайте одновременно',
                  icon: '📱',
                },
                {
                  title: 'AI-ассистент',
                  description: 'Интеллектуальная обработка запросов с использованием ИИ',
                  icon: '🤖',
                },
                {
                  title: 'Аналитика',
                  description: 'Подробная статистика по диалогам и конверсии',
                  icon: '📊',
                },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Тарифы
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Выберите подходящий пакет для вашего бизнеса
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Lite',
                  price: '19 900',
                  description: 'Базовый чат-бот для малого бизнеса',
                  features: ['1 мессенджер', 'До 100 диалогов/мес', 'Базовые ответы', 'Email-уведомления'],
                },
                {
                  name: 'Base',
                  price: '39 000',
                  description: 'Расширенный функционал',
                  features: ['2 мессенджера', 'До 500 диалогов/мес', 'CRM-интеграция', 'Сценарии диалогов'],
                  popular: true,
                },
                {
                  name: 'AI-Assist',
                  price: '129 000',
                  description: 'С искусственным интеллектом',
                  features: ['Все мессенджеры', 'Неограниченно диалогов', 'AI-обработка', 'API-доступ'],
                },
                {
                  name: 'Enterprise',
                  price: 'от 249 000',
                  description: 'Корпоративное решение',
                  features: ['Кастомная разработка', 'Выделенный сервер', 'SLA 99.9%', 'Персональный менеджер'],
                },
              ].map((plan, index) => (
                <div 
                  key={index}
                  className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all ${
                    plan.popular ? 'ring-2 ring-[#00d4d4] scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00d4d4] text-white text-sm font-semibold rounded-full">
                      Популярный
                    </span>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500"> ₽</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-[#00d4d4] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button 
                    data-tariff={plan.name}
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#00d4d4] to-[#00a8a8] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#00d4d4]/30 transition-all"
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section id="cases" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Кейсы
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Реальные проекты с измеримыми результатами
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Сеть клиник в Москве',
                  category: 'Медицина',
                  result: 'Записи на приём ↑ 45%',
                  image: '/images/cases/case_medical_clinic.jpg',
                },
                {
                  title: 'Онлайн-школа языков',
                  category: 'Образование',
                  result: 'Конверсия ↑ 40%',
                  image: '/images/cases/case_language_school.jpg',
                },
                {
                  title: 'Интернет-магазин электроники',
                  category: 'E-commerce',
                  result: 'Продажи ↑ 35%',
                  image: '/images/cases/case_ecommerce_electronics.jpg',
                },
              ].map((caseItem, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      {caseItem.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {caseItem.title}
                    </h3>
                    <p className="text-[#00d4d4] font-semibold">{caseItem.result}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/cases"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#00d4d4] text-[#00d4d4] font-semibold rounded-full hover:bg-[#00d4d4] hover:text-white transition-all"
              >
                Все кейсы
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="demo" className="py-20 bg-gradient-to-br from-[#00555A] to-[#003d42]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Готовы автоматизировать свой бизнес?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Получите бесплатную консультацию и расчёт стоимости вашего проекта
            </p>
            <form className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00d4d4]"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00d4d4]"
              />
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#00d4d4] to-[#00a8a8] text-white font-semibold rounded-full shadow-lg shadow-[#00d4d4]/30 hover:shadow-xl hover:shadow-[#00d4d4]/40 hover:-translate-y-1 transition-all"
              >
                Получить консультацию
              </button>
            </form>
            <p className="mt-6 text-sm text-white/60">
              Или позвоните нам:{' '}
              <a href="tel:+79933366102" className="text-[#00d4d4] hover:underline">
                +7 (993) 336-61-02
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
