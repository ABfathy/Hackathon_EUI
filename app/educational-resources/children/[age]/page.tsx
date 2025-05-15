"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, Award, Volume2, Wind, Users, Baby, School, GraduationCap, Gamepad2, ArrowLeft, XIcon, Video, FileText, ExternalLink } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useParams, useRouter } from "next/navigation"
import { ReactElement, useState } from "react"
import dynamic from 'next/dynamic'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import type { FC } from 'react'

const QuizGame = dynamic(() => import('../../components/QuizGame'), {
  loading: () => <div>Loading quiz...</div>
})

type Language = "en" | "ar"
type AgeGroup = "4-7" | "8-12" | "13-17"
type ActivityType = "video" | "game" | "document" | "link" | "lesson" | "activity"

interface Activity {
  id: string
  title: string
  description: string
  type: ActivityType
  videoUrl?: string
  documentUrl?: string
  externalUrl?: string
  tags: string[]
}

interface AgeGroupContent {
  title: string
  description: string
  activities: Activity[]
  back: string
}

interface Translations {
  [key: string]: {
    [key: string]: AgeGroupContent
  }
}

const translations: Translations = {
  en: {
    "4-7": {
      title: "Resources for Ages 4-7",
      description: "Fun and engaging activities for young children",
      back: "Back to Resources",
      activities: [
        {
          id: "1",
          title: "Body Safety Rules",
          description: "Learn about personal boundaries and safety",
          type: "video",
          videoUrl: "https://example.com/video1",
          tags: ["safety", "boundaries"]
        },
        {
          id: "2",
          title: "Safe Touch Game",
          description: "Interactive game about safe and unsafe touches",
          type: "game",
          tags: ["safety", "interactive"]
        },
        {
          id: "3",
          title: "Feelings Activity",
          description: "Express and understand different emotions",
          type: "activity",
          tags: ["emotions", "interactive"]
        }
      ]
    },
    "8-12": {
      title: "Resources for Ages 8-12",
      description: "Interactive learning materials for pre-teens",
      back: "Back to Resources",
      activities: [
        {
          id: "4",
          title: "Online Safety",
          description: "Learn about staying safe on the internet",
          type: "lesson",
          tags: ["online safety", "digital literacy"]
        },
        {
          id: "5",
          title: "Cyber Safety Game",
          description: "Test your knowledge about online safety",
          type: "game",
          tags: ["online safety", "interactive"]
        },
        {
          id: "6",
          title: "Digital Footprint",
          description: "Understanding your online presence",
          type: "activity",
          tags: ["online safety", "digital literacy"]
        }
      ]
    },
    "13-17": {
      title: "Resources for Ages 13-17",
      description: "Comprehensive resources for teenagers",
      back: "Back to Resources",
      activities: [
        {
          id: "7",
          title: "Healthy Relationships",
          description: "Understanding healthy boundaries and relationships",
          type: "lesson",
          tags: ["relationships", "boundaries"]
        },
        {
          id: "8",
          title: "Consent Quiz",
          description: "Test your understanding of consent",
          type: "game",
          tags: ["consent", "interactive"]
        },
        {
          id: "9",
          title: "Peer Pressure",
          description: "Handling peer pressure and making good decisions",
          type: "activity",
          tags: ["peer pressure", "decision making"]
        }
      ]
    }
  },
  ar: {
    "4-7": {
      title: "موارد للأعمار 4-7",
      description: "أنشطة ممتعة وجذابة للأطفال الصغار",
      back: "العودة إلى الموارد",
      activities: [
        {
          id: "1",
          title: "قواعد سلامة الجسد",
          description: "تعلم عن الحدود الشخصية والسلامة",
          type: "video",
          videoUrl: "https://example.com/video1",
          tags: ["سلامة", "حدود"]
        },
        {
          id: "2",
          title: "لعبة اللمس الآمن",
          description: "لعبة تفاعلية عن اللمس الآمن وغير الآمن",
          type: "game",
          tags: ["سلامة", "تفاعلي"]
        },
        {
          id: "3",
          title: "نشاط المشاعر",
          description: "التعبير عن المشاعر المختلفة وفهمها",
          type: "activity",
          tags: ["مشاعر", "تفاعلي"]
        }
      ]
    },
    "8-12": {
      title: "موارد للأعمار 8-12",
      description: "مواد تعليمية تفاعلية للمراهقين",
      back: "العودة إلى الموارد",
      activities: [
        {
          id: "4",
          title: "السلامة على الإنترنت",
          description: "تعلم عن البقاء آمناً على الإنترنت",
          type: "lesson",
          tags: ["سلامة الإنترنت", "محو الأمية الرقمية"]
        },
        {
          id: "5",
          title: "لعبة السلامة الإلكترونية",
          description: "اختبر معرفتك عن السلامة على الإنترنت",
          type: "game",
          tags: ["سلامة الإنترنت", "تفاعلي"]
        },
        {
          id: "6",
          title: "البصمة الرقمية",
          description: "فهم وجودك على الإنترنت",
          type: "activity",
          tags: ["سلامة الإنترنت", "محو الأمية الرقمية"]
        }
      ]
    },
    "13-17": {
      title: "موارد للأعمار 13-17",
      description: "موارد شاملة للمراهقين",
      back: "العودة إلى الموارد",
      activities: [
        {
          id: "7",
          title: "العلاقات الصحية",
          description: "فهم الحدود والعلاقات الصحية",
          type: "lesson",
          tags: ["علاقات", "حدود"]
        },
        {
          id: "8",
          title: "اختبار الموافقة",
          description: "اختبر فهمك للموافقة",
          type: "game",
          tags: ["موافقة", "تفاعلي"]
        },
        {
          id: "9",
          title: "ضغط الأقران",
          description: "التعامل مع ضغط الأقران واتخاذ قرارات جيدة",
          type: "activity",
          tags: ["ضغط الأقران", "اتخاذ القرارات"]
        }
      ]
    }
  }
}

