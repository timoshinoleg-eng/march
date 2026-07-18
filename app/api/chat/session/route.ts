import { NextRequest, NextResponse } from "next/server";
import {
  initDatabase,
  createSession,
  getSessionHistory,
} from "@/lib/db";
import {
  issueOwnerCookie,
  verifySessionOwnership,
} from "@/lib/session";

// POST /api/chat/session — создать новую сессию и выпустить owner-cookie.
//
// P0.10: сервер возвращает Set-Cookie cb24_owner = HMAC(SESSION_SECRET, sessionId).
// Cookie HttpOnly + Secure + SameSite=Lax. Без неё GET чужой сессии невозможен.
export async function POST(req: NextRequest) {
  try {
    const { sessionId, metadata } = await req.json();

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { success: false, error: "sessionId is required" },
        { status: 400 }
      );
    }

    // P0.10: минимальная sanity-проверка формата sessionId.
    // Ожидаем UUIDv4: 36 символов с дефисами, без пробелов и спецсимволов.
    // Это отбрасывает старые предсказуемые `session_${Date.now()}` значения,
    // если клиент вдруг их пришлёт.
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(sessionId)) {
      return NextResponse.json(
        {
          success: false,
          error: "Некорректный формат sessionId. Ожидается UUIDv4.",
        },
        { status: 400 }
      );
    }

    await initDatabase();

    // Извлекаем IP и UA из запроса.
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;
    const userAgent = req.headers.get("user-agent") || null;

    await createSession(sessionId, {
      ip: ip ?? undefined,
      userAgent: userAgent ?? undefined,
      referrer: metadata?.referrer || undefined,
      utmSource: metadata?.utm?.source,
      utmMedium: metadata?.utm?.medium,
      utmCampaign: metadata?.utm?.campaign,
    });

    // P0.10: выпускаем owner-cookie.
    const cookieHeader = await issueOwnerCookie(sessionId);

    const response = NextResponse.json({ success: true, sessionId });
    response.headers.set("Set-Cookie", cookieHeader["Set-Cookie"]);
    return response;
  } catch (error) {
    console.error("Chat session API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/chat/session?id=xxx — получить историю сессии.
//
// P0.10: проверяем, что запрашивающий владеет этой сессией (owner-cookie).
// Без корректного cookie возвращаем 404 (чтобы не раскрывать существование).
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("id");

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "id is required" },
        { status: 400 }
      );
    }

    // P0.10: проверка владения.
    const isOwner = await verifySessionOwnership(sessionId, req);
    if (!isOwner) {
      // Не 403, а 404 — чтобы не раскрывать факт существования чужой сессии.
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    const history = await getSessionHistory(sessionId);

    if (!history || !history.session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, ...history });
  } catch (error) {
    console.error("Get session error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
