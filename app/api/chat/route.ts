import { NextRequest, NextResponse } from "next/server"
import { generateId } from "@/lib/utils"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, history } = body

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      )
    }

    // Simple response logic
    const lowerMessage = message.toLowerCase()
    let response = ""

    if (lowerMessage.includes("цена") || lowerMessage.includes("стоимость") || lowerMessage.includes("сколько")) {
      response = "Базовый бот — от 9 990 ₽. В стоимость входит: сценарий диалога, тексты, ветвления, передача на менеджера, интеграция с Bitrix24, Google Sheets или Webhook."
    } else if (lowerMessage.includes("срок") || lowerMessage.includes("время") || lowerMessage.includes("когда")) {
      response = "Базовый бот запускаем за 2–3 рабочих дня после согласования сценария. Сложные проекты с интеграциями — до 7 рабочих дней."
    } else if (lowerMessage.includes("интеграц") || lowerMessage.includes("crm") || lowerMessage.includes("bitrix")) {
      response = "Доступны интеграции: Bitrix24 (сделки, контакты), Google Sheets (запись в таблицы), Webhook (передача данных в любую систему)."
    } else if (lowerMessage.includes("заявк") || lowerMessage.includes("заказ") || lowerMessage.includes("звонок")) {
      response = "Отлично! Чтобы менеджер подготовил решение, расскажите: 1) В какой сфере работаете? 2) Какую задачу хотите решить? 3) Какие сроки?"
    } else {
      response = "Понял вас! Передаю информацию менеджеру. Он ответит вам в Telegram в течение часа.\n\nЕсли хотите ускорить процесс — заполните бриф: t.me/ChatBot24su_bot"
    }

    return NextResponse.json({
      id: generateId(),
      role: "assistant",
      content: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
