"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Sparkles, Medal } from "lucide-react"
import { useLanguage } from "@/context/language-context"

type AgeGroup = "4-7" | "8-12" | "13-17"

interface Question {
    question: {
        en: string
        ar: string
    }
    options: {
        en: string[]
        ar: string[]
    }
    correctAnswer: number
    points: number
    explanation: {
        en: string
        ar: string
    }
}

interface QuizGameProps {
    ageGroup: AgeGroup
    onComplete: (score: number) => void
    onClose: () => void
}

const translations = {
    en: {
        title: "Educational Quiz",
        score: "Score",
        next: "Next",
        finish: "Finish",
        correct: "Correct!",
        incorrect: "Incorrect!",
        explanation: "Explanation",
        congratulations: "Congratulations!",
        finalScore: "Your final score",
        playAgain: "Play Again",
        close: "Close",
        level: "Level",
        bonus: "Bonus Points!"
    },
    ar: {
        title: "اختبار تعليمي",
        score: "النتيجة",
        next: "التالي",
        finish: "إنهاء",
        correct: "صحيح!",
        incorrect: "خطأ!",
        explanation: "شرح",
        congratulations: "تهانينا!",
        finalScore: "نتيجتك النهائية",
        playAgain: "العب مرة أخرى",
        close: "إغلاق",
        level: "المستوى",
        bonus: "نقاط إضافية!"
    }
}

