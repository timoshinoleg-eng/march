import { NextResponse } from 'next/server';

const articles = [
  {
    slug: "5-oshibok",
    title: "5 ошибок при выборе чат-бота, которые стоят вам клиентов",
    description: "Как не попасть в ловушку шаблонных решений и выбрать действительно эффективный инструмент для автоматизации заявок.",
    date: "2024-01-15T00:00:00Z",
    category: "Выбор решения",
    content: `
      <p>При выборе чат-бота для бизнеса многие совершают одни и те же ошибки. В этой статье разберём 5 главных ловушек.</p>
      <h2>1. Выбор шаблонного решения без кастомизации</h2>
      <p>Готовые шаблоны кажутся привлекательными, но редко понимают специфику вашего бизнеса.</p>
      <h2>2. Игнорирование интеграции с CRM</h2>
      <p>Чат-бот без связи с CRM — просто красивая игрушка. Данные теряются, заявки не попадают к менеджерам.</p>
      <h2>3. Отсутствие передачи на оператора</h2>
      <p>Даже самый умный бот не справится со всеми ситуациями. Критическая ошибка — не предусмотреть механизм передачи сложных вопросов человеку.</p>
    `
  },
  {
    slug: "konversiya-40",
    title: "Как мы подняли конверсию на 40% с помощью чат-бота",
    description: "Реальный кейс: автоматизация первичной обработки заявок в онлайн-школе и рост продаж без увеличения рекламного бюджета.",
    date: "2024-01-10T00:00:00Z",
    category: "Кейсы",
    content: `
      <h2>Результаты проекта</h2>
      <ul>
        <li>Конверсия выросла с 12% до 16.8% (+40%)</li>
        <li>Время ответа сократилось с 45 минут до мгновенного</li>
        <li>Нагрузка на менеджеров снизилась на 60%</li>
        <li>Окупаемость за 2 месяца</li>
      </ul>
      <h2>О клиенте</h2>
      <p>Онлайн-школа программирования со средним чеком 85 000 ₽. Ежедневно поступало 30-50 заявок из разных каналов.</p>
    `
  },
  {
    slug: "sekundy-reshayut",
    title: "Почему секунды решают: скорость ответа и конверсия",
    description: "Научные исследования и практика: как время ответа влияет на решение клиента о покупке.",
    date: "2024-01-05T00:00:00Z",
    category: "Исследования",
    content: `
      <p>Конверсия снижается на 391%, если ответ занимает более 1 минуты вместо мгновенного.</p>
      <h2>Что говорят исследования</h2>
      <p>Исследование MIT показало: вероятность квалификации лида падает на 80% через 5 минут.</p>
      <h2>Скорость ответа по каналам</h2>
      <p>Мгновенный ответ: 38% конверсии. До 1 минуты: 24%. Более 30 минут: всего 3%.</p>
    `
  },
  {
    slug: "telegram-vs-whatsapp",
    title: "Telegram vs WhatsApp: где размещать чат-бота в 2024",
    description: "Сравнение платформ по охвату аудитории, стоимости, функционалу.",
    date: "2023-12-28T00:00:00Z",
    category: "Сравнение",
    content: `
      <h2>Аудитория в России</h2>
      <p>Telegram: 68 млн пользователей. WhatsApp: 52 млн пользователей.</p>
      <h2>Telegram: плюсы</h2>
      <ul>
        <li>Полностью бесплатный API</li>
        <li>Расширенные возможности ботов</li>
        <li>Лучшая защита от спама</li>
      </ul>
      <h2>WhatsApp: плюсы</h2>
      <ul>
        <li>Привычный канал коммуникации</li>
        <li>Высокий уровень доверия</li>
        <li>Большее проникновение в возрасте 35+</li>
      </ul>
    `
  },
];

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:yandex="http://news.yandex.ru"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:turbo="http://turbo.yandex.ru"
     version="2.0">
  <channel>
    <title>ChatBot24 - Блог об автоматизации</title>
    <link>https://chatbot24.su/blog</link>
    <description>Полезные статьи о чат-ботах, автоматизации заявок и повышении конверсии</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${articles.map(article => `
    <item turbo="true">
      <title>${escapeXml(article.title)}</title>
      <link>https://chatbot24.su/blog/${article.slug}</link>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <author>ChatBot24</author>
      <category>${escapeXml(article.category)}</category>
      <turbo:content>
        <![CDATA[
          <header>
            <h1>${escapeXml(article.title)}</h1>
          </header>
          ${article.content}
        ]]>
      </turbo:content>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
