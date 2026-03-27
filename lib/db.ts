import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Инициализация таблиц
export async function initDatabase() {
  try {
    await query(`
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
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        sentiment VARCHAR(20)
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS briefs (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) REFERENCES chat_sessions(id) ON DELETE CASCADE,
        business_type VARCHAR(100),
        channels JSONB,
        daily_requests VARCHAR(50),
        bot_tasks JSONB,
        has_examples VARCHAR(20),
        budget VARCHAR(100),
        score INTEGER,
        category VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`CREATE INDEX IF NOT EXISTS idx_sessions_created ON chat_sessions(created_at)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_messages_session ON chat_messages(session_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_briefs_session ON briefs(session_id)`);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Создать сессию
export async function createSession(
  sessionId: string,
  data: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }
): Promise<void> {
  await query(
    `INSERT INTO chat_sessions (id, ip, user_agent, referrer, utm_source, utm_medium, utm_campaign)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (id) DO NOTHING`,
    [sessionId, data.ip || null, data.userAgent || null, data.referrer || null,
     data.utmSource || null, data.utmMedium || null, data.utmCampaign || null]
  );
}

// Сохранить сообщение
export async function saveMessage(
  sessionId: string,
  role: string,
  content: string,
  sentiment?: string
): Promise<void> {
  await query(
    `INSERT INTO chat_messages (session_id, role, content, sentiment)
     VALUES ($1, $2, $3, $4)`,
    [sessionId, role, content, sentiment || null]
  );
  await query(
    `UPDATE chat_sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
    [sessionId]
  );
}

// Обновить контакты
export async function updateContacts(
  sessionId: string,
  data: {
    name: string;
    phone: string;
    email?: string;
  }
): Promise<void> {
  await query(
    `UPDATE chat_sessions 
     SET has_contacts = TRUE, 
         contact_name = $1, 
         contact_phone = $2, 
         contact_email = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4`,
    [data.name, data.phone, data.email || null, sessionId]
  );
}

// Сохранить бриф
export async function saveBrief(
  sessionId: string,
  data: {
    businessType: string;
    channels: string[];
    dailyRequests: string;
    botTasks: string[];
    hasExamples: string;
    budget: string;
    score: number;
    category: string;
  }
): Promise<void> {
  await query(
    `INSERT INTO briefs (session_id, business_type, channels, daily_requests, bot_tasks, has_examples, budget, score, category)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (session_id) DO UPDATE SET
       business_type = EXCLUDED.business_type,
       channels = EXCLUDED.channels,
       daily_requests = EXCLUDED.daily_requests,
       bot_tasks = EXCLUDED.bot_tasks,
       has_examples = EXCLUDED.has_examples,
       budget = EXCLUDED.budget,
       score = EXCLUDED.score,
       category = EXCLUDED.category`,
    [sessionId, data.businessType, JSON.stringify(data.channels), data.dailyRequests,
     JSON.stringify(data.botTasks), data.hasExamples, data.budget, data.score, data.category]
  );
}

// Получить статистику
export async function getStats(days?: number): Promise<any> {
  let dateFilter = '';
  const params: any[] = [];
  
  if (days) {
    dateFilter = 'WHERE created_at >= NOW() - INTERVAL \'$1 days\'';
    params.push(days);
  }
  
  const sessionsResult = await query(`SELECT COUNT(*) as total FROM chat_sessions ${dateFilter}`, params);
  const messagesResult = await query(`SELECT COUNT(*) as total FROM chat_messages ${dateFilter}`, params);
  const briefsResult = await query(`SELECT COUNT(*) as total FROM briefs ${dateFilter}`, params);
  
  let contactsQuery = 'SELECT COUNT(*) as total FROM chat_sessions WHERE has_contacts = TRUE';
  if (days) {
    contactsQuery += ' AND created_at >= NOW() - INTERVAL \'$1 days\'';
  }
  const contactsResult = await query(contactsQuery, days ? params : []);

  return {
    totalSessions: parseInt(sessionsResult.rows[0].total),
    totalMessages: parseInt(messagesResult.rows[0].total),
    totalBriefs: parseInt(briefsResult.rows[0].total),
    totalContacts: parseInt(contactsResult.rows[0].total),
  };
}

// Получить историю сессии
export async function getSessionHistory(sessionId: string) {
  const sessionResult = await query(
    `SELECT * FROM chat_sessions WHERE id = $1`,
    [sessionId]
  );
  
  const messagesResult = await query(
    `SELECT * FROM chat_messages WHERE session_id = $1 ORDER BY created_at ASC`,
    [sessionId]
  );
  
  const briefResult = await query(
    `SELECT * FROM briefs WHERE session_id = $1`,
    [sessionId]
  );

  const brief = briefResult.rows[0] ? {
    ...briefResult.rows[0],
    channels: briefResult.rows[0].channels ? briefResult.rows[0].channels : null,
    bot_tasks: briefResult.rows[0].bot_tasks ? briefResult.rows[0].bot_tasks : null,
  } : null;

  return {
    session: sessionResult.rows[0] || null,
    messages: messagesResult.rows,
    brief,
  };
}

export default pool;