// Questions database for different age groups
const questionsByAge: Record<AgeGroup, Question[]> = {
    "4-7": [
        {
            question: {
                en: "What should you do if someone touches you in a way that makes you feel uncomfortable?",
                ar: "ماذا يجب أن تفعل إذا لمسك شخص ما بطريقة تجعلك تشعر بعدم الارتياح؟"
            },
            options: {
                en: [
                    "Keep it a secret",
                    "Tell a trusted adult",
                    "Ignore it",
                    "Touch them back"
                ],
                ar: [
                    "احتفظ بالسر",
                    "أخبر شخصاً بالغاً موثوقاً به",
                    "تجاهل الأمر",
                    "قم بلمسهم بالمثل"
                ]
            },
            correctAnswer: 1,
            points: 10,
            explanation: {
                en: "Always tell a trusted adult if someone makes you feel uncomfortable. It's important to speak up!",
                ar: "أخبر دائماً شخصاً بالغاً موثوقاً به إذا جعلك أحد تشعر بعدم الارتياح. من المهم أن تتحدث!"
            }
        },
        {
            question: {
                en: "Which parts of your body are private?",
                ar: "ما هي أجزاء جسمك الخاصة؟"
            },
            options: {
                en: [
                    "Your hands and feet",
                    "Your head and shoulders",
                    "The parts covered by your swimsuit",
                    "Your whole body"
                ],
                ar: [
                    "يديك وقدميك",
                    "رأسك وكتفيك",
                    "الأجزاء التي يغطيها ملابس السباحة",
                    "جسمك كله"
                ]
            },
            correctAnswer: 2,
            points: 10,
            explanation: {
                en: "The parts covered by your swimsuit are private and should not be touched by others.",
                ar: "الأجزاء التي يغطيها ملابس السباحة خاصة ولا يجب أن يلمسها الآخرون."
            }
        },
        {
            question: {
                en: "What should you do if someone asks you to keep a secret that makes you feel sad or scared?",
                ar: "ماذا يجب أن تفعل إذا طلب منك شخص ما الاحتفاظ بسر يجعلك تشعر بالحزن أو الخوف؟"
            },
            options: {
                en: [
                    "Keep the secret",
                    "Tell a trusted adult",
                    "Tell your friends",
                    "Ignore them"
                ],
                ar: [
                    "احتفظ بالسر",
                    "أخبر شخصاً بالغاً موثوقاً به",
                    "أخبر أصدقاءك",
                    "تجاهلهم"
                ]
            },
            correctAnswer: 1,
            points: 15,
            explanation: {
                en: "If a secret makes you feel sad or scared, it's important to tell a trusted adult. Good secrets are happy ones!",
                ar: "إذا كان السر يجعلك تشعر بالحزن أو الخوف، من المهم أن تخبر شخصاً بالغاً موثوقاً به. الأسرار الجيدة هي التي تجعلك سعيداً!"
            }
        }
    ],
    "8-12": [
        {
            question: {
                en: "What should you do if someone asks for your personal information online?",
                ar: "ماذا يجب أن تفعل إذا طلب منك شخص ما معلوماتك الشخصية عبر الإنترنت؟"
            },
            options: {
                en: [
                    "Share it with them",
                    "Ask your parents first",
                    "Ignore them",
                    "Share it with friends"
                ],
                ar: [
                    "شاركها معهم",
                    "اسأل والديك أولاً",
                    "تجاهلهم",
                    "شاركها مع أصدقائك"
                ]
            },
            correctAnswer: 1,
            points: 15,
            explanation: {
                en: "Always ask your parents before sharing any personal information online.",
                ar: "اسأل والديك دائماً قبل مشاركة أي معلومات شخصية عبر الإنترنت."
            }
        },
        {
            question: {
                en: "What is a good way to handle cyberbullying?",
                ar: "ما هي الطريقة الجيدة للتعامل مع التنمر الإلكتروني؟"
            },
            options: {
                en: [
                    "Fight back online",
                    "Ignore and block the person",
                    "Share it with everyone",
                    "Delete your account"
                ],
                ar: [
                    "الرد عليهم عبر الإنترنت",
                    "تجاهل الشخص وحظره",
                    "مشاركة الأمر مع الجميع",
                    "حذف حسابك"
                ]
            },
            correctAnswer: 1,
            points: 15,
            explanation: {
                en: "The best way to handle cyberbullying is to ignore the person and block them, then tell a trusted adult.",
                ar: "أفضل طريقة للتعامل مع التنمر الإلكتروني هي تجاهل الشخص وحظره، ثم إخبار شخص بالغ موثوق به."
            }
        },
        {
            question: {
                en: "What should you do if you see something online that makes you feel uncomfortable?",
                ar: "ماذا يجب أن تفعل إذا رأيت شيئاً على الإنترنت يجعلك تشعر بعدم الارتياح؟"
            },
            options: {
                en: [
                    "Keep watching",
                    "Close it and tell a trusted adult",
                    "Share it with friends",
                    "Try to fix it yourself"
                ],
                ar: [
                    "استمر في المشاهدة",
                    "أغلقه وأخبر شخصاً بالغاً موثوقاً به",
                    "شاركه مع أصدقائك",
                    "حاول إصلاحه بنفسك"
                ]
            },
            correctAnswer: 1,
            points: 20,
            explanation: {
                en: "If you see something that makes you feel uncomfortable online, close it and tell a trusted adult right away.",
                ar: "إذا رأيت شيئاً يجعلك تشعر بعدم الارتياح على الإنترنت، أغلقه وأخبر شخصاً بالغاً موثوقاً به على الفور."
            }
        }
    ],
    "13-17": [
        {
            question: {
                en: "What should you do if you receive an inappropriate message from someone online?",
                ar: "ماذا يجب أن تفعل إذا تلقيت رسالة غير لائقة من شخص ما عبر الإنترنت؟"
            },
            options: {
                en: [
                    "Reply to them",
                    "Save the message and tell a trusted adult",
                    "Delete it immediately",
                    "Forward it to friends"
                ],
                ar: [
                    "الرد عليهم",
                    "احفظ الرسالة وأخبر شخصاً بالغاً موثوقاً به",
                    "احذفها فوراً",
                    "أرسلها إلى أصدقائك"
                ]
            },
            correctAnswer: 1,
            points: 20,
            explanation: {
                en: "Save the message as evidence and tell a trusted adult. Don't engage with the sender.",
                ar: "احفظ الرسالة كدليل وأخبر شخصاً بالغاً موثوقاً به. لا تتواصل مع المرسل."
            }
        },
        {
            question: {
                en: "What is a red flag in an online relationship?",
                ar: "ما هي العلامة الحمراء في العلاقة عبر الإنترنت؟"
            },
            options: {
                en: [
                    "They ask to meet in person",
                    "They want to keep the relationship secret",
                    "They share their interests",
                    "They respond quickly"
                ],
                ar: [
                    "يطلبون مقابلتك شخصياً",
                    "يريدون إبقاء العلاقة سراً",
                    "يشاركون اهتماماتهم",
                    "يردون بسرعة"
                ]
            },
            correctAnswer: 1,
            points: 20,
            explanation: {
                en: "If someone wants to keep your relationship secret, it's a red flag. Healthy relationships are open and honest.",
                ar: "إذا أراد شخص ما إبقاء علاقتكما سراً، فهذه علامة حمراء. العلاقات الصحية مفتوحة وصادقة."
            }
        },
        {
            question: {
                en: "What should you do if someone pressures you to share private photos?",
                ar: "ماذا يجب أن تفعل إذا ضغط عليك شخص ما لمشاركة صور خاصة؟"
            },
            options: {
                en: [
                    "Send them to keep them happy",
                    "Say no and tell a trusted adult",
                    "Send them but ask them to delete them",
                    "Ignore them"
                ],
                ar: [
                    "أرسلها لإسعادهم",
                    "قل لا وأخبر شخصاً بالغاً موثوقاً به",
                    "أرسلها واطلب منهم حذفها",
                    "تجاهلهم"
                ]
            },
            correctAnswer: 1,
            points: 25,
            explanation: {
                en: "Never share private photos, even if someone pressures you. Say no and tell a trusted adult immediately.",
                ar: "لا تشارك أبداً الصور الخاصة، حتى لو ضغط عليك شخص ما. قل لا وأخبر شخصاً بالغاً موثوقاً به على الفور."
            }
        }
    ]
}

