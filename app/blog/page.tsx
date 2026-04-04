import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Блог | ChatBot24',
  description: 'Полезные статьи о чат-ботах, автоматизации бизнеса и искусственном интеллекте',
}

const blogPosts = [
  {
    id: 1,
    title: 'Стоит ли входить в AI-автоматизацию в 20 лет?',
    excerpt: 'Разбираем перспективы рынка AI-автоматизации для молодых специалистов и предпринимателей.',
    date: '2 апреля 2026',
    readTime: '5 мин',
    category: 'AI',
    image: '/images/blog/article1_card.jpg',
  },
  {
    id: 2,
    title: 'Где топ-менеджеры спотыкаются при внедрении ИИ',
    excerpt: 'Типичные ошибки руководителей при внедрении искусственного интеллекта в бизнес-процессы.',
    date: '30 марта 2026',
    readTime: '7 мин',
    category: 'Менеджмент',
    image: '/images/blog/article2_card.jpg',
  },
  {
    id: 3,
    title: 'ИИ не спасёт бизнес без этих 4 компетенций',
    excerpt: 'Какие навыки необходимы компании для успешного внедрения AI-решений.',
    date: '30 марта 2026',
    readTime: '6 мин',
    category: 'Бизнес',
    image: '/images/blog/article3_card.jpg',
  },
  {
    id: 4,
    title: 'PwC: 56% инвестиций в ИИ сгорело',
    excerpt: 'Анализ отчёта PwC о провалах внедрения AI и как этого избежать.',
    date: '25 марта 2026',
    readTime: '8 мин',
    category: 'Аналитика',
    image: '/images/blog/article4_card.jpg',
  },
  {
    id: 5,
    title: '5 ошибок при выборе чат-бота',
    excerpt: 'На что обращать внимание при выборе чат-бота для вашего бизнеса.',
    date: '15 января 2026',
    readTime: '5 мин',
    category: 'Чат-боты',
    image: '/images/blog/article5_card.jpg',
  },
  {
    id: 6,
    title: 'Как мы подняли конверсию на 40% с помощью чат-бота',
    excerpt: 'Реальный кейс увеличения конверсии через внедрение чат-бота.',
    date: '30 января 2026',
    readTime: '6 мин',
    category: 'Кейс',
    image: '/images/blog/article6_card.jpg',
  },
  {
    id: 7,
    title: 'Почему секунды решают: скорость ответа и конверсия',
    excerpt: 'Исследование влияния скорости ответа на конверсию в продажи.',
    date: '15 февраля 2026',
    readTime: '4 мин',
    category: 'Продажи',
    image: '/images/blog/article7_card.jpg',
  },
  {
    id: 8,
    title: 'Telegram vs WhatsApp: где размещать чат-бота в 2026',
    excerpt: 'Сравнение платформ для размещения чат-ботов: плюсы и минусы каждой.',
    date: '25 февраля 2026',
    readTime: '7 мин',
    category: 'Сравнение',
    image: '/images/blog/article8_card.jpg',
  },
  {
    id: 9,
    title: 'Сколько стоит разработка чат-бота в 2026 году: полный разбор цен',
    excerpt: 'Детальный анализ стоимости разработки чат-ботов под ключ. Факторы, влияющие на цену.',
    date: '4 апреля 2026',
    readTime: '10 мин',
    category: 'Ценообразование',
    image: '/images/blog/article9_card.jpg',
    featured: true,
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#00555A] to-[#003d42] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Блог</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Полезные статьи о чат-ботах, автоматизации бизнеса и искусственном интеллекте
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {blogPosts.find(p => p.featured) && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {blogPosts.filter(p => p.featured).map(post => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.id}/`}
                  className="block group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="grid lg:grid-cols-2">
                      <div className="relative h-64 lg:h-auto">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-[#00d4d4] text-white text-sm font-medium rounded-full">
                          Новое
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="px-3 py-1 bg-gray-100 rounded-full">{post.category}</span>
                          <span>{post.date}</span>
                          <span>{post.readTime} чтения</span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#00d4d4] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-lg">{post.excerpt}</p>
                        <div className="mt-6 flex items-center gap-2 text-[#00d4d4] font-medium">
                          Читать статью
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Все статьи</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(p => !p.featured).map(post => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.id}/`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#00d4d4] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
