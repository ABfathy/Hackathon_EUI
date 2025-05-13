"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Play, Award, VolumeX, Volume2, Sparkles, Wind, Users, Baby, School, GraduationCap } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"

const translations = {
  en: {
    title: "Educational Resources",
    description: "Access fun, age-appropriate courses and interactive lessons for both parents and children.",
    startLearning: "Start Learning",
    tabs: {
      parents: "For Parents",
      children: "For Children"
    },
    ageGroups: {
      parents: {
        title: "Parent Resources by Child's Age",
        description: "Select your child's age group to access relevant resources",
        groups: [
          {
            title: "Infants & Toddlers (0-3)",
            description: "Early development and safety basics",
            icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/0-3"
          },
          {
            title: "Preschool (4-6)",
            description: "Building trust and communication",
            icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/4-6"
          },
          {
            title: "School Age (7-12)",
            description: "Digital safety and peer relationships",
            icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/7-12"
          },
          {
            title: "Teens (13-17)",
            description: "Independence and online safety",
            icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/13-17"
          }
        ]
      },
      children: {
        title: "Interactive Learning by Age",
        description: "Select your age group to start learning",
        groups: [
          {
            title: "Ages 4-7",
            description: "Fun games about body safety",
            icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/children/4-7"
          },
          {
            title: "Ages 8-12",
            description: "Interactive lessons about boundaries",
            icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/children/8-12"
          },
          {
            title: "Ages 13-17",
            description: "Digital safety and relationships",
            icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/children/13-17"
          }
        ]
      }
    },
    featured: {
      title: "Featured Courses",
      description: "Most popular courses this month",
      items: [
        {
          title: "Parenting Certificate Program",
          description: "Complete all courses to earn a certificate",
          icon: <Award className="h-5 w-5 text-purple-600 dark:text-gray-300" />
        }
      ]
    },
    recommended: {
      title: "Recommended for You",
      description: "Based on your learning progress",
      items: [
        {
          title: "Voice Guidance",
          description: "Enable voice narration for lessons",
          icon: <Volume2 className="h-5 w-5 text-purple-600 dark:text-gray-300" />
        }
      ]
    },
    progress: {
      title: "Your Progress",
      description: "Track your learning journey",
      items: [
        {
          title: "Overall Progress",
          progress: 45
        }
      ]
    }
  },
  ar: {
    title: "الموارد التعليمية",
    description: "الوصول إلى دورات ممتعة ودروس تفاعلية مناسبة للعمر لكل من الآباء والأطفال.",
    startLearning: "ابدأ التعلم",
    tabs: {
      parents: "للآباء",
      children: "للأطفال"
    },
    ageGroups: {
      parents: {
        title: "موارد الوالدين حسب عمر الطفل",
        description: "اختر الفئة العمرية لطفلك للوصول إلى الموارد ذات الصلة",
        groups: [
          {
            title: "الرضع والأطفال الصغار (0-3)",
            description: "التنمية المبكرة وأساسيات السلامة",
            icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/0-3"
          },
          {
            title: "ما قبل المدرسة (4-6)",
            description: "بناء الثقة والتواصل",
            icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/4-6"
          },
          {
            title: "سن المدرسة (7-12)",
            description: "السلامة الرقمية وعلاقات الأقران",
            icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/7-12"
          },
          {
            title: "المراهقون (13-17)",
            description: "الاستقلالية والسلامة عبر الإنترنت",
            icon: <Users className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/parents/13-17"
          }
        ]
      },
      children: {
        title: "التعلم التفاعلي حسب العمر",
        description: "اختر فئتك العمرية لبدء التعلم",
        groups: [
          {
            title: "الأعمار 4-7",
            description: "ألعاب ممتعة عن سلامة الجسد",
            icon: <Baby className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/children/4-7"
          },
          {
            title: "الأعمار 8-12",
            description: "دروس تفاعلية عن الحدود",
            icon: <School className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/children/8-12"
          },
          {
            title: "الأعمار 13-17",
            description: "السلامة الرقمية والعلاقات",
            icon: <GraduationCap className="h-10 w-10 text-purple-600 dark:text-gray-300" />,
            href: "/educational-resources/children/13-17"
          }
        ]
      }
    },
    featured: {
      title: "الدورات المميزة",
      description: "الدورات الأكثر شعبية هذا الشهر",
      items: [
        {
          title: "برنامج شهادة الأبوة والأمومة",
          description: "أكمل جميع الدورات للحصول على شهادة",
          icon: <Award className="h-5 w-5 text-purple-600 dark:text-gray-300" />
        }
      ]
    },
    recommended: {
      title: "موصى به لك",
      description: "بناءً على تقدمك في التعلم",
      items: [
        {
          title: "التوجيه الصوتي",
          description: "تمكين السرد الصوتي للدروس",
          icon: <Volume2 className="h-5 w-5 text-purple-600 dark:text-gray-300" />
        }
      ]
    },
    progress: {
      title: "تقدمك",
      description: "تتبع رحلة تعلمك",
      items: [
        {
          title: "التقدم العام",
          progress: 45
        }
      ]
    }
  }
}

export default function EducationalResourcesPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      <Tabs defaultValue="parents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parents">{t.tabs.parents}</TabsTrigger>
          <TabsTrigger value="children">{t.tabs.children}</TabsTrigger>
        </TabsList>

        <TabsContent value="parents" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t.ageGroups.parents.title}</h2>
            <p className="text-muted-foreground">{t.ageGroups.parents.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.ageGroups.parents.groups.map((group, index) => (
              <Link key={index} href={group.href}>
                <Card className="h-full hover:border-purple-300 dark:hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="bg-purple-100 dark:bg-gray-800/50 p-2 rounded-full w-fit">
                      {group.icon}
                    </div>
                    <CardTitle className="mt-4">{group.title}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="children" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{t.ageGroups.children.title}</h2>
            <p className="text-muted-foreground">{t.ageGroups.children.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.ageGroups.children.groups.map((group, index) => (
              <Link key={index} href={group.href}>
                <Card className="h-full hover:border-purple-300 dark:hover:border-gray-600 transition-colors">
                  <CardHeader>
                    <div className="bg-purple-100 dark:bg-gray-800/50 p-2 rounded-full w-fit">
                      {group.icon}
                    </div>
                    <CardTitle className="mt-4">{group.title}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-purple-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">{t.featured.title}</CardTitle>
            <CardDescription className="dark:text-gray-400">{t.featured.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {t.featured.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-gray-800/50 p-2 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-100">{t.recommended.title}</CardTitle>
            <CardDescription className="dark:text-gray-400">{t.recommended.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {t.recommended.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-gray-800/50 p-2 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">{t.progress.title}</CardTitle>
          <CardDescription className="dark:text-gray-400">{t.progress.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {t.progress.items.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
                  <span className="text-sm text-muted-foreground dark:text-gray-400">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2 bg-gray-100 dark:bg-gray-800" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
