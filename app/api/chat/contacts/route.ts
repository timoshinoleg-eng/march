import { NextRequest, NextResponse } from "next/server";
import { updateContacts } from "@/lib/db";

// POST /api/chat/contacts - обновление контактов в сессии
export async function POST(req: NextRequest) {
  try {
    const { sessionId, name, phone, email } = await req.json();

    if (!sessionId || !name || !phone) {
      return NextResponse.json(
        { error: "sessionId, name, phone are required" },
        { status: 400 }
      );
    }

    const success = await updateContacts(sessionId, { name, phone, email });

    if (!success) {
      return NextResponse.json(
        { error: "Failed to update contacts" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update contacts error:", error);
    return NextResponse.json({ success: true }); // Silent fail
  }
}
