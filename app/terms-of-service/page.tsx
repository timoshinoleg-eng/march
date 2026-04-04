import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Пользовательское соглашение | ChatBot24',
  description: 'Пользовательское соглашение ChatBot24. Условия использования сайта и услуг.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Пользовательское соглашение</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения 
              между ChatBot24 (далее — «Администрация») и пользователем сайта (далее — «Пользователь»).
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Общие положения</h2>
            <p className="mb-4">
              1.1. Настоящее Соглашение является публичной офертой.
            </p>
            <p className="mb-4">
              1.2. Используя сайт, Пользователь подтверждает согласие с условиями настоящего Соглашения.
            </p>
            <p className="mb-6">
              1.3. Администрация оставляет за собой право изменять условия Соглашения без предварительного уведомления.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Права и обязанности Пользователя</h2>
            <p className="mb-4">
              2.1. Пользователь имеет право:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Использовать сайт для получения информации об услугах</li>
              <li>Заказывать услуги через формы на сайте</li>
              <li>Получать консультации по услугам</li>
            </ul>
            <p className="mb-4">
              2.2. Пользователь обязуется:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Предоставлять достоверную информацию</li>
              <li>Не нарушать работу сайта</li>
              <li>Не использовать сайт в незаконных целях</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Права и обязанности Администрации</h2>
            <p className="mb-4">
              3.1. Администрация имеет право:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Изменять содержание сайта</li>
              <li>Ограничивать доступ к сайту при нарушении Соглашения</li>
              <li>Собирать и обрабатывать данные Пользователей согласно Политике конфиденциальности</li>
            </ul>
            <p className="mb-6">
              3.2. Администрация обязуется:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Обеспечивать работоспособность сайта</li>
              <li>Защищать персональные данные Пользователей</li>
              <li>Предоставлять достоверную информацию об услугах</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Интеллектуальная собственность</h2>
            <p className="mb-6">
              4.1. Все материалы на сайте являются интеллектуальной собственностью ChatBot24.
            </p>
            <p className="mb-6">
              4.2. Копирование материалов без письменного разрешения запрещено.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Ответственность</h2>
            <p className="mb-4">
              5.1. Администрация не несет ответственности за:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Временную недоступность сайта</li>
              <li>Убытки от использования или невозможности использования сайта</li>
              <li>Действия третьих лиц</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Порядок разрешения споров</h2>
            <p className="mb-6">
              6.1. Все споры решаются путем переговоров.
            </p>
            <p className="mb-6">
              6.2. При недостижении соглашения спор передается в суд по месту регистрации Администрации.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Заключительные положения</h2>
            <p className="mb-6">
              7.1. Настоящее Соглашение вступает в силу с момента начала использования сайта.
            </p>
            <p className="mb-6">
              7.2. Если какое-либо положение Соглашения признано недействительным, 
              остальные положения остаются в силе.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Контакты</h2>
            <p className="mb-2">
              Email: <a href="mailto:info@chatbot24.su" className="text-blue-600 hover:underline">info@chatbot24.su</a>
            </p>
            <p className="mb-6">
              Телефон: <a href="tel:+79933366102" className="text-blue-600 hover:underline">+7 (993) 336-61-02</a>
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Последнее обновление: 4 апреля 2026 г.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
