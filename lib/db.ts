import { sql } from "@vercel/postgres";

// Типы для чат-сессий
export interface ChatSession {
  id: string;
  created_at: Date;
  updated_at: Date;
  ip?: string;
  user_agent?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  has_contacts: boolean;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: Date;
  sentiment?: string;
}

export interface BriefData {
  session_id: string;
  business_type?: string;
  channels?: string[];
  daily_requests?: string;
  bot_tasks?: string[];
  has_examples?: string;
  budget?: string;
  score?: number;
  category?: string;
  created_at: Date;
}

// Инициализация таблиц
export async function initDatabase() {
  try {
    // Таблица сессий чата
    await sql`
      CREATE TABLE IF NOT EXISTS chat_sessions (
        id VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip VARCHAR(45),
        user_agent TEXT,
        referrer TEXT,
        utm_source VARCHAR(255),
        utm_medium VARCHAR(255),
        utm_campaign VARCHAR(255),
        has_contacts BOOLEAN DEFAULT FALSE,
        contact_name VARCHAR(255),
        contact_phone VARCHAR(50),
        contact_email VARCHAR(255)
      )
    `;

    // Таблица сообщений
    await sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sentiment VARCHAR(20)
      )
    `;

    // Таблица брифов
    await sql`
      CREATE TABLE IF NOT EXISTS briefs (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        business_type VARCHAR(255),
        channels TEXT[],
        daily_requests VARCHAR(50),
        bot_tasks TEXT[],
        has_examples VARCHAR(255),
        budget VARCHAR(255),
        score INTEGER,
        category VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Database initialized successfully");
    return true;
  } catch (error) {
    console.error("Database initialization error:", error);
    return false;
  }
}

// Создание новой сессии
export async function createSession(
  sessionId: string,
  metadata: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
    utm?: { source?: string; medium?: string; campaign?: string };
  }
) {
  try {
    await sql`
      INSERT INTO chat_sessions (
        id, ip, user_agent, referrer, utm_source, utm_medium, utm_campaign
      ) VALUES (
        ${sessionId}, 
        ${metadata.ip || null}, 
        ${metadata.userAgent || null}, 
        ${metadata.referrer || null},
        ${metadata.utm?.source || null},
        ${metadata.utm?.medium || null},
        ${metadata.utm?.campaign || null}
      )
    `;
    return true;
  } catch (error) {
    console.error("Create session error:", error);
    return false;
  }
}

// Сохранение сообщения
export async function saveMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string,
  sentiment?: string
) {
  try {
    await sql`
      INSERT INTO chat_messages (session_id, role, content, sentiment)
      VALUES (${sessionId}, ${role}, ${content}, ${sentiment || null})
    `;
    
    // Обновляем время последней активности
    await sql`
      UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ${sessionId}
    `;
    
    return true;
  } catch (error) {
    console.error("Save message error:", error);
    return false;
  }
}

// Сохранение брифа
export async function saveBrief(sessionId: string, briefData: {
  businessType?: string;
  channels?: string[];
  dailyRequests?: string;
  botTasks?: string[];
  hasExamples?: string;
  budget?: string;
  score?: number;
  category?: string;
}) {
  try {
    await sql`
      INSERT INTO briefs (
        session_id, business_type, channels, daily_requests, 
        bot_tasks, has_examples, budget, score, category
      ) VALUES (
        ${sessionId},
        ${briefData.businessType || null},
        ${briefData.channels || null},
        ${briefData.dailyRequests || null},
        ${briefData.botTasks || null},
        ${briefData.hasExamples || null},
        ${briefData.budget || null},
        ${briefData.score || null},
        ${briefData.category || null}
      )
    `;
    return true;
  } catch (error) {
    console.error("Save brief error:", error);
    return false;
  }
}

// Обновление контактов
export async function updateContacts(
  sessionId: string,
  contacts: { name: string; phone: string; email?: string }
) {
  try {
    await sql`
      UPDATE chat_sessions 
      SET 
        has_contacts = TRUE,
        contact_name = ${contacts.name},
        contact_phone = ${contacts.phone},
        contact_email = ${contacts.email || null}
      WHERE id = ${sessionId}
    `;
    return true;
  } catch (error) {
    console.error("Update contacts error:", error);
    return false;
  }
}

// Получение полной истории сессии
export async function getSessionHistory(sessionId: string) {
  try {
    const session = await sql`
      SELECT * FROM chat_sessions WHERE id = ${sessionId}
    `;
    
    const messages = await sql`
      SELECT * FROM chat_messages 
      WHERE session_id = ${sessionId} 
      ORDER BY created_at ASC
    `;
    
    const brief = await sql`
      SELECT * FROM briefs WHERE session_id = ${sessionId}
    `;

    return {
      session: session.rows[0] || null,
      messages: messages.rows,
      brief: brief.rows[0] || null,
    };
  } catch (error) {
    console.error("Get session history error:", error);
    return null;
  }
}

// Получение статистики
export async function getStats(days: number = 7) {
  try {
    const sessions = await sql`
      SELECT 
        COUNT(*) as total_sessions,
        COUNT(CASE WHEN has_contacts THEN 1 END) as with_contacts,
        COUNT(CASE WHEN NOT has_contacts THEN 1 END) as anonymous
      FROM chat_sessions
      WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '${days} days'
    `;

    const messages = await sql`
      SELECT 
        COUNT(*) as total_messages,
        COUNT(CASE WHEN role = 'user' THEN 1 END) as user_messages,
        COUNT(CASE WHEN role = 'assistant' THEN 1 END) as bot_messages
      FROM chat_messages
      WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '${days} days'
    `;

    const briefs = await sql`
      SELECT 
        COUNT(*) as total_briefs,
        COUNT(CASE WHEN category = 'HOT' THEN 1 END) as hot_leads,
        COUNT(CASE WHEN category = 'WARM' THEN 1 END) as warm_leads,
        COUNT(CASE WHEN category = 'COLD' THEN 1 END) as cold_leads
      FROM briefs
      WHERE created_at > CURRENT_TIMESTAMP - INTERVAL '${days} days'
    `;

    return {
      sessions: sessions.rows[0],
      messages: messages.rows[0],
      briefs: briefs.rows[0],
    };
  } catch (error) {
    console.error("Get stats error:", error);
    return null;
  }
}
