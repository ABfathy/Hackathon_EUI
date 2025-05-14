"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, BookOpen, MapPin, MessageCircle, Bot, ArrowRight, Wind } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

export default function HomePage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto space-y-10 max-w-6xl">
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-6 py-12">
          <div className="inline-block p-3 bg-gradient-to-br from-yellow-200 to-purple-200 rounded-full text-purple-600 dark:from-yellow-800 dark:to-purple-800 dark:text-purple-300 animate-pulse shadow-lg">
            <Wind className="h-12 w-12" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            {language === "en" ? (
              <span className="text-purple-600">Nismah</span>
            ) : (
              <span className="text-emerald-600">نِسمة</span>
            )}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {language === "en"
              ? "Empowering families and communities to protect children through education, awareness, and support. Together, we can create a safer world for our children."
              : "تمكين العائلات والمجتمعات لحماية الأطفال من خلال التعليم والتوعية والدعم. معًا، يمكننا خلق عالم أكثر أمانًا لأطفالنا."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transition-all hover:shadow-xl hover:scale-105 rounded-3xl border-2 border-purple-200 dark:border-purple-800 overflow-hidden group">
            <CardHeader className="space-y-1 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <div className="flex items-center gap-2 text-purple-600">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle>{language === "en" ? "Educational Resources" : "الموارد التعليمية"}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p>
                {language === "en"
                  ? "Access fun courses and interactive lessons for both parents and children."
                  : "الوصول إلى دورات ممتعة ودروس تفاعلية لكل من الآباء والأطفال."}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/educational-resources" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-xl group-hover:bg-purple-100 group-hover:text-purple-600"
                >
                  <span>{language === "en" ? "Explore" : "استكشاف"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="transition-all hover:shadow-xl hover:scale-105 rounded-3xl border-2 border-amber-200 dark:border-amber-800 overflow-hidden group">
            <CardHeader className="space-y-1 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
              <div className="flex items-center gap-2 text-amber-600">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <CardTitle>{language === "en" ? "Reporting" : "الإبلاغ"}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p>
                {language === "en"
                  ? "Report incidents and access real-time monitoring and alert systems."
                  : "الإبلاغ عن الحوادث والوصول إلى أنظمة المراقبة والتنبيه في الوقت الفعلي."}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/reporting" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-xl group-hover:bg-amber-100 group-hover:text-amber-600"
                >
                  <span>{language === "en" ? "Report" : "إبلاغ"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="transition-all hover:shadow-xl hover:scale-105 rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 overflow-hidden group">
            <CardHeader className="space-y-1 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
              <div className="flex items-center gap-2 text-emerald-600">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <CardTitle>{language === "en" ? "Community Alerts" : "تنبيهات المجتمع"}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p>
                {language === "en"
                  ? "Stay informed with local alerts and community awareness campaigns."
                  : "ابق على اطلاع بالتنبيهات المحلية وحملات التوعية المجتمعية."}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/community" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-xl group-hover:bg-emerald-100 group-hover:text-emerald-600"
                >
                  <span>{language === "en" ? "View Alerts" : "عرض التنبيهات"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="transition-all hover:shadow-xl hover:scale-105 rounded-3xl border-2 border-blue-200 dark:border-blue-800 overflow-hidden group">
            <CardHeader className="space-y-1 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <div className="flex items-center gap-2 text-blue-600">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <CardTitle>{language === "en" ? "Support Forums" : "منتديات الدعم"}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p>
                {language === "en"
                  ? "Connect with counselors and join moderated forums for support."
                  : "تواصل مع المستشارين وانضم إلى المنتديات المُدارة للحصول على الدعم."}
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/support" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-xl group-hover:bg-blue-100 group-hover:text-blue-600"
                >
                  <span>{language === "en" ? "Get Support" : "الحصول على الدعم"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="py-8">
        <Card className="bg-gradient-to-r from-purple-50 to-yellow-50 dark:from-purple-950 dark:to-yellow-950 border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-[40px] shadow-xl">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-full shadow-md animate-bounce-medium">
              <Bot className="h-14 w-14 text-purple-600" />
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold text-purple-600">
                {language === "en" ? "AI Guidance for Children" : "إرشاد الذكاء الاصطناعي للأطفال"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Our friendly AI assistant provides age-appropriate safety tips and fun guidance for children."
                  : "يقدم مساعدنا الذكي الاصطناعي الودود نصائح أمان مناسبة للعمر وإرشادات ممتعة للأطفال."}
              </p>
            </div>
            <Link href="/ai-assistant">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-lg px-6 py-6 h-auto">
                {language === "en" ? "Try AI Assistant" : "جرّب المساعد الذكي"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Link href="/ai-assistant">
          <Button size="lg" className="h-16 w-16 rounded-full bg-purple-600 hover:bg-purple-700 shadow-xl">
            <Bot className="h-8 w-8" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
