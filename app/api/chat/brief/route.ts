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

    // Сохраняем бриф в базу
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

    // Отправляем в Telegram
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save brief error:", error);
    return NextResponse.json({ success: true }); // Silent fail
  }
}
