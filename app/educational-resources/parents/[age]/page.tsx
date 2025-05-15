"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, Award, Volume2, Wind, Users, Baby, School, GraduationCap, ArrowLeft, ExternalLink } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useParams, useRouter } from "next/navigation"
import { ReactElement } from "react"

type AgeGroup = "0-3" | "4-6" | "7-12" | "13-17"
type Language = "en" | "ar"

interface Course {
  title: string
  description: string
  icon: ReactElement
  progress: number
  externalUrl?: string
}

interface AgeGroupContent {
  title: string
  description: string
  courses: Course[]
}

type Translations = {
  [L in Language]: {
    back: string
  } & {
    [A in AgeGroup]: AgeGroupContent
  }
}

const translations: Translations = {
  en: {
    back: "Back to Resources",
    "0-3": {
      title: "Infants & Toddlers (0-3)",
      description: "Essential resources for parents of young children",
      courses: [
        {
          title: "Understanding Early Development",
          description: "Learn about your child's developmental milestones",
          icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html"
        },
        {
          title: "Safe Environment",
          description: "Creating a safe home environment",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.healthychildren.org/English/safety-prevention/at-home/Pages/default.aspx"
        },
        {
          title: "Building Trust & Attachment",
          description: "Develop strong bonds with your child",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.zerotothree.org/resource/building-attachment-with-your-baby/"
        }
      ]
    },
    "4-6": {
      title: "Preschool (4-6)",
      description: "Resources for parents of preschool-aged children",
      courses: [
        {
          title: "Safe Environment",
          description: "Creating a safe home environment",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.safekids.org/safetytips/field_age/little-kids-1%E2%80%934-years"
        },
        {
          title: "Communication Skills",
          description: "Help your child express their feelings",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.naeyc.org/our-work/families/support-learning-during-covid-19"
        },
        {
          title: "Social Development",
          description: "Supporting healthy peer relationships",
          icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.pbs.org/parents/thrive/helping-preschoolers-develop-social-skills"
        }
      ]
    },
    "7-12": {
      title: "School Age (7-12)",
      description: "Resources for parents of school-aged children",
      courses: [
        {
          title: "Digital Safety Basics",
          description: "Teaching safe internet use",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.commonsensemedia.org/articles/parent-guides"
        },
        {
          title: "Peer Pressure",
          description: "Helping your child make good decisions",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://kidshealth.org/en/parents/peer-pressure.html"
        },
        {
          title: "Academic Support",
          description: "Supporting your child's learning journey",
          icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.understood.org/articles/en/supporting-your-childs-learning-at-home"
        }
      ]
    },
    "13-17": {
      title: "Teens (13-17)",
      description: "Resources for parents of teenagers",
      courses: [
        {
          title: "Online Safety",
          description: "Managing social media and digital presence",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.internetmatters.org/advice/14plus/"
        },
        {
          title: "Healthy Relationships",
          description: "Guiding your teen through relationships",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.healthychildren.org/English/ages-stages/teen/dating-sex/Pages/default.aspx"
        },
        {
          title: "Future Planning",
          description: "Supporting your teen's goals and aspirations",
          icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.collegeboard.org/parents"
        }
      ]
    }
  },
  ar: {
    back: "العودة إلى الموارد",
    "0-3": {
      title: "الرضع والأطفال الصغار (0-3)",
      description: "موارد أساسية لآباء الأطفال الصغار",
      courses: [
        {
          title: "فهم التطور المبكر",
          description: "تعرف على مراحل تطور طفلك",
          icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html"
        },
        {
          title: "بيئة آمنة",
          description: "إنشاء بيئة منزلية آمنة",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.healthychildren.org/English/safety-prevention/at-home/Pages/default.aspx"
        },
        {
          title: "بناء الثقة والتعلق",
          description: "تطوير روابط قوية مع طفلك",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.zerotothree.org/resource/building-attachment-with-your-baby/"
        }
      ]
    },
    "4-6": {
      title: "ما قبل المدرسة (4-6)",
      description: "موارد لآباء الأطفال في سن ما قبل المدرسة",
      courses: [
        {
          title: "بيئة آمنة",
          description: "إنشاء بيئة منزلية آمنة",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.safekids.org/safetytips/field_age/little-kids-1%E2%80%934-years"
        },
        {
          title: "مهارات التواصل",
          description: "مساعدة طفلك على التعبير عن مشاعره",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.naeyc.org/our-work/families/support-learning-during-covid-19"
        },
        {
          title: "التطور الاجتماعي",
          description: "دعم العلاقات الصحية مع الأقران",
          icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.pbs.org/parents/thrive/helping-preschoolers-develop-social-skills"
        }
      ]
    },
    "7-12": {
      title: "سن المدرسة (7-12)",
      description: "موارد لآباء الأطفال في سن المدرسة",
      courses: [
        {
          title: "أساسيات السلامة الرقمية",
          description: "تعليم الاستخدام الآمن للإنترنت",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.commonsensemedia.org/articles/parent-guides"
        },
        {
          title: "ضغط الأقران",
          description: "مساعدة طفلك على اتخاذ قرارات جيدة",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://kidshealth.org/en/parents/peer-pressure.html"
        },
        {
          title: "الدعم الأكاديمي",
          description: "دعم رحلة تعلم طفلك",
          icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.understood.org/articles/en/supporting-your-childs-learning-at-home"
        }
      ]
    },
    "13-17": {
      title: "المراهقون (13-17)",
      description: "موارد لآباء المراهقين",
      courses: [
        {
          title: "السلامة عبر الإنترنت",
          description: "إدارة وسائل التواصل الاجتماعي والحضور الرقمي",
          icon: <Wind className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.internetmatters.org/advice/14plus/"
        },
        {
          title: "العلاقات الصحية",
          description: "توجيه مراهقك في العلاقات",
          icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.healthychildren.org/English/ages-stages/teen/dating-sex/Pages/default.aspx"
        },
        {
          title: "التخطيط للمستقبل",
          description: "دعم أهداف وتطلعات مراهقك",
          icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
          progress: 0,
          externalUrl: "https://www.collegeboard.org/parents"
        }
      ]
    }
  }
}

export default function ParentAgeGroupPage() {
  const { language } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const ageGroup = params.age as AgeGroup
  const t = translations[language as Language][ageGroup]

  const handleCourseClick = (course: Course) => {
    if (course.externalUrl) {
      window.open(course.externalUrl, '_blank')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          {translations[language as Language].back}
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {t.courses.map((course: Course, index: number) => (
          <Card key={index} className="overflow-hidden border-purple-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-gray-600 transition-colors">
            <CardHeader className="p-6 text-center">
              <div className="bg-purple-100 dark:bg-gray-800/50 p-2 rounded-full w-fit mx-auto">
                {course.icon}
              </div>
              <CardTitle className="mt-4">{course.title}</CardTitle>
              <CardDescription className="dark:text-gray-400">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 bg-gray-100 dark:bg-gray-800" />
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600/80 dark:hover:bg-purple-600 text-white flex items-center justify-center gap-2"
                onClick={() => handleCourseClick(course)}
              >
                {course.progress === 0 ? (
                  <>
                    {course.externalUrl ? <ExternalLink className="h-4 w-4" /> : null}
                    {course.externalUrl ? (language === "en" ? "Visit Resource" : "زيارة المورد") : (language === "en" ? "Start Course" : "ابدأ الدورة")}
                  </>
                ) : (
                  language === "en" ? "Continue Learning" : "متابعة التعلم"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 