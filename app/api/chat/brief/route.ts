import { NextRequest, NextResponse } from "next/server";
import { saveBrief } from "@/lib/db";
import { sendBriefToTelegram } from "@/lib/telegram-chat";

// POST /api/chat/brief - сохранение брифа
export async function POST(req: NextRequest) {
  try {
    const {
      sessionId,
      businessType,
      channels,
      dailyRequests,
      botTasks,
      hasExamples,
      budget,
      score,
      category,
      contactName,
      contactPhone,
      contactEmail,
    } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    // 1. СНАЧАЛА отправляем в Telegram (критично)
    try {
      await sendBriefToTelegram({
        sessionId,
        businessType,
        channels,
        dailyRequests,
        botTasks,
        hasExamples,
        budget,
        score,
        category,
        contactName,
        contactPhone,
        contactEmail,
      });
      console.log("✅ Brief sent to Telegram");
    } catch (telegramError) {
      console.error("❌ Telegram error:", telegramError);
    }

    // 2. Потом пробуем сохранить в БД (не критично)
    try {
      await saveBrief(sessionId, {
        businessType,
        channels,
        dailyRequests,
        botTasks,
        hasExamples,
        budget,
        score,
        category,
      });
      console.log("✅ Brief saved to DB");
    } catch (dbError) {
      console.log("⚠️ DB save failed (non-critical):", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save brief error:", error);
    return NextResponse.json({ success: true });
  }
}
