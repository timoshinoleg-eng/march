/**
 * Shared analytics store
 * In-memory storage for chat sessions (use database in production)
 */

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

// In-memory store
export const chatSessions: ChatSession[] = [];

// Helper functions
export function addChatSession(session: ChatSession) {
  chatSessions.push(session);
}

export function getChatSession(id: string) {
  return chatSessions.find(s => s.id === id);
}

export function updateChatSession(id: string, updates: Partial<ChatSession>) {
  const session = chatSessions.find(s => s.id === id);
  if (session) {
    Object.assign(session, updates);
  }
  return session;
}
