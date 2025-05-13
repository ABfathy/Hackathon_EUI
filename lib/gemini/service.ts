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
    }

    /**
     * Check and initialize available models
     */
    private async initializeModels(): Promise<void> {
        if (this.modelInitialized) return;

        try {
            console.log("Listing available Gemini models...");
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to list models:", errorData);
                throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error listing models'}`);
            }

            const data = await response.json();
            console.log("Available models:", data);

            this.availableModels = data.models?.map((model: any) => model.name) || [];
            this.modelInitialized = true;

            console.log("Available model names:", this.availableModels);
        } catch (error) {
            console.error("Error initializing models:", error);
            // Continue even if model listing fails - we'll use the default model
        }
    }

    /**
     * Get the best available model
     */
    private async getBestModel(): Promise<string> {
        await this.initializeModels();

        // If we have models listed, try to find gemini-1.5-flash or closest match
        if (this.availableModels.length > 0) {
            // Try best matches first
            if (this.availableModels.includes('models/gemini-1.5-flash')) {
                return 'models/gemini-1.5-flash';
            }

            // Try other gemini 1.5 models
            const gemini15Model = this.availableModels.find(model => model.includes('gemini-1.5'));
            if (gemini15Model) {
                return gemini15Model;
            }

            // Try any gemini model as last resort
            const geminiModel = this.availableModels.find(model => model.includes('gemini'));
            if (geminiModel) {
                return geminiModel;
            }
        }

        // Fall back to default
        return 'gemini-1.5-flash';
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
            await delay(3000);

            // Get the best available model
            const modelToUse = await this.getBestModel();
            console.log(`Using model: ${modelToUse}`);

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
            }

            // Add API key to the endpoint
            endpoint = `${endpoint}?key=${this.apiKey}`;

            console.log(`Making API request to: ${endpoint}`);

            // Make the API request to Gemini
            const response = await fetch(
                endpoint,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            const responseData = await response.json();
            console.log("API Response:", responseData);

            if (!response.ok) {
                // If this is a deprecated model error, try with gemini-1.5-flash directly
                if (responseData.error?.message?.includes('deprecated')) {
                    console.log("Detected deprecated model error, retrying with gemini-1.5-flash");

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
                    );

                    if (!fallbackResponse.ok) {
                        const fallbackErrorData = await fallbackResponse.json();
                        console.error("Fallback request also failed:", fallbackErrorData);
                        throw new Error(`Gemini API error: ${fallbackErrorData.error?.message || 'Unknown error with fallback model'}`);
                    }

                    const fallbackData = await fallbackResponse.json();
                    console.log("Fallback API Success Response:", fallbackData);

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
            };
        } catch (error) {
            console.error('Error calling Gemini API:', error);
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
            };
        } catch (error) {
            console.error('Error streaming from Gemini API:', error);
            throw new Error(`Failed to stream AI completion: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
} 