const QuizGame: React.FC<QuizGameProps> = ({ ageGroup, onComplete, onClose }) => {
    const { language } = useLanguage()
    const t = translations[language]
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showExplanation, setShowExplanation] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [isComplete, setIsComplete] = useState(false)
    const [streak, setStreak] = useState(0)
    const [level, setLevel] = useState(1)

    const questions = questionsByAge[ageGroup] || []
    const progress = (currentQuestion / questions.length) * 100

    const handleAnswer = (answerIndex: number) => {
        setSelectedAnswer(answerIndex)
        const correct = answerIndex === questions[currentQuestion].correctAnswer
        setIsCorrect(correct)

        if (correct) {
            // Increase streak and calculate bonus points
            const newStreak = streak + 1
            setStreak(newStreak)
            const basePoints = questions[currentQuestion].points
            const bonusPoints = newStreak >= 3 ? Math.floor(basePoints * 0.5) : 0
            const totalPoints = basePoints + bonusPoints
            setScore(score + totalPoints)

            // Level up every 3 correct answers
            if (newStreak % 3 === 0) {
                setLevel(level + 1)
            }
        } else {
            setStreak(0)
        }

        setShowExplanation(true)
    }

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setIsCorrect(null)
            setShowExplanation(false)
        } else {
            setIsComplete(true)
            onComplete(score)
        }
    }

    const handlePlayAgain = () => {
        setCurrentQuestion(0)
        setScore(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setShowExplanation(false)
        setIsComplete(false)
        setStreak(0)
        setLevel(1)
    }

    if (isComplete) {
        return (
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                        <Trophy className="h-12 w-12 text-yellow-500" />
                    </div>
                    <CardTitle className="text-center text-2xl">{t.congratulations}</CardTitle>
                    <CardDescription className="text-center text-xl">
                        {t.finalScore}: {score}
                    </CardDescription>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <Medal className="h-6 w-6 text-purple-600" />
                        <span className="text-lg font-medium">{t.level} {level}</span>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-center gap-4">
                    <Button onClick={handlePlayAgain} className="bg-purple-600 hover:bg-purple-700">
                        {t.playAgain}
                    </Button>
                    <Button onClick={onClose} variant="outline">
                        {t.close}
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <CardTitle>{t.title}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Medal className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-muted-foreground">{t.level} {level}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span>{t.score}: {score}</span>
                    </div>
                </div>
                <Progress value={progress} className="mt-4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                        {questions[currentQuestion].question[language]}
                    </h3>
                    <div className="grid gap-3">
                        {questions[currentQuestion].options[language].map((option, index) => (
                            <Button
                                key={index}
                                variant={selectedAnswer === index ? (isCorrect ? "default" : "destructive") : "outline"}
                                className="justify-start h-auto py-3 px-4"
                                onClick={() => !showExplanation && handleAnswer(index)}
                                disabled={showExplanation}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </div>
                {showExplanation && (
                    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-5 w-5 text-purple-600" />
                            <h4 className="font-medium">{t.explanation}</h4>
                        </div>
                        <p>{questions[currentQuestion].explanation[language]}</p>
                        {isCorrect && streak >= 3 && (
                            <div className="mt-2 text-sm text-purple-600 dark:text-purple-400">
                                {t.bonus} +{Math.floor(questions[currentQuestion].points * 0.5)}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleNext}
                    disabled={!showExplanation}
                >
                    {currentQuestion < questions.length - 1 ? t.next : t.finish}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default QuizGame 