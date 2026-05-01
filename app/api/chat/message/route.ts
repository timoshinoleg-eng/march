import { NextRequest, NextResponse } from "next/server";
import { initDatabase, saveMessage } from "@/lib/db";
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

    // Сначала дублируем в Telegram, чтобы БД не блокировала уведомления.
    if (role === "user") {
      try {
        await sendChatToTelegram({
          sessionId,
          role,
          content,
        });
      } catch (telegramError) {
        console.error("Telegram message relay error:", telegramError);
      }
    }

    // Потом пробуем сохранить в БД.
    try {
      await initDatabase();
      await saveMessage(sessionId, role, content, sentiment);
    } catch (dbError) {
      console.error("Database message save error:", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save message error:", error);
    // Не возвращаем ошибку клиенту — просто логируем
    return NextResponse.json({ success: true });
  }
}
