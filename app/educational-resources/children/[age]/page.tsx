"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, Award, Volume2, Wind, Users, Baby, School, GraduationCap, Gamepad2, ArrowLeft, XIcon } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useParams, useRouter } from "next/navigation"
import { ReactElement, useState } from "react"

type Language = "en" | "ar";
type AgeGroup = "4-7" | "8-12" | "13-17"

interface Activity {
  title: string
  description: string
  icon: ReactElement
  progress: number
  type: "game" | "story" | "activity" | "lesson" | "video"
  videoUrl?: string
}

interface AgeGroupContent {
  title: string
  description: string
  activities: Activity[]
}

type Translations = {
  [L in Language]: {
    back: string;
  } & {
    [A in AgeGroup]: AgeGroupContent;
  };
};

const translations: Translations = {
  en: {
    back: "Back to Resources",
    "4-7": {
      title: "Ages 4-7",
      description: "Fun and interactive learning activities for young children",
      activities: [
        {
          title: "My Body Belongs to Me",
          description: "Learn about body safety through fun games",
          icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "game"
        },
        {
          title: "Safe and Unsafe Touch",
          description: "Watch a video about personal boundaries and safe touch.",
          icon: <Play className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "video",
          videoUrl: "https://www.youtube.com/embed/5Bu2JBDG_Gk"
        },
        {
          title: "Feelings and Emotions",
          description: "Learn to express your feelings safely",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "activity"
        }
      ]
    },
    "8-12": {
      title: "Ages 8-12",
      description: "Engaging activities for school-aged children",
      activities: [
        {
          title: "Digital Safety Adventure",
          description: "Learn about online safety through an interactive game",
          icon: <Gamepad2 className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "game"
        },
        {
          title: "Building Healthy Friendships",
          description: "Interactive lessons about peer relationships",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "lesson"
        },
        {
          title: "Speaking Up",
          description: "Learn how to express concerns safely",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "activity"
        }
      ]
    },
    "13-17": {
      title: "Ages 13-17",
      description: "Resources for teenagers",
      activities: [
        {
          title: "Online Safety Challenge",
          description: "Interactive scenarios about digital safety",
          icon: <Gamepad2 className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "game"
        },
        {
          title: "Healthy Relationships",
          description: "Learn about building positive relationships",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "lesson"
        },
        {
          title: "Future Planning",
          description: "Set goals and plan for your future",
          icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "activity"
        }
      ]
    }
  },
  ar: {
    back: "العودة إلى الموارد",
    "4-7": {
      title: "الأعمار 4-7",
      description: "أنشطة تعليمية ممتعة وتفاعلية للأطفال الصغار",
      activities: [
        {
          title: "جسدي ملك لي",
          description: "تعلم عن سلامة الجسد من خلال ألعاب ممتعة",
          icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "game"
        },
        {
          title: "اللمس الآمن وغير الآمن",
          description: "شاهد فيديو عن الحدود الشخصية واللمس الآمن.",
          icon: <Play className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "video",
          videoUrl: "https://www.youtube.com/embed/5Bu2JBDG_Gk"
        },
        {
          title: "المشاعر والعواطف",
          description: "تعلم التعبير عن مشاعرك بأمان",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "activity"
        }
      ]
    },
    "8-12": {
      title: "الأعمار 8-12",
      description: "أنشطة جذابة للأطفال في سن المدرسة",
      activities: [
        {
          title: "مغامرة السلامة الرقمية",
          description: "تعلم عن السلامة عبر الإنترنت من خلال لعبة تفاعلية",
          icon: <Gamepad2 className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "game"
        },
        {
          title: "بناء الصداقات الصحية",
          description: "دروس تفاعلية عن علاقات الأقران",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "lesson"
        },
        {
          title: "التعبير عن النفس",
          description: "تعلم كيفية التعبير عن المخاوف بأمان",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "activity"
        }
      ]
    },
    "13-17": {
      title: "الأعمار 13-17",
      description: "موارد للمراهقين",
      activities: [
        {
          title: "تحدي السلامة عبر الإنترنت",
          description: "سيناريوهات تفاعلية عن السلامة الرقمية",
          icon: <Gamepad2 className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "game"
        },
        {
          title: "العلاقات الصحية",
          description: "تعلم بناء العلاقات الإيجابية",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "lesson"
        },
        {
          title: "التخطيط للمستقبل",
          description: "حدد الأهداف وخطط لمستقبلك",
          icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          type: "activity"
        }
      ]
    }
  }
}

export default function ChildrenAgeGroupPage() {
  const { language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const ageGroup = params.age as AgeGroup
  const t = translations[language][ageGroup]
  const [videoUrlToPlay, setVideoUrlToPlay] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          {translations[language].back}
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {t.activities.map((activity: Activity, index: number) => (
          <Card key={index} className="overflow-hidden border-purple-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-gray-600 transition-colors">
            <CardHeader className="p-6 text-center">
              <div className="bg-purple-100 dark:bg-gray-800/50 p-2 rounded-full w-fit mx-auto">
                {activity.icon}
              </div>
              <CardTitle className="mt-4 text-gray-900 dark:text-gray-100">{activity.title}</CardTitle>
              <CardDescription className="dark:text-gray-400">{activity.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{activity.progress}%</span>
                </div>
                <Progress value={activity.progress} className="h-2 bg-gray-100 dark:bg-gray-800" />
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600/80 dark:hover:bg-purple-600 text-white"
                onClick={() => {
                  if (activity.type === "video" && activity.videoUrl) {
                    setVideoUrlToPlay(activity.videoUrl);
                  } else {
                    console.log("Button clicked for activity:", activity.title, "Type:", activity.type);
                  }
                }}
              >
                {activity.type === "video"
                  ? (language === "en" ? "Watch Video" : "مشاهدة الفيديو")
                  : activity.progress === 0 
                    ? (language === "en" ? `Start ${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}` : `ابدأ ال${activity.type === "game" ? "لعبة" : activity.type === "story" ? "قصة" : "نشاط"}`) 
                    : (language === "en" ? "Continue" : "متابعة")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {videoUrlToPlay && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px', position: 'relative', width: '80vw', maxWidth: '80vw' }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVideoUrlToPlay(null)}
              style={{ position: 'absolute', top: '10px', right: '10px', color: '#333', background: '#fff', borderRadius:'50%', width: '32px', height: '32px' }}
              aria-label={language === "en" ? "Close video player" : "إغلاق مشغل الفيديو"}
            >
              <XIcon className="h-5 w-5" />
            </Button>
            <div style={{ aspectRatio: '16/9', width: '100%' }}>
              <iframe 
                style={{ width: '100%', height: '100%' }}
                src={videoUrlToPlay} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 