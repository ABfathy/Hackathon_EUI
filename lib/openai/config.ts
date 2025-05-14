import { OpenAI } from 'openai';

// Configuration interface for OpenAI settings
export interface OpenAIConfig {
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
}

// Default configuration values
export const defaultConfig: OpenAIConfig = {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
};

// Create an OpenAI instance with the provided configuration
export const createOpenAIClient = (config: Partial<OpenAIConfig> = {}): OpenAI => {
    const mergedConfig = { ...defaultConfig, ...config };

    if (!mergedConfig.apiKey) {
        throw new Error('OpenAI API key is required. Set the OPENAI_API_KEY environment variable or provide it in the config.');
    }

    return new OpenAI({
        apiKey: mergedConfig.apiKey,
    });
}; 