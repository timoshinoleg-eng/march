import Link from "next/link";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Button from "@/components/ui/Button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface ThanksPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function getSource(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const params = searchParams ? await searchParams : {};
  const source = getSource(params.source);

  return (
    <>
      <Header />
      <main className="bg-bg-primary px-4 py-24 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-3xl border border-primary-500/20 bg-bg-secondary/70 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500/15">
            <CheckCircle className="h-8 w-8 text-primary-400" />
          </div>
          <h1 className="mt-6 text-4xl font-bold text-white">Спасибо, заявка отправлена</h1>
          <p className="mt-4 text-lg text-gray-400">
            Мы получили ваши данные и свяжемся с вами в ближайшее время. Эта страница вынесена в отдельный маршрут, чтобы рекламные источники и Метрика фиксировали завершение заявки.
          </p>
          {source ? (
            <p className="mt-4 text-sm text-gray-500">Источник формы: {source}</p>
          ) : null}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/">
              <Button size="lg">
                На главную
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/restobot">
              <Button size="lg" variant="outline">
                Посмотреть RestoBot
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
