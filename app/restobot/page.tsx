import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import FinalCTA from "@/components/sections/FinalCTA";

export default function RestoBotPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary pt-24">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-bg-secondary p-8 sm:p-12">
              <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                Пилотная версия RestoBot
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold text-white sm:text-5xl">
                Чат-бот для ресторана и доставки: приём заказов, брони и ответы гостям 24/7
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-gray-400">
                RestoBot собирает заявки из Telegram и сайта, отвечает по меню, помогает не терять заказы в часы пик и передаёт данные менеджеру или в CRM.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {[
                "Приём предзаказов и бронирований без участия администратора.",
                "Сбор контактов гостя и маршрутизация заказов по сценарию.",
                "Ответы на типовые вопросы о меню, доставке и времени работы.",
                "Отдельные сценарии для доставки, dark kitchen и сети заведений.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-primary-500/10 bg-bg-secondary/60 p-6 text-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
