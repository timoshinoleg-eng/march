import { NextRequest, NextResponse } from "next/server";
import { saveMessage } from "@/lib/db";

// POST /api/chat/message - сохранение сообщения в БД (фоновое логирование)
//
// P0.8: ранее здесь было две проблемы:
//   1. catch возвращал { success: true } без status — ложный success.
//   2. Каждое user-сообщение шло в Telegram — спам менеджеру и трата квоты.
//
// Теперь: только сохранение в БД. Уведомления в Telegram идут через
// /api/lead при успешной доставке заявки (единственный путь).
// Сохранение сообщения — фоновое, не блокирует чат. Ошибки логируем,
// но не показываем пользователю (сообщение уже отображено локально).
export async function POST(req: NextRequest) {
  try {
    const { sessionId, role, content, sentiment } = await req.json();

    if (!sessionId || !role || !content) {
      return NextResponse.json(
        { success: false, error: "sessionId, role, content are required" },
        { status: 400 }
      );
    }

    await saveMessage(sessionId, role, content, sentiment);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Фоновое логирование — не блокируем чат из-за ошибки БД.
    // Но возвращаем честный статус (не ложный success).
    console.error("Save message error:", error);
    return NextResponse.json(
      { success: false, error: "Не удалось сохранить сообщение" },
      { status: 500 }
    );
  }
}
