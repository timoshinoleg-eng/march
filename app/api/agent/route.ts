import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 })
    }

    // Simple AI-like responses
    const lowerMessage = message.toLowerCase()
    let response = ""

    if (lowerMessage.includes("цена") || lowerMessage.includes("стоимость") || lowerMessage.includes("сколько")) {
      response = "У нас три тарифа: MVP-бот от 49 000 ₽, Sales-система от 129 000 ₽, AI-автоматизация от 240 000 ₽. Точная смета после бесплатной консультации."
    } else if (lowerMessage.includes("срок") || lowerMessage.includes("время")) {
      response = "Стандартный проект запускается за 7-14 дней. Срок включает аудит, проектирование, разработку и тестирование."
    } else if (lowerMessage.includes("интеграц") || lowerMessage.includes("crm")) {
      response = "Интегрируем с Telegram, WhatsApp, Instagram, Bitrix24, amoCRM и любыми другими системами через API."
    } else if (lowerMessage.includes("пример") || lowerMessage.includes("кейс")) {
      response = "У нас есть кейсы в образовании (+42% конверсии) и B2B (-40% нагрузки на менеджеров). Могу рассказать подробнее о любом из них."
    } else if (lowerMessage.includes("заявка") || lowerMessage.includes("заказать") || lowerMessage.includes("начать")) {
      response = "Отлично! Давайте соберу информацию для менеджера. В какой сфере работает ваш бизнес? (Ритейл, Услуги, Образование, Медицина, Другое)"
    } else {
      response = "Понял вас! Передаю информацию менеджеру. Он свяжется с вами в Telegram в течение часа. Если хотите ускорить процесс — расскажите больше о вашей задаче."
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Agent API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
