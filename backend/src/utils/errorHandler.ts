import { Request, Response } from 'express';
import { ErrorResponse } from '../types/chat';

export class AppError extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: Function
) => {
  console.error('Error:', error);

  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const code = error instanceof AppError ? error.code : 'INTERNAL_ERROR';

  const errorResponse: ErrorResponse = {
    error: error.message || 'Internal server error',
    code,
    timestamp: new Date()
  };

  res.status(statusCode).json(errorResponse);
};