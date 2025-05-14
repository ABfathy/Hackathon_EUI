import { defaultConfig, GeminiConfig } from './config';

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface AIResponse {
    text: string;
    model: string;
}

export interface AIRequestOptions {
    prompt: string;
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemMessage?: string;
}

export class GeminiService {
    private apiKey: string;
    private config: GeminiConfig;
    private availableModels: string[] = [];
    private modelInitialized: boolean = false;

    constructor(config: Partial<GeminiConfig> = {}) {
        this.config = { ...defaultConfig, ...config };
        this.apiKey = this.config.apiKey;

        if (!this.apiKey) {
            throw new Error('Gemini API key is required.');
        }
    }    /**
     * Initialize models - no longer fetches model list
     */
    private async initializeModels(): Promise<void> {
        if (this.modelInitialized) return;

        // Instead of fetching models from the API, we'll just use predefined models
        // This avoids unnecessary API calls that were filling the console logs
        this.availableModels = [
            'models/gemini-1.5-flash',
            'models/gemini-1.5-pro',
            'models/gemini-1.0-pro'
        ];
        
        this.modelInitialized = true;
    }    /**
     * Get the best available model
     */
    private async getBestModel(): Promise<string> {
        await this.initializeModels();

        // Simply return the preferred model - gemini-1.5-flash
        return 'models/gemini-1.5-flash';
    }

    /**
     * Send a prompt to the Gemini API and get a response
     */
    async getCompletion(options: AIRequestOptions): Promise<AIResponse> {
        const {
            prompt,
            maxTokens = this.config.maxTokens,
            temperature = this.config.temperature,
            systemMessage = 'You are a helpful assistant.'
        } = options;

        try {
            // Add artificial delay before making the API call
            await delay(3000);            // Get the best available model
            const modelToUse = await this.getBestModel();
            
            // Create the full prompt with system message
            const fullPrompt = `${systemMessage}\n\n${prompt}`;

            // Prepare the request body - using the format for Gemini 1.5
            const requestBody = {
                contents: [
                    {
                        parts: [
                            { text: fullPrompt }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: maxTokens,
                    temperature: temperature,
                }
            };

            // Determine the API version and endpoint
            const apiVersion = 'v1beta'; // Make sure we're using the latest beta
            let endpoint;

            if (modelToUse.startsWith('models/')) {
                // If it's a full model path
                endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/${modelToUse}:generateContent`;
            } else {
                // If it's just a model name
                endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelToUse}:generateContent`;
            }            // Add API key to the endpoint
            endpoint = `${endpoint}?key=${this.apiKey}`;

            // Make the API request to Gemini
            const response = await fetch(
                endpoint,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }            );

            const responseData = await response.json();

            if (!response.ok) {
                // If this is a deprecated model error, try with gemini-1.5-flash directly
                if (responseData.error?.message?.includes('deprecated')) {
                    // Try directly with gemini-1.5-flash
                    const fallbackEndpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;

                    const fallbackResponse = await fetch(
                        fallbackEndpoint,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(requestBody),
                        }
                    );                    if (!fallbackResponse.ok) {
                        const fallbackErrorData = await fallbackResponse.json();
                        throw new Error(`Gemini API error: ${fallbackErrorData.error?.message || 'Unknown error with fallback model'}`);
                    }const fallbackData = await fallbackResponse.json();

                    // Extract the text from the fallback response
                    const fallbackResponseText = fallbackData.candidates?.[0]?.content?.parts?.[0]?.text || '';

                    return {
                        text: fallbackResponseText,
                        model: 'gemini-1.5-flash',
                    };
                }

                throw new Error(`Gemini API error: ${responseData.error?.message || 'Unknown error'}`);
            }

            // Extract the text from the response
            const responseText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || '';

            return {
                text: responseText,
                model: modelToUse,
            };        } catch (error) {
            throw new Error(`Failed to get AI completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Stream a response from the Gemini API
     * Note: Gemini doesn't support true streaming, so this simulates it
     */
    async streamCompletion(options: AIRequestOptions, onChunk: (chunk: string) => void): Promise<AIResponse> {
        try {
            // Add artificial delay before making the API call
            await delay(3000);

            // First get the complete response
            const response = await this.getCompletion(options);
            const fullText = response.text;

            // Then simulate streaming by sending chunks of text
            const chunkSize = Math.max(1, Math.floor(fullText.length / 20)); // Divide into ~20 chunks
            let position = 0;

            while (position < fullText.length) {
                const end = Math.min(position + chunkSize, fullText.length);
                const chunk = fullText.substring(position, end);
                onChunk(chunk);
                position = end;

                // Add small delay between chunks to simulate streaming
                await delay(200);
            }

            return {
                text: fullText,
                model: response.model,
            };        } catch (error) {
            throw new Error(`Failed to stream AI completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
} 