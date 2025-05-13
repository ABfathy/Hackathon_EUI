"use client";

import { useState, useRef, useEffect } from 'react';
import { useAI } from '@/hooks/useAI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, SendIcon, RefreshCw, AlertCircle } from 'lucide-react';

interface AIAssistantProps {
    title?: string;
    systemMessage?: string;
    placeholder?: string;
}

export default function AIAssistant({
    title = "AI Assistant",
    systemMessage = "You are a helpful assistant. Provide concise and accurate information.",
    placeholder = "Ask me anything..."
}: AIAssistantProps) {
    const [input, setInput] = useState('');
    const [useStreaming, setUseStreaming] = useState(true);
    const [apiKeyError, setApiKeyError] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const {
        response,
        streamingResponse,
        isLoading,
        error,
        prompt,
        reset
    } = useAI({
        systemMessage,
        model: 'gpt-3.5-turbo', // Using the more widely available model
        temperature: 0.7,
        maxTokens: 1000
    });

    // Auto-scroll to bottom when new responses come in
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [response, streamingResponse]);

    // Check if error is related to API key
    useEffect(() => {
        if (error) {
            const errorMessage = error.message.toLowerCase();
            if (
                errorMessage.includes('api key') ||
                errorMessage.includes('authentication') ||
                errorMessage.includes('quota') ||
                errorMessage.includes('access')
            ) {
                setApiKeyError(true);
            }
        }
    }, [error]);

    const handleSubmit = async () => {
        if (!input.trim() || isLoading) return;

        try {
            setApiKeyError(false);
            await prompt(input, useStreaming);
            setInput('');
        } catch (err) {
            console.error('Error getting AI response:', err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Card className="w-full max-w-3xl shadow-lg">
            <CardHeader className="bg-purple-50 dark:bg-purple-950">
                <div className="flex items-center gap-2">
                    <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                        <Bot className="h-5 w-5 text-purple-600" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                </div>
            </CardHeader>

            <CardContent className="pt-6 pb-2">
                {apiKeyError && (
                    <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
                            <AlertCircle className="h-5 w-5" />
                            <h3 className="font-semibold">OpenAI API Key Issue</h3>
                        </div>
                        <p className="text-sm text-amber-600 dark:text-amber-300">
                            There's an issue with the OpenAI API key. The administrator needs to set up a valid API key.
                            Please check the <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">lib/openai/SETUP.md</code> file for instructions.
                        </p>
                    </div>
                )}

                <div className="min-h-[200px] max-h-[400px] overflow-y-auto space-y-4 p-1">
                    {(response || streamingResponse) && (
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="whitespace-pre-wrap">
                                {useStreaming ? streamingResponse : response}
                            </p>
                        </div>
                    )}

                    {error && !apiKeyError && (
                        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-600 dark:text-red-300">
                            <p>Error: {error.message}</p>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
                <div className="w-full flex items-center space-x-2">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="flex-1 resize-none"
                        rows={2}
                        disabled={isLoading}
                    />
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading || !input.trim()}
                            size="icon"
                            className="rounded-full bg-purple-600 hover:bg-purple-700"
                        >
                            {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
                        </Button>

                        <Button
                            onClick={reset}
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            title="Reset conversation"
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                    <label className="flex items-center space-x-1 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={useStreaming}
                            onChange={() => setUseStreaming(!useStreaming)}
                            className="rounded"
                        />
                        <span>Stream response</span>
                    </label>
                    <span>Powered by OpenAI</span>
                </div>
            </CardFooter>
        </Card>
    );
} 