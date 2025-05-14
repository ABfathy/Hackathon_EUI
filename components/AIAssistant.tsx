"use client";

import { useState, useRef, useEffect } from 'react';
import { useAI } from '@/hooks/useAI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, SendIcon, RefreshCw, AlertCircle, User, Copy, Check, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface AIAssistantProps {
    title?: string;
    systemMessage?: string;
    placeholder?: string;
    initialQuery?: string;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const aiChatStyles = `
.chat-container::-webkit-scrollbar {
  width: 8px;
}

.chat-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.chat-container::-webkit-scrollbar-thumb {
  background: rgba(128, 90, 213, 0.3);
  border-radius: 10px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 90, 213, 0.5);
}

/* Message styling */
.message-content {
  line-height: 1.6;
}

.message-content pre {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
  margin: 8px 0;
}

.message-content code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.9em;
}

.message-content ul, 
.message-content ol {
  padding-left: 20px;
  margin: 8px 0;
}

.message-content ul li,
.message-content ol li {
  margin-bottom: 4px;
}

.message-content a {
  color: #805AD5;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

.message-content a:hover {
  text-decoration-thickness: 2px;
}

/* Dark mode adjustments */
.dark .message-content pre {
  background-color: rgba(0, 0, 0, 0.3);
}

.dark .message-content code {
  background-color: rgba(0, 0, 0, 0.3);
}

/* RTL support for Arabic */
[dir="rtl"] .chat-container {
  text-align: right;
}

[dir="rtl"] .message-content ul,
[dir="rtl"] .message-content ol {
  padding-right: 20px;
  padding-left: 0;
}
`;

