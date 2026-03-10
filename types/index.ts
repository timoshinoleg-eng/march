// Chat Widget Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

export interface LeadData {
  name?: string;
  phone?: string;
  telegram?: string;
  email?: string;
  company?: string;
  niche?: string;
  painPoints?: string[];
  budget?: string;
  timeline?: string;
}

export interface ConversationContext {
  stage: 'welcome' | 'qualifying' | 'proposal' | 'lead_form' | 'closed';
  leadData: LeadData;
  messages: Message[];
  lastInteraction: Date;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export interface KnowledgeBaseItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  relatedQuestions?: string[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface ProposalData {
  companyName: string;
  niche: string;
  services: string[];
  estimatedPrice: string;
  timeline: string;
}

export type ChatMode = 'ai' | 'sales' | 'support';
