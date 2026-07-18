import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { COMPANY } from "@/data/company";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности ChatBot24 в отношении обработки персональных данных пользователей сайта.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${COMPANY.website}/privacy` },
};

/**
 * Политика конфиденциальности.
 *
 * Версия документа: 2026-07.
 * При изменении текста увеличьте CONSENT_VERSION в app/api/lead/route.ts,
 * чтобы старые согласия не считались действительными для нового текста.
 */
export default function PrivacyPage() {
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
              Политика конфиденциальности
            </h1>
            <p className="mt-4 text-gray-400">
              {COMPANY.name} («мы», «нас») обязуется защищать персональные
              данные пользователей сайта {COMPANY.website} («вы», «Пользователь»).
              Настоящая Политика разработана в соответствии с Федеральным законом
              № 152-ФЗ «О персональных данных».
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Контактные данные:</strong> имя, телефон, email, имя пользователя
                в мессенджере — которые вы добровольно указываете при заполнении формы
                заявки или брифа.
              </li>
              <li>
                <strong>Технические данные:</strong> IP-адрес, браузер, операционная
                система, источник перехода (включая UTM-метки), дата и время визита.
              </li>
              <li>
                <strong>Содержание переписки:</strong> сообщения, которые вы отправляете
                в чат-виджет на сайте, включая ответы на вопросы брифа.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Цели обработки</h2>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>Связаться с вами по оставленной заявке и подготовить предложение.</li>
              <li>
                Квалифицировать обращение (определить тип задачи, примерный бюджет
                и сроки) — только для подготовки ответа.
              </li>
              <li>
                Улучшать работу сайта и контента: агрегированная аналитика посещаемости
                и поведения (без идентификации конкретного пользователя в публичных отчётах).
              </li>
              <li>Исполнять заключённый договор после оплаты услуг.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Правовое основание</h2>
            <p className="text-sm leading-relaxed">
              Обработка персональных данных осуществляется на основе вашего согласия
              (ст. 6 ч. 1 п. 1 ФЗ-152), которое вы даёте отдельно — проставляя
              отметку в форме заявки и подтверждая{" "}
              <a
                href="/personal-data-consent"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                Согласие на обработку персональных данных
              </a>
              . Письменного согласия для указанных целей обработки не требуется.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Срок хранения</h2>
            <p className="text-sm leading-relaxed">
              Персональные данные хранятся:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Заявки и переписка до заключения договора:</strong> до 12 месяцев
                с момента последнего обращения. После — удаляются по запросу или автоматически.
              </li>
              <li>
                <strong>Данные клиента по заключённому договору:</strong> в течение срока
                действия договора и 3 лет после — в соответствии с требованиями
                бухгалтерского и налогового учёта.
              </li>
              <li>
                <strong>Технические логи:</strong> до 90 дней, затем агрегируются
                и обезличиваются.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Передача третьим лицам</h2>
            <p className="text-sm leading-relaxed">
              Мы не продаём и не передаём ваши персональные данные третьим лицам
              в маркетинговых целях. Передача возможна только в следующих случаях:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>
                <strong>Уведомления менеджеру:</strong> заявка пересылается ответственному
                инженеру через Telegram для оперативной обработки. Доступ ограничен
                сотрудниками, ведущими ваш проект.
              </li>
              <li>
                <strong>CRM (по договору):</strong> при заключении договора данные
                могут быть перенесены в CRM-систему (amoCRM, Битрикс24). Вы будете
                уведомлены отдельно.
              </li>
              <li>
                <strong>Подрядчики под NDA:</strong> для отдельных задач проекта
                данные могут передаваться проверенным подрядчикам в объёме, необходимом
                для исполнения задания, и исключительно под соглашением о конфиденциальности (NDA).
              </li>
              <li>
                <strong>Требование закона:</strong> в случаях, прямо предусмотренных
                действующим законодательством РФ.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Ваши права</h2>
            <p className="text-sm leading-relaxed">
              Вы вправе (ст. 14–17 ФЗ-152):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
              <li>Получить информацию о том, какие ваши данные обрабатываются.</li>
              <li>Потребовать уточнения, блокирования или уничтожения данных.</li>
              <li>Отозвать согласие на обработку — отправив запрос на {COMPANY.email}.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              Запросы обрабатываются в течение 30 дней.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Меры защиты</h2>
            <p className="text-sm leading-relaxed">
              Мы применяем технические и организационные меры: шифрование каналов
              (HTTPS/TLS), ограничение доступа по ролям, журналирование действий
              с ПДн, хранение секретов в защищённом хранилище среды выполнения (не в коде).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">8. Cookies и аналитика</h2>
            <p className="text-sm leading-relaxed">
              Сайт использует Яндекс.Метрику для агрегированной аналитики посещаемости.
              Вы можете отключить cookies в настройках браузера; функциональность
              сайта (включая отправку заявки) при этом сохраняется.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">9. Изменения Политики</h2>
            <p className="text-sm leading-relaxed">
              Мы можем обновлять настоящую Политику. Актуальная редакция всегда
              доступна на этой странице с указанием даты. При существенных изменениях
              мы увеличиваем версию документа; ранее полученные согласия
              действуют для версии, актуальной на момент их предоставления.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">10. Контакты</h2>
            <p className="text-sm leading-relaxed">
              По вопросам обработки персональных данных:
            </p>
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
