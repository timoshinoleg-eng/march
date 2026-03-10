import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      name, 
      phone, 
      telegram, 
      email, 
      company, 
      niche, 
      leadsPerDay,
      channels,
      tasks,
      budget,
      source = "website",
      conversationHistory 
    } = body

    if (!phone && !telegram && !email) {
      return NextResponse.json(
        { error: "Phone or Telegram or Email required" },
        { status: 400 }
      )
    }

    // AI Scoring
    let score = "WARM"
    let scoreValue = 50

    // HOT criteria
    if (
      budget?.includes("200") || 
      leadsPerDay > 50 || 
      (niche && ["медицина", "недвижимость", "консалтинг"].some(n => niche.toLowerCase().includes(n)))
    ) {
      score = "HOT"
      scoreValue = 80
    }
    // COLD criteria
    else if (
      budget?.includes("до 50") || 
      (leadsPerDay && leadsPerDay < 10)
    ) {
      score = "COLD"
      scoreValue = 30
    }

    const leadData = {
      id: `lead_${Date.now()}`,
      name,
      phone,
      telegram,
      email,
      company,
      niche,
      leadsPerDay,
      channels,
      tasks,
      budget,
      source,
      score,
      scoreValue,
      conversationHistory,
      createdAt: new Date().toISOString(),
    }

    console.log("New lead received:", leadData)

    // Here you would send to Bitrix24, Telegram, etc.
    
    return NextResponse.json({
      success: true,
      leadId: leadData.id,
      score,
      scoreValue,
      message: "Lead created successfully",
    })
  } catch (error) {
    console.error("Lead API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
