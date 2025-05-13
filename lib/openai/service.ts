import { OpenAI } from 'openai';
import { createOpenAIClient, OpenAIConfig } from './config';

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface AIResponse {
    text: string;
    model: string;
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
}

export interface AIRequestOptions {
    prompt: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemMessage?: string;
}

export class OpenAIService {
    private client: OpenAI;
    private config: OpenAIConfig;

    constructor(config: Partial<OpenAIConfig> = {}) {
        this.client = createOpenAIClient(config);
        this.config = { ...require('./config').defaultConfig, ...config };
    }

    /**
     * Send a prompt to the OpenAI API and get a response
     */
    async getCompletion(options: AIRequestOptions): Promise<AIResponse> {
        const {
            prompt,
            model = 'gpt-3.5-turbo',
            maxTokens = this.config.maxTokens,
            temperature = this.config.temperature,
            systemMessage = 'You are a helpful assistant.'
        } = options;

        try {
            // Add artificial delay before making the API call
            await delay(3000);

            const response = await this.client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: prompt }
                ],
                max_tokens: maxTokens,
                temperature,
            });

            const result: AIResponse = {
                text: response.choices[0]?.message?.content || '',
                model: response.model,
                promptTokens: response.usage?.prompt_tokens,
                completionTokens: response.usage?.completion_tokens,
                totalTokens: response.usage?.total_tokens,
            };

            return result;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw new Error(`Failed to get AI completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Stream a response from the OpenAI API
     */
    async streamCompletion(options: AIRequestOptions, onChunk: (chunk: string) => void): Promise<AIResponse> {
        const {
            prompt,
            model = 'gpt-3.5-turbo',
            maxTokens = this.config.maxTokens,
            temperature = this.config.temperature,
            systemMessage = 'You are a helpful assistant.'
        } = options;

        try {
            // Add artificial delay before making the API call
            await delay(3000);

            const stream = await this.client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: prompt }
                ],
                max_tokens: maxTokens,
                temperature,
                stream: true,
            });

            let fullText = '';

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                    fullText += content;
                    onChunk(content);
                }

                // Add small delay between chunks
                await delay(200);
            }

            return {
                text: fullText,
                model,
            };
        } catch (error) {
            console.error('Error streaming from OpenAI API:', error);
            throw new Error(`Failed to stream AI completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
} 