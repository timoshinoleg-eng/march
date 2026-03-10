import type { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Блог — ChatBot24",
  description: "Полезные материалы об автоматизации заявок и чат-ботах",
}

const posts = [
  {
    slug: "5-oshibok-vnedreniya-chat-bota",
    title: "5 ошибок внедрения чат-бота",
    excerpt: "Какие ошибки чаще всего совершают при внедрении чат-ботов и как их избежать",
    date: "2024-03-01",
  },
  {
    slug: "kak-chat-bot-uvelichivaet-konversiyu",
    title: "Как чат-бот увеличивает конверсию",
    excerpt: "Исследование влияния чат-ботов на конверсию в разных нишах бизнеса",
    date: "2024-02-15",
  },
  {
    slug: "sekundy-reshayut-vse",
    title: "Секунды решают всё",
    excerpt: "Почему скорость ответа критична для продаж и как бот помогает",
    date: "2024-02-01",
  },
  {
    slug: "telegram-vs-whatsapp",
    title: "Telegram vs WhatsApp",
    excerpt: "Сравнение возможностей платформ для бизнес-ботов",
    date: "2024-01-20",
  },
]

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="container-landing">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
              Блог ChatBot24
            </h1>
            <p className="text-lg text-white/65 mb-12">
              Полезные материалы об автоматизации заявок и росте бизнеса
            </p>

            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group p-6 bg-white/[0.03] border border-white/[0.1] rounded-2xl transition-all duration-200 hover:bg-white/[0.06] hover:border-[#14b8a6]/30"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <time className="text-sm text-[#14b8a6]">{post.date}</time>
                    <h2 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-[#14b8a6] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/60">{post.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
