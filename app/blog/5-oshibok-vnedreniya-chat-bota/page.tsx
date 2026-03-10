import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "5 ошибок внедрения чат-бота — ChatBot24 Studio",
  description: "Какие ошибки чаще всего совершают при внедрении чат-ботов и как их избежать",
}

export default function BlogPost() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="container-landing">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/65 hover:text-[#22C55E] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в блог
            </Link>

            <article className="prose prose-invert prose-lg max-w-none">
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                5 ошибок внедрения чат-бота
              </h1>
              <time className="text-sm text-white/50 block mb-8">1 марта 2024</time>

              <div className="space-y-6 text-white/80">
                <p>
                  Внедрение чат-бота — это не просто покупка программы. Это изменение 
                  процессов коммуникации с клиентами. Вот пять ошибок, которые мы видим 
                  чаще всего.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  1. Отсутствие чёткой цели
                </h2>
                <p>
                  Многие заказывают бота «потому что все делают». Без конкретной цели 
                  — автоматизация записи, квалификация лидов, сокращение нагрузки на 
                  операторов — проект обречён на неэффективность.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  2. Перегруженный сценарий
                </h2>
                <p>
                  Попытка сделать бота «на все случаи жизни» приводит к запутанным 
                  диалогам. Начните с одной задачи, отладьте её, затем добавляйте новые 
                  функции.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  3. Игнорирование edge cases
                </h2>
                <p>
                  Что будет, если клиент напишет что-то неожиданное? Нужен механизм 
                  передачи на человека и сбор статистики по нераспознанным запросам.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  4. Нет интеграции с CRM
                </h2>
                <p>
                  Бот, который не передаёт данные в вашу систему учёта, создаёт дополнительную 
                  работу — менеджеры вынуждены копировать информацию вручную.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  5. Запуск без тестирования
                </h2>
                <p>
                  Даже простой сценарий нужно проверить на реальных клиентах или 
                  коллегах. Часто очевидные проблемы видны только свежим взглядом.
                </p>

                <div className="mt-12 p-6 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl">
                  <p className="m-0 font-semibold text-[#F0F6FF]">
                    Хотите избежать этих ошибок? Мы проводим бесплатную консультацию 
                    перед началом проекта.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
