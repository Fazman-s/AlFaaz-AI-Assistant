import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/chat';
import { sendMessage } from '../services/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>('');

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const sendChatMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setError(null);
    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    addMessage(userMessage);

    try {
      const response = await sendMessage(text.trim(), conversationId);
      
      if (!conversationId) {
        setConversationId(response.conversationId);
      }

      // Add bot message
      const botMessage: Message = {
        id: uuidv4(),
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      addMessage(botMessage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      // Add error message as bot response
      const errorBotMessage: Message = {
        id: uuidv4(),
        text: `Sorry, I encountered an error: ${errorMessage}`,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      addMessage(errorBotMessage);
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, addMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId('');
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage: sendChatMessage,
    clearChat,
  };
};