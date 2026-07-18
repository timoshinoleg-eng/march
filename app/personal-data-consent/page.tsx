import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Текст согласия на обработку персональных данных, которое пользователь даёт при отправке заявки на сайте ChatBot24.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${COMPANY.website}/personal-data-consent` },
};

/**
 * Согласие на обработку персональных данных.
 *
 * Версия документа: 2026-07.
 * Ссылка на эту страницу есть в каждой форме захвата (LeadForm, ChatWidget brief).
 * Ставя галочку и отправляя форму, пользователь подтверждает согласие
 * с ЭТОЙ версией текста.
 */
export default function PersonalDataConsentPage() {
  return (
    <>
      <Header />
      <main className="bg-bg-primary px-4 py-20 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl space-y-8 text-gray-300">
          <header>
            <p className="text-sm text-primary-400 mb-2">
              Редакция от 1 июля 2026 г. · Версия 2026-07
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Согласие на обработку персональных данных
            </h1>
            <p className="mt-4 text-gray-400">
              Отмечая галочку «Я согласен…» в форме заявки и нажимая
              «Отправить заявку», Пользователь подтверждает согласие со следующим.
            </p>
          </header>

          <section className="space-y-3">
            <p className="text-sm leading-relaxed">
              Я, действуя свободно, своей волей и в своём интересе, даю согласие
              {COMPANY.name} (далее — «Оператор») на обработку моих персональных
              данных на следующих условиях.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Предмет согласия</h2>
            <p className="text-sm leading-relaxed">
              Согласие распространяется на следующие персональные данные:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>фамилия, имя (указываются добровольно в форме заявки);</li>
              <li>контактный телефон;</li>
              <li>адрес электронной почты;</li>
              <li>имя пользователя в мессенджере (Telegram и др.);</li>
              <li>название компании — если указано;</li>
              <li>
                содержание сообщений и ответы на вопросы брифа, передаваемые через
                чат-виджет сайта.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Цели обработки</h2>
            <p className="text-sm leading-relaxed">
              Согласие даётся на обработку в следующих целях:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>связь со мной по оставленной заявке;</li>
              <li>подготовка коммерческого предложения и расчёт стоимости;</li>
              <li>квалификация обращения (тип задачи, бюджет, сроки);</li>
              <li>заключение и исполнение договора — в случае дальнейшего сотрудничества.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Перечень действий с данными</h2>
            <p className="text-sm leading-relaxed">
              Согласие даётся на совершение следующих действий: сбор, запись,
              систематизация, накопление, хранение, уточнение (обновление, изменение),
              извлечение, использование, передача (предоставление, доступ)
              ответственному инженеру и подрядчикам под NDA, обезличивание,
              блокирование, удаление, уничтожение.
            </p>
            <p className="text-sm leading-relaxed">
              Обработка допускается как с использованием средств автоматизации, так и
              без их использования.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Срок действия и отзыв</h2>
            <p className="text-sm leading-relaxed">
              Согласие действует до момента его отзыва. Я вправе отозвать согласие
              в любой момент, направив письменное обращение на {COMPANY.email}.
              В случае отзыва согласия Оператор вправе продолжить обработку без
              моего согласия только при наличии оснований, указанных в п. 2–11 ч. 1
              ст. 6 ФЗ-152 (например, для исполнения заключённого договора).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Передача третьим лицам</h2>
            <p className="text-sm leading-relaxed">
              В рамках целей, указанных в разделе 2, данные могут передаваться:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>ответственному инженеру и/или менеджеру проекта через Telegram;</li>
              <li>проверенным подрядчикам под соглашением о конфиденциальности (NDA) — для отдельных задач;</li>
              <li>CRM-системе (amoCRM, Битрикс24) — только после заключения договора и с отдельным уведомлением.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              Передача в маркетинговых целях третьим лицам исключена.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Подтверждение</h2>
            <p className="text-sm leading-relaxed">
              Отправляя форму заявки с проставленной отметкой согласия, я подтверждаю,
              что:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>ознакомлен с настоящим Согласием и{" "}<a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">Политикой конфиденциальности</a>;</li>
              <li>даю согласие добровольно, в своём интересе;</li>
              <li>
                понимаю, что отзыв согласия не распространяется на обработку,
                совершённую до момента отзыва.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Контакты Оператора</h2>
            <ul className="text-sm space-y-1">
              <li>Email: <a href={`mailto:${COMPANY.email}`} className="text-primary-400 hover:text-primary-300 underline">{COMPANY.email}</a></li>
              <li>Телефон: <a href={`tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`} className="text-primary-400 hover:text-primary-300 underline">{COMPANY.phone}</a></li>
              <li>Город: {COMPANY.city}</li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
