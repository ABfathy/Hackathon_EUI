import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini/service';

// Rate limiting
const RATE_LIMIT_WINDOW = 15000; // 15 seconds
let lastRequestTimestamp = 0;

// Initialize the Gemini service with API key
let aiService: GeminiService;

try {
    aiService = new GeminiService();
    console.log("Gemini service initialized");
} catch (error) {
    console.error('Failed to initialize Gemini service:', error);
    // We'll handle this in the API route
}

export async function POST(req: NextRequest) {
    try {
        // Check if service was initialized
        if (!aiService) {
            return NextResponse.json(
                {
                    error: 'Gemini service not initialized. API key may be invalid or missing.',
                    type: 'api_key_error'
                },
                { status: 500 }
            );
        }

        // Rate limiting check
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTimestamp;

        if (timeSinceLastRequest < RATE_LIMIT_WINDOW) {
            return NextResponse.json(
                {
                    error: `Sending requests too quickly. Please wait ${Math.ceil((RATE_LIMIT_WINDOW - timeSinceLastRequest) / 1000)} seconds.`,
                    type: 'rate_limit_error'
                },
                { status: 429 }
            );
        }

        lastRequestTimestamp = now;

        const { prompt, maxTokens, temperature, systemMessage, stream } = await req.json();
        console.log(`Received request: prompt="${prompt.substring(0, 30)}...", stream=${stream}`);

        // Validate the request
        if (!prompt) {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // If streaming is requested
        if (stream) {
            try {
                // Set up streaming response
                const encoder = new TextEncoder();
                const customReadable = new ReadableStream({
                    async start(controller) {
                        try {
                            console.log("Starting stream response");
                            await aiService.streamCompletion(
                                {
                                    prompt,
                                    maxTokens,
                                    temperature,
                                    systemMessage
                                },
                                (chunk) => {
                                    controller.enqueue(encoder.encode(chunk));
                                }
                            );
                            controller.close();
                        } catch (error) {
                            // Handle specific error cases
                            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                            console.error("Streaming error:", errorMessage);

                            if (errorMessage.toLowerCase().includes('quota')) {
                                controller.enqueue(encoder.encode('Error: API quota exceeded. Please check the API key.'));
                            } else if (errorMessage.toLowerCase().includes('api key')) {
                                controller.enqueue(encoder.encode('Error: API key issue. Please check the API key.'));
                            } else {
                                controller.enqueue(encoder.encode(`Error: ${errorMessage}`));
                            }

                            controller.close();
                        }
                    },
                });

                return new NextResponse(customReadable, {
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'Transfer-Encoding': 'chunked',
                    },
                });
            } catch (error) {
                console.error("Stream setup error:", error);
                return NextResponse.json(
                    {
                        error: error instanceof Error ? error.message : 'Stream setup failed',
                        type: 'stream_error'
                    },
                    { status: 500 }
                );
            }
        }

        // Regular non-streaming response
        try {
            console.log("Starting non-stream response");
            const response = await aiService.getCompletion({
                prompt,
                maxTokens,
                temperature,
                systemMessage,
            });

            console.log(`Response received from model: ${response.model}`);
            return NextResponse.json(response);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error("Non-streaming error:", errorMessage);

            // Determine error type for better client-side handling
            let errorType = 'unknown_error';
            if (errorMessage.toLowerCase().includes('quota')) {
                errorType = 'quota_exceeded';
            } else if (errorMessage.toLowerCase().includes('api key') || errorMessage.toLowerCase().includes('authentication')) {
                errorType = 'api_key_error';
            } else if (errorMessage.toLowerCase().includes('model')) {
                errorType = 'model_error';
            } else if (errorMessage.toLowerCase().includes('rate') || errorMessage.toLowerCase().includes('limit')) {
                errorType = 'rate_limit_error';
            }

            return NextResponse.json(
                {
                    error: errorMessage,
                    type: errorType,
                    details: 'Please check your Gemini API key configuration.'
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'An unknown error occurred',
                type: 'server_error'
            },
            { status: 500 }
        );
    }
} 