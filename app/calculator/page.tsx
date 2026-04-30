import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import FinalCTA from "@/components/sections/FinalCTA";
import ROICalculator from "@/components/sections/Calculator";

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="bg-bg-primary px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-2 text-sm text-primary-300">
              Страница для рекламного трафика
            </span>
            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
              Рассчитайте потери и оставьте заявку на аудит
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
              Маршрут вынесен в отдельную страницу, чтобы рекламные переходы не упирались в 404, а заявка завершалась отдельным thank-you сценарием для Метрики.
            </p>
          </div>
        </section>
        <ROICalculator />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
