"use client";

import { useState, useEffect } from "react";
import DemoAIAssistant from "@/components/DemoAIAssistant";
import { useLanguage } from "@/context/language-context";

export default function AIAssistantPage() {
    const { language } = useLanguage();

    return (
        <div className="container mx-auto py-12 space-y-8 max-w-6xl">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    {language === "en" ? (
                        <>Nismah <span className="text-purple-600">AI Assistant</span></>
                    ) : (
                        <>مساعد <span className="text-purple-600">نِسمة</span> الذكي</>
                    )}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {language === "en"
                        ? "Ask questions about child safety, parenting, or any concerns you may have. Our AI assistant is here to help."
                        : "اطرح أسئلة حول سلامة الطفل، والأبوة والأمومة، أو أي مخاوف قد تكون لديك. مساعدنا الذكي هنا للمساعدة."}
                </p>
            </div>

            <div className="flex justify-center">
                <DemoAIAssistant
                    title={language === "en" ? "Nismah AI Assistant" : "مساعد نِسمة الذكي"}
                    placeholder={language === "en" ? "Ask me about child safety..." : "اسألني عن سلامة الطفل..."}
                />
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-3xl max-w-3xl mx-auto mt-12">
                <h2 className="text-2xl font-semibold mb-4">
                    {language === "en" ? "Suggested Questions" : "أسئلة مقترحة"}
                </h2>
                <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                    {language === "en" ? (
                        <>
                            <li>• How can I teach my children about online safety?</li>
                            <li>• What are the warning signs of cyberbullying?</li>
                            <li>• How should I talk to my children about strangers?</li>
                            <li>• What are age-appropriate safety rules for my 10-year-old?</li>
                            <li>• How can I monitor my child's internet usage without invading privacy?</li>
                        </>
                    ) : (
                        <>
                            <li>• كيف يمكنني تعليم أطفالي عن السلامة عبر الإنترنت؟</li>
                            <li>• ما هي علامات التحذير من التنمر الإلكتروني؟</li>
                            <li>• كيف يجب أن أتحدث مع أطفالي عن الغرباء؟</li>
                            <li>• ما هي قواعد السلامة المناسبة لعمر طفلي البالغ 10 سنوات؟</li>
                            <li>• كيف يمكنني مراقبة استخدام طفلي للإنترنت دون انتهاك الخصوصية؟</li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
} 