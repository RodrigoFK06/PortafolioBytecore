// types/chatbot.ts
export interface ChatMessage {
  role: 'user' | 'assistant'
  message: string
  timestamp: Date
}

export interface Lead {
  id: string
  sessionId: string
  name?: string
  email?: string
  company?: string
  phone?: string
  projectType?: string
  budget?: string
  timeline?: string
  status: 'qualifying' | 'interested' | 'ready' | 'converted'
  conversation: ChatMessage[]
  score: number
  createdAt: Date
  updatedAt: Date
}

export interface ChatbotResponse {
  success: boolean
  response: string
  shouldCollectContact: boolean
  suggestedActions: string[]
  leadScore?: number
  error?: string
}

export interface LeadAnalysis {
  status: Lead['status']
  score: number
  insights: string[]
  nextActions: string[]
}

export interface ExtractedInfo {
  name?: string
  email?: string
  phone?: string
  company?: string
  projectType?: string
  budget?: string
  timeline?: string
}

export interface ChatbotConfig {
  enabled: boolean
  model: string
  maxTokens: number
  temperature: number
  apiKey: string
}
