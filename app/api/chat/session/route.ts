import { NextRequest, NextResponse } from "next/server";
import { 
  initDatabase, 
  createSession, 
  saveMessage, 
  saveBrief, 
  updateContacts,
  getSessionHistory 
} from "@/lib/db";

// POST /api/chat/session - создание новой сессии
export async function POST(req: NextRequest) {
  try {
    const { sessionId, metadata } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    // Инициализируем БД если нужно
    await initDatabase();

    // Создаем сессию
    const success = await createSession(sessionId, metadata || {});

    if (!success) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    console.error("Chat session API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/chat/session?id=xxx - получение истории сессии
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const history = await getSessionHistory(sessionId);

    if (!history) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(history);
  } catch (error) {
    console.error("Get session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
