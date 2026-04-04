import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Кейсы | ChatBot24',
  description: 'Реальные проекты внедрения чат-ботов с измеримыми результатами',
}

const cases = [
  {
    id: 1,
    title: 'Сеть клиник в Москве',
    category: 'Медицина',
    description: 'Автоматизация записи на приём и напоминаний о визитах для сети медицинских клиник.',
    results: [
      { label: 'Увеличение записей', value: '+45%' },
      { label: 'Снижение неявок', value: '-30%' },
      { label: 'Экономия времени', value: '20 ч/нед' },
    ],
    image: '/images/cases/case_medical_clinic.jpg',
    infographic: '/images/cases/infographic_medical.jpg',
  },
  {
    id: 2,
    title: 'Онлайн-школа иностранных языков',
    category: 'Образование',
    description: 'Чат-бот для квалификации студентов, записи на пробные уроки и сбора обратной связи.',
    results: [
      { label: 'Рост конверсии', value: '+40%' },
      { label: 'Сокращение ответа', value: '-70%' },
      { label: 'Новые лиды', value: '+250/мес' },
    ],
    image: '/images/cases/case_language_school.jpg',
    infographic: '/images/cases/infographic_education.jpg',
  },
  {
    id: 3,
    title: 'Интернет-магазин электроники',
    category: 'E-commerce',
    description: 'Бот-консультант для подбора товаров, ответов на вопросы и оформления заказов.',
    results: [
      { label: 'Рост продаж', value: '+35%' },
      { label: 'Средний чек', value: '+18%' },
      { label: 'Удержание', value: '+25%' },
    ],
    image: '/images/cases/case_ecommerce_electronics.jpg',
    infographic: '/images/cases/infographic_ecommerce.jpg',
  },
  {
    id: 4,
    title: 'Поставщик промышленного оборудования',
    category: 'B2B',
    description: 'Автоматизация обработки заявок и расчёта коммерческих предложений.',
    results: [
      { label: 'Скорость ответа', value: '5 мин' },
      { label: 'Конверсия', value: '+28%' },
      { label: 'Экономия', value: '15 ч/нед' },
    ],
    image: '/images/cases/case_b2b_equipment.jpg',
    infographic: '/images/cases/infographic_b2b.jpg',
  },
  {
    id: 5,
    title: 'Разработчик SaaS-решений',
    category: 'IT/SaaS',
    description: 'Техподдержка и onboarding клиентов через чат-бот с интеграцией в тикет-систему.',
    results: [
      { label: 'Время ответа', value: '-60%' },
      { label: 'CSAT', value: '4.8/5' },
      { label: 'Авто-решения', value: '65%' },
    ],
    image: '/images/cases/case_saas_support.jpg',
    infographic: '/images/cases/infographic_saas.jpg',
  },
]

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#00555A] to-[#003d42] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Кейсы</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Реальные проекты внедрения чат-ботов с измеримыми результатами
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '150+', label: 'Реализованных проектов' },
                { value: '45%', label: 'Средний рост конверсии' },
                { value: '24/7', label: 'Работа ботов' },
                { value: '98%', label: 'Довольных клиентов' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[#00d4d4] mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {cases.map((caseItem, index) => (
                <div 
                  key={caseItem.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-lg ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-96">
                      <Image
                        src={caseItem.image}
                        alt={caseItem.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                        {caseItem.category}
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        {caseItem.title}
                      </h2>
                      <p className="text-gray-600 mb-8">{caseItem.description}</p>
                      
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                        Результаты
                      </h3>
                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {caseItem.results.map((result, rIndex) => (
                          <div key={rIndex} className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-[#00d4d4] mb-1">{result.value}</div>
                            <div className="text-xs text-gray-500">{result.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="relative h-32 rounded-xl overflow-hidden">
                        <Image
                          src={caseItem.infographic}
                          alt={`Инфографика: ${caseItem.title}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-[#00555A] to-[#003d42]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Хотите такие же результаты?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Обсудим ваш проект и рассчитаем ожидаемый эффект
            </p>
            <a 
              href="/#demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#00d4d4] to-[#00a8a8] text-white font-semibold rounded-full shadow-lg shadow-[#00d4d4]/30 hover:shadow-xl hover:shadow-[#00d4d4]/40 hover:-translate-y-1 transition-all"
            >
              Обсудить проект
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
