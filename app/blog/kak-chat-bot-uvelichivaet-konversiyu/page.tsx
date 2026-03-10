import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/sections/Header"
import Footer from "@/components/sections/Footer"

export const metadata: Metadata = {
  title: "Как чат-бот увеличивает конверсию — ChatBot24 Studio",
  description: "Исследование влияния чат-ботов на конверсию в разных нишах бизнеса",
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
                Как чат-бот увеличивает конверсию
              </h1>
              <time className="text-sm text-white/50 block mb-8">15 февраля 2024</time>

              <div className="space-y-6 text-white/80">
                <p>
                  По данным исследований, внедрение чат-бота может увеличить конверсию 
                  на 15-40% в зависимости от ниши. Рассмотрим, как именно бот помогает 
                  превращать посетителей в клиентов.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Мгновенный ответ
                </h2>
                <p>
                  78% клиентов покупают у того, кто ответил первым. Чат-бот отвечает 
                  за секунды, независимо от времени суток и загруженности менеджеров.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Квалификация лидов
                </h2>
                <p>
                  Бот собирает ключевую информацию: бюджет, сроки, потребности. 
                  Менеджер получает «тёплого» клиента с контекстом вместо холодного звонка.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Снижение отказов
                </h2>
                <p>
                  Простая консультация прямо в мессенджере снимает базовые возражения. 
                  Клиент получает ответы на вопросы без необходимости искать информацию 
                  на сайте или звонить.
                </p>

                <h2 className="text-2xl font-bold text-[#F0F6FF] mt-8 mb-4">
                  Возвращение клиентов
                </h2>
                <p>
                  Напоминания о незавершённых заказах, повторные записи, реактивация 
                  «спящих» клиентов — всё это автоматизируется и работает без внимания 
                  менеджеров.
                </p>

                <div className="mt-12 p-6 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-xl">
                  <p className="m-0 font-semibold text-[#F0F6FF]">
                    Узнайте, как чат-бот повысит конверсию именно в вашем бизнесе. 
                    Заполните бриф — мы подготовим развёрнутую консультацию.
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
