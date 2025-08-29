import axios from 'axios';
import { ChatResponse, ErrorResponse } from '../types/chat';
import { API_BASE_URL, API_ENDPOINTS, ERROR_MESSAGES } from '../utils/constants';

const chatApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
chatApi.interceptors.request.use(
  (config) => {
    console.log('Sending request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
chatApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.code === 'NETWORK_ERROR' || !error.response) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
    
    const errorData: ErrorResponse = error.response.data;
    
    switch (errorData.code) {
      case 'QUOTA_EXCEEDED':
        throw new Error(ERROR_MESSAGES.QUOTA_EXCEEDED);
      case 'CONTENT_BLOCKED':
        throw new Error(ERROR_MESSAGES.CONTENT_BLOCKED);
      case 'VALIDATION_ERROR':
        throw new Error(ERROR_MESSAGES.VALIDATION_ERROR);
      default:
        throw new Error(errorData.error || ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  }
);

export const sendMessage = async (
  message: string, 
  conversationId?: string
): Promise<ChatResponse> => {
  const response = await chatApi.post<ChatResponse>(API_ENDPOINTS.CHAT_MESSAGE, {
    message,
    conversationId,
  });
  return response.data;
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    await chatApi.get(API_ENDPOINTS.HEALTH);
    return true;
  } catch {
    return false;
  }
};