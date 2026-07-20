import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

/**
 * Layout страницы /cases.
 *
 * G1 (аудит): ранее здесь не было шапки/футера — только внутренняя
 * кнопка «На главную». Теперь единая навигация со всем сайтом.
 */
export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
