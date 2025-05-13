import { useState, useCallback } from 'react';

export interface UseAIOptions {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    systemMessage?: string;
}

export interface UseAIReturn {
    response: string | null;
    isLoading: boolean;
    error: Error | null;
    streamingResponse: string | null;
    prompt: (input: string, streaming?: boolean) => Promise<string>;
    reset: () => void;
}

export interface ErrorResponse {
    error: string;
    type?: string;
    details?: string;
}

/**
 * Hook for interacting with the OpenAI API
 */
export const useAI = (options: UseAIOptions = {}): UseAIReturn => {
    const [response, setResponse] = useState<string | null>(null);
    const [streamingResponse, setStreamingResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Reset all states
    const reset = useCallback(() => {
        setResponse(null);
        setStreamingResponse(null);
        setIsLoading(false);
        setError(null);
    }, []);

    // Process API errors and create a more informative error object
    const processError = useCallback((err: any, responseData?: ErrorResponse): Error => {
        // If we have structured error data from the API
        if (responseData?.error) {
            const errorType = responseData.type || 'unknown';
            const details = responseData.details || '';
            const message = `${responseData.error}${details ? ` - ${details}` : ''}`;

            // Create an extended Error with additional properties
            const enhancedError = new Error(message);
            (enhancedError as any).type = errorType;
            (enhancedError as any).apiError = true;

            return enhancedError;
        }

        // Otherwise use the original error or create a generic one
        return err instanceof Error ? err : new Error('Unknown error occurred');
    }, []);

    /**
     * Send a prompt to the AI assistant
     */
    const prompt = useCallback(
        async (input: string, streaming = false): Promise<string> => {
            setIsLoading(true);
            setError(null);

            if (streaming) {
                setStreamingResponse('');
            } else {
                setResponse(null);
            }

            try {
                const payload = {
                    prompt: input,
                    ...options,
                    stream: streaming,
                };

                if (streaming) {
                    // Handle streaming response
                    const response = await fetch('/api/ai', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        let errorData: ErrorResponse;
                        try {
                            errorData = await response.json();
                        } catch {
                            throw new Error(`Server error: ${response.status} ${response.statusText}`);
                        }
                        throw processError(new Error(errorData.error), errorData);
                    }

                    if (!response.body) {
                        throw new Error('ReadableStream not supported');
                    }

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let accumulatedResponse = '';

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });

                        // Check if chunk starts with "Error:"
                        if (chunk.trim().startsWith('Error:')) {
                            throw new Error(chunk.trim().substring(6).trim());
                        }

                        accumulatedResponse += chunk;
                        setStreamingResponse(accumulatedResponse);
                    }

                    setResponse(accumulatedResponse);
                    setIsLoading(false);
                    return accumulatedResponse;
                } else {
                    // Handle normal response
                    const response = await fetch('/api/ai', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        let errorData: ErrorResponse;
                        try {
                            errorData = await response.json();
                        } catch {
                            throw new Error(`Server error: ${response.status} ${response.statusText}`);
                        }
                        throw processError(new Error(errorData.error), errorData);
                    }

                    const data = await response.json();
                    setResponse(data.text);
                    setIsLoading(false);
                    return data.text;
                }
            } catch (err) {
                const error = processError(err);
                setError(error);
                setIsLoading(false);
                throw error;
            }
        },
        [options, processError]
    );

    return {
        response,
        isLoading,
        error,
        streamingResponse,
        prompt,
        reset,
    };
}; 