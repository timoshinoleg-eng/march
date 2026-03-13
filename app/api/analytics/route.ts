/**
 * Analytics API Route
 * Tracks chat events for internal analytics (without admin panel)
 */

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// In-memory analytics store
export interface ChatSession {
  id: string;
  startTime: number;
  endTime?: number;
  messages: number;
  convertedToLead: boolean;
  sentiment: string;
  score?: number;
  userId?: string;
  pageUrl?: string;
  source?: string;
}

// Shared in-memory store
export const chatSessions: ChatSession[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, data } = body;

    switch (event) {
      case "chat_start":
        chatSessions.push({
          id: data.sessionId || Date.now().toString(),
          startTime: Date.now(),
          messages: 0,
          convertedToLead: false,
          sentiment: "NEUTRAL",
          userId: data.userId,
          pageUrl: data.page,
          source: data.source,
        });
        break;

      case "chat_message":
        const session = chatSessions.find(s => s.id === data.sessionId);
        if (session) {
          session.messages++;
          if (data.sentiment) {
            session.sentiment = data.sentiment;
          }
        }
        break;

      case "lead_created":
        const leadSession = chatSessions.find(s => s.id === data.sessionId);
        if (leadSession) {
          leadSession.convertedToLead = true;
          leadSession.score = data.score;
        }
        break;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Analytics POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Simple stats endpoint (for internal use, not admin panel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d";

    const now = Date.now();
    let startTime = now;
    
    switch (period) {
      case "24h":
        startTime = now - 24 * 60 * 60 * 1000;
        break;
      case "7d":
        startTime = now - 7 * 24 * 60 * 60 * 1000;
        break;
      case "30d":
        startTime = now - 30 * 24 * 60 * 60 * 1000;
        break;
    }

    const filteredSessions = chatSessions.filter(s => s.startTime >= startTime);

    const stats = {
      totalChats: filteredSessions.length,
      totalLeads: filteredSessions.filter(s => s.convertedToLead).length,
      avgMessages: filteredSessions.length > 0 
        ? filteredSessions.reduce((acc, s) => acc + s.messages, 0) / filteredSessions.length 
        : 0,
      hotLeads: filteredSessions.filter(s => s.score && s.score >= 70).length,
      warmLeads: filteredSessions.filter(s => s.score && s.score >= 40 && s.score < 70).length,
      coldLeads: filteredSessions.filter(s => !s.score || s.score < 40).length,
      period,
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
