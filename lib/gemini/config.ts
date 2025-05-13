// Configuration for Google's Gemini AI model

// Hard-coded API key
const GEMINI_API_KEY = 'AIzaSyCynP85qCfLP5B6l0xDAKJ4R5kmWvqPYfU';

// Configuration interface for Gemini settings
export interface GeminiConfig {
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
}

// Default configuration values
export const defaultConfig: GeminiConfig = {
    apiKey: process.env.GEMINI_API_KEY || GEMINI_API_KEY,
    model: 'gemini-1.5-flash',
    maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '1000', 10),
    temperature: parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
}; 