export default function AIAssistant({
    title = "AI Assistant",
    systemMessage = "You are a helpful assistant. Provide concise and accurate information.",
    placeholder = "Ask me anything...",
    initialQuery = ""
}: AIAssistantProps) {
    const [input, setInput] = useState(initialQuery);
    const [useStreaming, setUseStreaming] = useState(true);
    const [apiKeyError, setApiKeyError] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const {
        response,
        streamingResponse,
        isLoading,
        error,
        prompt,
        reset: resetAI
    } = useAI({
        systemMessage,
        model: 'gpt-3.5-turbo', // Using the more widely available model
        temperature: 0.7,
        maxTokens: 1000
    });

    // Handle changes to initialQuery prop
    useEffect(() => {
        if (initialQuery) {
            setInput(initialQuery);
            // Focus on the input when a suggested question is selected
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [initialQuery]);

    // Auto-scroll to bottom when new responses come in
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, streamingResponse, response]);

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

    // Add user message to chat when prompted
    useEffect(() => {
        const responseText = useStreaming ? streamingResponse : response;
        
        if (responseText && !isLoading) {
            // Check if we already have this response in the messages
            const existingResponseMessage = messages.find(
                m => m.role === 'assistant' && m.content === responseText
            );
            
            if (!existingResponseMessage) {
                const aiMessage: ChatMessage = {
                    id: `assistant-${Date.now()}`,
                    role: 'assistant',
                    content: responseText,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMessage]);
            }
        }
    }, [response, streamingResponse, isLoading, useStreaming, messages]);

    const handleSubmit = async () => {
        if (!input.trim() || isLoading) return;

        try {
            const userMessage: ChatMessage = {
                id: `user-${Date.now()}`,
                role: 'user',
                content: input,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, userMessage]);
            setApiKeyError(false);
            
            const userInput = input;
            setInput('');
            
            await prompt(userInput, useStreaming);
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

    const resetChat = () => {
        setMessages([]);
        resetAI();
    };

    const copyToClipboard = (text: string, messageId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedMessageId(messageId);
        setTimeout(() => {
            setCopiedMessageId(null);
        }, 2000);    };    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: aiChatStyles }} />
            <Card className="w-full max-w-4xl shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50 border-b rounded-t-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                                <Bot className="h-5 w-5 text-purple-600" />
                            </div>
                            <CardTitle>{title}</CardTitle>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={resetChat}
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                        title="Reset conversation"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Reset conversation
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>

                <CardContent className="pt-6 pb-2">
                    {apiKeyError && (
                        <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
                                <AlertCircle className="h-5 w-5" />
                                <h3 className="font-semibold">API Key Issue</h3>
                            </div>
                            <p className="text-sm text-amber-600 dark:text-amber-300">
                                There's an issue with the OpenAI API key. The administrator needs to set up a valid API key.
                                Please check the <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded">lib/openai/SETUP.md</code> file for instructions.
                            </p>
                        </div>
                    )}

                    <div className="min-h-[300px] max-h-[500px] overflow-y-auto space-y-4 p-1 chat-container">
                        {messages.length === 0 && !isLoading && !error && (
                            <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground p-6">
                                <Sparkles className="h-8 w-8 mb-3 text-purple-400" />
                                <p className="mb-2">How can I assist you today?</p>
                                <p className="text-sm">Ask me anything, and I'll do my best to help.</p>
                            </div>
                        )}

                        {messages.map((message) => (
                            <div 
                                key={message.id}
                                className={cn(
                                    "flex gap-3 p-4 rounded-lg animate-in fade-in-0 slide-in-from-bottom-3 duration-300",
                                    message.role === 'user' 
                                        ? "bg-purple-50 dark:bg-purple-900/20 ml-6" 
                                        : "bg-gray-100 dark:bg-gray-800 mr-6 border border-gray-200 dark:border-gray-700"
                                )}
                            >
                                <div className={cn(
                                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                                    message.role === 'user' 
                                        ? "bg-purple-200 dark:bg-purple-800" 
                                        : "bg-blue-100 dark:bg-blue-900"
                                )}>
                                    {message.role === 'user' 
                                        ? <User className="h-4 w-4 text-purple-700 dark:text-purple-300" /> 
                                        : <Bot className="h-4 w-4 text-blue-700 dark:text-blue-300" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-semibold">
                                            {message.role === 'user' ? "You" : title}
                                        </span>
                                        <div className="flex gap-1">
                                            {message.role === 'assistant' && (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="h-6 w-6" 
                                                                onClick={() => copyToClipboard(message.content, message.id)}
                                                            >
                                                                {copiedMessageId === message.id 
                                                                    ? <Check className="h-3 w-3" /> 
                                                                    : <Copy className="h-3 w-3" />}
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="left">
                                                            {copiedMessageId === message.id ? "Copied!" : "Copy to clipboard"}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                    <div className="whitespace-pre-wrap text-sm message-content">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && useStreaming && streamingResponse && (
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mr-6 border border-gray-200 dark:border-gray-700 flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                                    <Bot className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-semibold">{title}</span>
                                    </div>
                                    <div className="whitespace-pre-wrap text-sm message-content">
                                        {streamingResponse}
                                        <span className="inline-block w-2 h-4 bg-gray-400 dark:bg-gray-500 ml-1 animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isLoading && !useStreaming && (
                            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg flex items-center gap-2 animate-pulse">
                                <RefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-spin" />
                                <p className="text-purple-600 dark:text-purple-300">
                                    Generating response...
                                </p>
                            </div>
                        )}

                        {error && !apiKeyError && (
                            <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-lg text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800">
                                <p>Error: {error.message}</p>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </CardContent>                <CardFooter className="flex flex-col space-y-4 border-t bg-gray-50 dark:bg-gray-900/30 p-4 rounded-b-xl">
                    <div className="flex flex-col w-full space-y-2">
                        <div className="relative">
                            <Textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                className="flex-1 resize-none pr-20 min-h-[80px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                disabled={isLoading}
                            />
                            <div className="absolute bottom-3 right-3">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={isLoading || !input.trim()}
                                                size="sm"
                                                className="rounded-full bg-purple-600 hover:bg-purple-700 h-8 px-3 flex items-center"
                                            >
                                                {isLoading 
                                                    ? <RefreshCw className="h-3 w-3 animate-spin mr-1" /> 
                                                    : <SendIcon className="h-3 w-3 mr-1" />
                                                }
                                                <span className="text-xs">Send</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                            Send message (Enter)
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
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
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" className="h-6 w-6 mr-1 hover:bg-transparent">
                                <ThumbsUp className="h-3 w-3 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-transparent">
                                <ThumbsDown className="h-3 w-3 text-muted-foreground" />
                            </Button>
                            <span className="ml-3 flex items-center gap-1">
                                <Sparkles className="h-3 w-3 text-amber-500" />
                                Powered by Gemini
                            </span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </>
    );
} 