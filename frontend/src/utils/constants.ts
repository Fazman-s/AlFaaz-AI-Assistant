export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
export const API_ENDPOINTS = {
  CHAT_MESSAGE: '/api/chat/message',
  HEALTH: '/health'
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please enter a valid message.',
  QUOTA_EXCEEDED: 'API quota exceeded. Please try again later.',
  CONTENT_BLOCKED: 'Content was blocked. Please rephrase your message.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
} as const;