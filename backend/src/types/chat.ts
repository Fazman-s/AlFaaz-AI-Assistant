export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: string;
  conversationId: string;
  success: boolean;
  error?: string;
}

export interface ErrorResponse {
  error: string;
  code: string;
  timestamp: Date;
}