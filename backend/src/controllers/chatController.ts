import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import geminiService from '../services/geminiService';
import { ChatRequest, ChatResponse } from '../types/chat';
import { AppError } from '../utils/errorHandler';

export const sendMessage = async (
  req: Request<{}, ChatResponse, ChatRequest>,
  res: Response<ChatResponse>,
  next: NextFunction
) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || message.trim().length === 0) {
      throw new AppError('Message is required', 400, 'VALIDATION_ERROR');
    }

    if (message.length > 1000) {
      throw new AppError('Message is too long. Maximum 1000 characters allowed.', 400, 'MESSAGE_TOO_LONG');
    }

    const botResponse = await geminiService.generateResponse(message);
    const responseConversationId = conversationId || uuidv4();

    const response: ChatResponse = {
      message: botResponse,
      conversationId: responseConversationId,
      success: true
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};