export default function ChildrenAgeGroupPage() {
  const { age } = useParams()
  const { language } = useLanguage()
  const t = translations[language][age as AgeGroup]
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [videoUrlToPlay, setVideoUrlToPlay] = useState<string | null>(null)

  const handleActivityClick = (activity: Activity) => {
    if (activity.type === 'game') {
      setShowQuiz(true)
    } else if (activity.type === 'video' && activity.videoUrl) {
      setVideoUrlToPlay(activity.videoUrl)
    } else {
      setSelectedActivity(activity)
    }
  }

  const handleQuizComplete = (score: number) => {
    setQuizScore(score)
  }

  const handleCloseQuiz = () => {
    setShowQuiz(false)
    setQuizScore(null)
  }

  if (showQuiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={handleCloseQuiz}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back}
        </Button>
        <QuizGame
          ageGroup={age as AgeGroup}
          onComplete={handleQuizComplete}
          onClose={handleCloseQuiz}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Button>
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{t.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {t.activities.map((activity) => (
          <Card key={activity.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
              <CardDescription>{activity.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {activity.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600/80 dark:hover:bg-purple-600 text-white"
                onClick={() => handleActivityClick(activity)}
              >
                {activity.type === "video" ? (
                  <>
                    <Video className="mr-2 h-4 w-4" />
                    {language === "en" ? "Watch Video" : "شاهد الفيديو"}
                  </>
                ) : activity.type === "game" ? (
                  <>
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    {language === "en" ? "Play Game" : "العب اللعبة"}
                  </>
                ) : activity.type === "document" ? (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    {language === "en" ? "Read Document" : "اقرأ المستند"}
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {language === "en" ? "Open Link" : "افتح الرابط"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {videoUrlToPlay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl aspect-video">
            <Button
              variant="ghost"
              className="absolute -top-12 right-0 text-white"
              onClick={() => setVideoUrlToPlay(null)}
            >
              Close
            </Button>
            <iframe
              src={videoUrlToPlay}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
} 