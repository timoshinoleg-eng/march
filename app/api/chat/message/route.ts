import { NextRequest, NextResponse } from "next/server";
import { saveMessage } from "@/lib/db";
import { sendChatToTelegram } from "@/lib/telegram-chat";

// POST /api/chat/message - сохранение сообщения
export async function POST(req: NextRequest) {
  try {
    const { sessionId, role, content, sentiment } = await req.json();

    if (!sessionId || !role || !content) {
      return NextResponse.json(
        { error: "sessionId, role, content are required" },
        { status: 400 }
      );
    }

    // Сохраняем в базу
    await saveMessage(sessionId, role, content, sentiment);

    // Отправляем в Telegram (только user сообщения для избежания спама)
    if (role === "user") {
      await sendChatToTelegram({
        sessionId,
        role,
        content,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save message error:", error);
    // Не возвращаем ошибку клиенту — просто логируем
    return NextResponse.json({ success: true });
  }
}
