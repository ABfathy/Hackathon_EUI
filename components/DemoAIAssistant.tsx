"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, SendIcon, RefreshCw, Info, Clock, User, ChevronDown, Sparkles, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* AI Chat component styles */
const chatStyles = `
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
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
}

.message-content pre {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
  margin: 8px 0;
  max-width: 100%;
  white-space: pre-wrap;
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

interface AIAssistantProps {
    title?: string;
    placeholder?: string;
    initialQuery?: string;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Animation variants for messages
const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

// Minimum time between requests in milliseconds (10 seconds)
const MIN_REQUEST_INTERVAL = 10000;

export default function DemoAIAssistant({
    title = "AI Assistant",
    placeholder = "Ask me about child safety...",
    initialQuery = ""
}: AIAssistantProps) {
    const { language } = useLanguage();
    const [input, setInput] = useState(initialQuery);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const lastRequestTime = useRef<number | null>(null);
    const loadingMessagesInterval = useRef<NodeJS.Timeout | null>(null);    // Handle changes to initialQuery prop
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
    }, [messages, loadingMessage]);

    // Loading message rotator
    useEffect(() => {
        if (loading) {
            const messages = language === "en"
                ? [
                    "Thinking...",
                    "Processing your question...",
                    "Generating a helpful response...",
                    "Looking for the best answer...",
                    "Almost there...",
                    "This might take a moment..."
                ]
                : [
                    "جاري التفكير...",
                    "معالجة سؤالك...",
                    "إنشاء رد مفيد...",
                    "البحث عن أفضل إجابة...",
                    "اقتربنا من النهاية...",
                    "قد يستغرق هذا لحظة..."
                ];

            let index = 0;
            setLoadingMessage(messages[0]);

            loadingMessagesInterval.current = setInterval(() => {
                index = (index + 1) % messages.length;
                setLoadingMessage(messages[index]);
            }, 3000);

            return () => {
                if (loadingMessagesInterval.current) {
                    clearInterval(loadingMessagesInterval.current);
                    loadingMessagesInterval.current = null;
                }
            };
        }
    }, [loading, language]);

    // Cooldown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (cooldown && cooldownTime > 0) {
            timer = setTimeout(() => {
                setCooldownTime(prev => {
                    if (prev <= 1) {
                        setCooldown(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [cooldown, cooldownTime]);    const handleSubmit = async () => {
        if (!input.trim() || loading || cooldown) return;

        const now = Date.now();
        const timeSinceLastRequest = lastRequestTime.current ? now - lastRequestTime.current : MIN_REQUEST_INTERVAL + 1;

        // Check if we're sending requests too quickly
        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
            const waitTime = Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
            setCooldownTime(waitTime);
            setCooldown(true);
            return;
        }

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setLoading(true);
        setError(null);
        setInput('');
        lastRequestTime.current = now;

        try {
            const result = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    systemMessage: language === "en"
                        ? "You are Nismah AI Assistant, specialized in child safety, education, and parenting advice. Provide helpful, accurate, and supportive information. Always prioritize child safety and well-being in your responses. Be concise but thorough."
                        : "أنت مساعد نِسمة الذكي، متخصص في سلامة الأطفال والتعليم ونصائح الأبوة والأمومة. قدم معلومات مفيدة ودقيقة وداعمة. ضع دائمًا أولوية سلامة الطفل ورفاهيته في ردودك. كن موجزًا ولكن شاملًا.",
                    stream: false
                }),
            });

            if (!result.ok) {
                const errorData = await result.json();
                throw new Error(errorData.error || 'Failed to get AI response');
            }

            const data = await result.json();
            
            const aiMessage: ChatMessage = {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: data.text,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error('Error getting AI response:', err);
            const errorMsg = err instanceof Error ? err.message : 'An unknown error occurred';

            if (errorMsg.includes('too quickly') || errorMsg.includes('rate limit')) {
                setCooldownTime(10);
                setCooldown(true);
                setError('Sending requests too quickly. Please wait a moment before trying again.');
            } else {
                setError(errorMsg);
            }
        } finally {
            setLoading(false);
            setLoadingMessage('');
            // Focus back on the input after response
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const reset = () => {
        setMessages([]);
        setError(null);
    };

    const copyToClipboard = (text: string, messageId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedMessageId(messageId);
        setTimeout(() => {
            setCopiedMessageId(null);
        }, 2000);
    };    return (
        <>            <style dangerouslySetInnerHTML={{ __html: chatStyles }} />
            <Card className="w-full max-w-3xl shadow-xl mx-auto rounded-xl overflow-hidden">
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
                                        onClick={reset}
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full"
                                        title="Reset conversation"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {language === "en" ? "Reset conversation" : "إعادة ضبط المحادثة"}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>

            <CardContent className="pt-6 pb-2">                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                        <Info className="h-5 w-5" />
                        <h3 className="font-semibold">{language === "en" ? "Nismah Assistant" : "مساعد نِسمة"}</h3>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                        {language === "en"
                            ? "This assistant will respond to your questions in real-time using Google's Gemini AI. Ask any questions about child safety, parenting, or related topics."
                            : "سيستجيب هذا المساعد لأسئلتك في الوقت الفعلي باستخدام Google Gemini AI. اطرح أي أسئلة حول سلامة الطفل أو الأبوة والأمومة أو المواضيع ذات الصلة."}
                    </p>
                </div>

                <div className="min-h-[350px] max-h-[550px] overflow-y-auto space-y-4 p-1 chat-container">                    {messages.length === 0 && !loading && !error && !cooldown && (
                        <div className="flex flex-col items-center justify-center h-56 text-center text-muted-foreground p-6 bg-gradient-to-b from-transparent to-purple-50/30 dark:to-purple-900/10 rounded-xl border border-dashed border-purple-200 dark:border-purple-800">
                            <Sparkles className="h-8 w-8 mb-4 text-purple-400" />
                            <p className="mb-2 font-medium text-purple-600 dark:text-purple-300">
                                {language === "en" 
                                    ? "How can I assist you today?" 
                                    : "كيف يمكنني مساعدتك اليوم؟"}
                            </p>
                            <p className="text-sm max-w-md">
                                {language === "en"
                                    ? "Ask me any questions about child safety, education, or parenting. I'm here to provide helpful guidance and support."
                                    : "اسألني أي أسئلة حول سلامة الطفل أو التعليم أو الأبوة والأمومة. أنا هنا لتقديم التوجيه والدعم المفيد."}
                            </p>
                        </div>
                    )}

                    {messages.map((message, index) => (                        <div 
                            key={message.id}
                            className={cn(
                                "flex gap-3 p-4 rounded-lg animate-in fade-in-0 slide-in-from-bottom-3 duration-300",
                                message.role === 'user' 
                                    ? "bg-purple-50 dark:bg-purple-900/20 ml-6 border border-purple-100 dark:border-purple-800" 
                                    : "bg-gray-100 dark:bg-gray-800 mr-6 border border-gray-200 dark:border-gray-700 shadow-sm"
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
                                        {message.role === 'user' 
                                            ? (language === "en" ? "You" : "أنت") 
                                            : (language === "en" ? "Nismah AI" : "الذكاء الاصطناعي نِسمة")}
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
                                                        {copiedMessageId === message.id 
                                                            ? (language === "en" ? "Copied!" : "تم النسخ!") 
                                                            : (language === "en" ? "Copy to clipboard" : "نسخ إلى الحافظة")}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </div>
                                </div>                                <div className="whitespace-pre-wrap break-words text-sm message-content">
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg flex items-center gap-2 animate-pulse">
                            <RefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-spin" />
                            <p className="text-purple-600 dark:text-purple-300">
                                {loadingMessage}
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-lg text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800">
                            <p>{error}</p>
                        </div>
                    )}

                    {cooldown && (
                        <div className="bg-amber-100 dark:bg-amber-900/40 p-4 rounded-lg flex items-center gap-2 border border-amber-200 dark:border-amber-800">
                            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            <p className="text-amber-600 dark:text-amber-300">
                                {language === "en"
                                    ? `Please wait ${cooldownTime} seconds before sending another request.`
                                    : `يرجى الانتظار ${cooldownTime} ثوانٍ قبل إرسال طلب آخر.`}
                            </p>
                        </div>
                    )}                <div ref={messagesEndRef} />
                </div>
            </CardContent>            <CardFooter className="flex flex-col space-y-4 border-t bg-gray-50 dark:bg-gray-900/30 p-4 rounded-b-xl">
                <div className="flex flex-col w-full space-y-2">
                    <div className="relative">
                        <Textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={placeholder}
                            className="flex-1 resize-none pr-20 min-h-[80px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-purple-300 dark:focus:border-purple-500 shadow-sm"
                            disabled={loading || cooldown}
                        />
                        <div className="absolute bottom-3 right-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={loading || !input.trim() || cooldown}
                                            size="sm"
                                            className="rounded-full bg-purple-600 hover:bg-purple-700 h-8 px-3 flex items-center shadow-sm hover:shadow"
                                        >
                                            {loading 
                                                ? <RefreshCw className="h-3 w-3 animate-spin mr-1" /> 
                                                : <SendIcon className="h-3 w-3 mr-1" />
                                            }
                                            <span className="text-xs">{language === "en" ? "Send" : "إرسال"}</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        {language === "en" ? "Send message (Enter)" : "إرسال الرسالة (Enter)"}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                <span className="mr-1">{language === "en" ? "Feedback" : "تقييم"}</span>
                                <ChevronDown className="h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="top" align="start">
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{language === "en" ? "This was helpful" : "كان هذا مفيدًا"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <ThumbsDown className="h-3 w-3" />
                                <span>{language === "en" ? "This needs improvement" : "هذا يحتاج إلى تحسين"}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <span className="flex items-center gap-1 text-xs">
                        <Sparkles className="h-3 w-3 text-amber-500" />
                        {language === "en" ? "Powered by Google Gemini" : "مدعوم من Google Gemini"}
                    </span>                </div>
            </CardFooter>
        </Card>
        </>
    );
} 