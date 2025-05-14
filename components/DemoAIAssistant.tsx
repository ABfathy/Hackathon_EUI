"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, SendIcon, RefreshCw, Info, Clock } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface AIAssistantProps {
    title?: string;
    placeholder?: string;
}

// Minimum time between requests in milliseconds (10 seconds)
const MIN_REQUEST_INTERVAL = 10000;

export default function DemoAIAssistant({
    title = "AI Assistant",
    placeholder = "Ask me about child safety..."
}: AIAssistantProps) {
    const { language } = useLanguage();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastRequestTime = useRef<number | null>(null);
    const loadingMessagesInterval = useRef<NodeJS.Timeout | null>(null);

    // Auto-scroll to bottom when new responses come in
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [response, loadingMessage]);

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
    }, [cooldown, cooldownTime]);

    const handleSubmit = async () => {
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

        setLoading(true);
        setError(null);
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
            setResponse(data.text);
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
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const reset = () => {
        setResponse(null);
        setError(null);
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
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                        <Info className="h-5 w-5" />
                        <h3 className="font-semibold">{language === "en" ? "Reactive Mode" : "وضع التفاعل"}</h3>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                        {language === "en"
                            ? "This assistant will respond to your questions in real-time using Google's Gemini AI. Ask any questions about child safety, parenting, or related topics."
                            : "سيستجيب هذا المساعد لأسئلتك في الوقت الفعلي باستخدام Google Gemini AI. اطرح أي أسئلة حول سلامة الطفل أو الأبوة والأمومة أو المواضيع ذات الصلة."}
                    </p>
                </div>

                <div className="min-h-[200px] max-h-[400px] overflow-y-auto space-y-4 p-1">
                    {response && (
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="whitespace-pre-wrap">{response}</p>
                        </div>
                    )}

                    {loading && (
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg flex items-center gap-2">
                            <RefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-spin" />
                            <p className="text-purple-600 dark:text-purple-300">
                                {loadingMessage}
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-600 dark:text-red-300">
                            <p>{error}</p>
                        </div>
                    )}

                    {cooldown && (
                        <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-lg flex items-center gap-2">
                            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            <p className="text-amber-600 dark:text-amber-300">
                                {language === "en"
                                    ? `Please wait ${cooldownTime} seconds before sending another request.`
                                    : `يرجى الانتظار ${cooldownTime} ثوانٍ قبل إرسال طلب آخر.`}
                            </p>
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
                        disabled={loading || cooldown}
                    />
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || !input.trim() || cooldown}
                            size="icon"
                            className="rounded-full bg-purple-600 hover:bg-purple-700"
                        >
                            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
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
                    <span>{language === "en" ? "AI Assistant" : "مساعد الذكاء الاصطناعي"}</span>
                    <span>{language === "en" ? "Powered by Google Gemini" : "مدعوم من Google Gemini"}</span>
                </div>
            </CardFooter>
        </Card>
    );
} 