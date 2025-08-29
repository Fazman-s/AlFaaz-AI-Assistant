import { GoogleGenerativeAI } from '@google/generative-ai';
import { AppError } from '../utils/errorHandler';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      console.warn('⚠️ Gemini API key not configured. Using mock responses.');
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      // FIX: Updated the model name to a current, supported version
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      console.log('✅ Gemini service initialized successfully with gemini-1.5-flash');
    } catch (error) {
      console.error('❌ Failed to initialize Gemini service:', error);
    }
  }

  async generateResponse(message: string): Promise<string> {
    if (!this.model) {
      console.log('🤖 Using mock response (API key not configured)');
      return `Hello! This is a mock response because the Gemini API key is not configured. You said: "${message}".`;
    }

    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Gemini API Error:', error);

      if (error.message?.includes('quota')) {
        throw new AppError('API quota exceeded. Please try again later.', 429, 'QUOTA_EXCEEDED');
      }
      if (error.message?.includes('blocked')) {
        throw new AppError('Content was blocked due to safety concerns. Please rephrase your message.', 400, 'CONTENT_BLOCKED');
      }
      if (error.message?.includes('API key')) {
        throw new AppError('Invalid Gemini API key.', 401, 'AUTH_ERROR');
      }
      // Catch the specific 404 error for model not found
      if (error.status === 404) {
          throw new AppError('The specified AI model was not found. Please check the model name.', 404, 'MODEL_NOT_FOUND');
      }
      throw new AppError('Failed to generate response from AI service.', 500, 'AI_SERVICE_ERROR');
    }
  }
}

export default new GeminiService();
