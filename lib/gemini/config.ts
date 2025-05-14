
// Configuration interface for Gemini settings
export interface GeminiConfig {
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
}

// Default configuration values
export const defaultConfig: GeminiConfig = {
    apiKey: process.env.GEMINI_API_KEY || "",
    model: 'gemini-1.5-flash',
    maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS || '1000', 10),
    temperature: parseFloat(process.env.GEMINI_TEMPERATURE || '0.7'),
}; 