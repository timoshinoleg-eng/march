import { NextRequest, NextResponse } from "next/server";
import { getStats, getSessionHistory } from "@/lib/db";

// GET /api/admin/stats - получение статистики
export async function GET(req: NextRequest) {
  try {
    // Simple auth check - check for admin secret in header
    const adminSecret = req.headers.get("x-admin-secret");
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "7");
    const sessionId = searchParams.get("sessionId");

    // If sessionId provided - return session history
    if (sessionId) {
      const history = await getSessionHistory(sessionId);
      return NextResponse.json(history);
    }

    // Otherwise return stats
    const stats = await getStats(days);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
