'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Lock, Users, Video, Search } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useSession } from "next-auth/react"
import Link from "next/link"

const translations = {
  en: {
    title: "Expert Counseling",
    subtitle: "Connect with qualified mental health professionals for personalized support and guidance.",
    privacyTitle: "Privacy & Confidentiality",
    privacyDescription: "All counseling sessions are completely confidential. Your privacy is our top priority.",
    privacyPolicy: "Privacy Policy",
    childPsychologist: "Child Psychologist",
    available: "Available",
    specializedIn: "Specialized in child trauma and recovery",
    specializations: "Specializations:",
    traumaRecovery: "Trauma Recovery",
    familyTherapist: "Family Therapist",
    familyTherapy: "Family Therapy",
    familyDynamics: "Family Dynamics",
    parenting: "Parenting",
    communication: "Communication",
    emergencySupport: "Emergency Support Available 24/7",
    emergencyDescription: "Our crisis counselors are available around the clock for urgent situations.",
    accessEmergency: "Access Emergency Support"
  },
  ar: {
    title: "استشارة الخبراء",
    subtitle: "تواصل مع متخصصي الصحة العقلية المؤهلين للحصول على الدعم والتوجيه الشخصي.",
    privacyTitle: "الخصوصية والسرية",
    privacyDescription: "جميع جلسات الاستشارة سرية تماماً. خصوصيتك هي أولويتنا القصوى.",
    privacyPolicy: "سياسة الخصوصية",
    childPsychologist: "طبيب نفساني للأطفال",
    available: "متاح",
    specializedIn: "متخصص في صدمات الأطفال والتعافي",
    specializations: "التخصصات:",
    traumaRecovery: "التعافي من الصدمات",
    familyTherapist: "معالج أسري",
    familyTherapy: "العلاج الأسري",
    familyDynamics: "ديناميكيات الأسرة",
    parenting: "تربية الأطفال",
    communication: "التواصل",
    emergencySupport: "دعم الطوارئ متاح على مدار الساعة",
    emergencyDescription: "متخصصو الأزمات لدينا متاحون على مدار الساعة للحالات العاجلة.",
    accessEmergency: "الوصول إلى دعم الطوارئ"
  }
}

export default function ExpertCounselingPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const { data: session, status } = useSession()
  
  if (status === "loading") {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <div className="flex items-center space-x-2 mt-4">
            <div className="animate-spin h-5 w-5 border-2 border-purple-600 dark:border-purple-400 rounded-full border-t-transparent"></div>
            <p className="text-muted-foreground">{language === "en" ? "Loading content..." : "جاري تحميل المحتوى..."}</p>
          </div>
        </div>
      </div>
    )
  }
  
  if (status === "unauthenticated" || !session) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Card className="border-purple-200 dark:border-gray-700 max-w-3xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-emerald-50 dark:from-gray-800/50 dark:to-gray-800/80 rounded-t-lg">
            <CardTitle className="text-purple-600 dark:text-gray-200 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              {language === "en" ? "Access Required" : "مطلوب تسجيل الدخول"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">{language === "en" 
              ? "Please sign in to access our expert counseling services. These services are only available to authenticated users to ensure a safe and supportive environment."
              : "يرجى تسجيل الدخول للوصول إلى خدمات الاستشارة المتخصصة. هذه الخدمات متاحة فقط للمستخدمين المصادق عليهم لضمان بيئة آمنة وداعمة."}</p>
            <Link href="/login">
              <Button className="w-full sm:w-auto">
                {language === "en" ? "Sign In" : "تسجيل الدخول"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.title}
        </h1>
        <p className="text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <Lock className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">{t.privacyTitle}</h3>
            <p className="text-muted-foreground">
              {t.privacyDescription}
            </p>
          </div>
          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            {t.privacyPolicy}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{t.childPsychologist}</CardTitle>
              <Badge className="bg-green-500">{t.available}</Badge>
            </div>
            <CardDescription>{t.specializedIn}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">Dr. Rebecca Chen</h4>
                <p className="text-sm text-muted-foreground">PhD, Child Psychology</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-xs text-muted-foreground">(48 reviews)</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t.specializations}:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {t.traumaRecovery}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
            <Button className="w-full">Schedule Session</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{t.familyTherapist}</CardTitle>
              <Badge className="bg-green-500">{t.available}</Badge>
            </div>
            <CardDescription>Focused on family dynamics and healing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">Dr. James Miller</h4>
                <p className="text-sm text-muted-foreground">LMFT, {t.familyTherapy}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="text-xs text-muted-foreground">(36 reviews)</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t.specializations}:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {t.familyDynamics}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {t.parenting}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {t.communication}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
            <Button className="w-full">Schedule Session</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">Child Advocate</CardTitle>
              <Badge className="bg-amber-500">Busy</Badge>
            </div>
            <CardDescription>Legal and emotional support for children</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">Sarah Adams</h4>
                <p className="text-sm text-muted-foreground">JD, Child Advocacy</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-xs text-muted-foreground">(52 reviews)</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t.specializations}:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  Legal Support
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Advocacy
                </Badge>
                <Badge variant="outline" className="text-xs">
                  System Navigation
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
            <Button className="w-full">Join Waitlist</Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <MessageCircle className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-xl font-semibold">{t.emergencySupport}</h3>
            <p className="text-muted-foreground">
              {t.emergencyDescription}
            </p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white w-full md:w-auto">
            {t.accessEmergency}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 