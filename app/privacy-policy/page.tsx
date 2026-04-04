import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | ChatBot24',
  description: 'Политика конфиденциальности ChatBot24. Как мы обрабатываем и защищаем ваши персональные данные.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              Настоящая Политика конфиденциальности описывает, как ChatBot24 («мы», «наш» или «нас») 
              собирает, использует и защищает информацию, которую вы предоставляете при использовании нашего сайта.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Сбор информации</h2>
            <p className="mb-4">
              Мы собираем следующую информацию:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Имя и контактные данные (email, телефон)</li>
              <li>Информацию о вашей компании</li>
              <li>Данные о использовании сайта (cookies)</li>
              <li>Информацию из переписки с нами</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Использование информации</h2>
            <p className="mb-4">
              Мы используем собранную информацию для:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Предоставления услуг по разработке чат-ботов</li>
              <li>Связи с вами по проектам</li>
              <li>Улучшения нашего сайта и услуг</li>
              <li>Отправки информационных материалов (с вашего согласия)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Защита информации</h2>
            <p className="mb-6">
              Мы принимаем соответствующие меры безопасности для защиты ваших персональных данных 
              от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Cookies</h2>
            <p className="mb-6">
              Наш сайт использует cookies для улучшения пользовательского опыта. 
              Вы можете отключить cookies в настройках вашего браузера.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Раскрытие информации третьим лицам</h2>
            <p className="mb-6">
              Мы не продаем, не обмениваем и не передаем ваши персональные данные третьим лицам 
              без вашего согласия, за исключением случаев, предусмотренных законодательством.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Ваши права</h2>
            <p className="mb-4">
              Вы имеете право:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Получить информацию о ваших данных</li>
              <li>Требовать исправления неточных данных</li>
              <li>Требовать удаления ваших данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Контакты</h2>
            <p className="mb-6">
              По вопросам, связанным с политикой конфиденциальности, обращайтесь:
            </p>
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
