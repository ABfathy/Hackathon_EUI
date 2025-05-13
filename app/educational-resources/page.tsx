// Update the educational resources page to use the language context
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BookOpen, Play, Award, VolumeX, Volume2, Sparkles } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function EducationalResourcesPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto space-y-8 max-w-6xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <div className="bg-yellow-200 dark:bg-yellow-900 p-2 rounded-full animate-bounce-slow">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <span>{language === "en" ? "Educational Resources" : "الموارد التعليمية"}</span>
        </h1>
        <p className="text-muted-foreground">
          {language === "en"
            ? "Access fun, age-appropriate courses and interactive lessons for both parents and children."
            : "الوصول إلى دورات ممتعة ودروس تفاعلية مناسبة للعمر لكل من الآباء والأطفال."}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="voice-guidance" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            {language === "en" ? "Voice Guidance" : "التوجيه الصوتي"}
          </Label>
          <Switch id="voice-guidance" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {language === "en" ? "Overall Progress:" : "التقدم العام:"}
          </span>
          <Progress value={45} className="w-[200px]" />
          <span className="text-sm font-medium">45%</span>
        </div>
      </div>

      <Tabs defaultValue="parents" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger
            value="parents"
            className="rounded-lg data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600"
          >
            {language === "en" ? "For Parents" : "للآباء"}
          </TabsTrigger>
          <TabsTrigger
            value="children"
            className="rounded-lg data-[state=active]:bg-blue-100 data-[state=active]:text-blue-600"
          >
            {language === "en" ? "For Children" : "للأطفال"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parents" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course 1 */}
            <Card className="rounded-2xl hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {language === "en" ? "Recognizing Signs of Abuse" : "التعرف على علامات الإساءة"}
                  </CardTitle>
                  <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                    {language === "en" ? "Beginner" : "مبتدئ"}
                  </div>
                </div>
                <CardDescription>
                  {language === "en"
                    ? "Learn to identify warning signs and behavioral changes"
                    : "تعلم تحديد علامات التحذير والتغيرات السلوكية"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === "en" ? "Progress" : "التقدم"}</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <Progress value={60} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2 rounded-xl">
                  <Play className="h-4 w-4" />
                  {language === "en" ? "Continue Learning" : "متابعة التعلم"}
                </Button>
              </CardFooter>
            </Card>

            {/* Course 2 */}
            <Card className="rounded-2xl hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {language === "en" ? "Setting Healthy Boundaries" : "وضع حدود صحية"}
                  </CardTitle>
                  <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                    {language === "en" ? "Intermediate" : "متوسط"}
                  </div>
                </div>
                <CardDescription>
                  {language === "en"
                    ? "Teaching children about personal boundaries and consent"
                    : "تعليم الأطفال عن الحدود الشخصية والموافقة"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === "en" ? "Progress" : "التقدم"}</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <Progress value={30} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2 rounded-xl">
                  <Play className="h-4 w-4" />
                  {language === "en" ? "Continue Learning" : "متابعة التعلم"}
                </Button>
              </CardFooter>
            </Card>

            {/* Course 3 */}
            <Card className="rounded-2xl hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {language === "en" ? "Responding to Disclosures" : "الاستجابة للإفصاحات"}
                  </CardTitle>
                  <div className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                    {language === "en" ? "Advanced" : "متقدم"}
                  </div>
                </div>
                <CardDescription>
                  {language === "en"
                    ? "How to respond when a child discloses abuse"
                    : "كيفية الاستجابة عندما يفصح طفل عن الإساءة"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{language === "en" ? "Progress" : "التقدم"}</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <Progress value={0} />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl">
                  <Play className="h-4 w-4" />
                  {language === "en" ? "Start Course" : "بدء الدورة"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 rounded-2xl">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
                <Award className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-semibold">
                  {language === "en" ? "Parenting Certificate Program" : "برنامج شهادة الأبوة والأمومة"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "Complete all courses to earn a certificate in child protection and safety."
                    : "أكمل جميع الدورات للحصول على شهادة في حماية الطفل والسلامة."}
                </p>
              </div>
              <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-xl">
                {language === "en" ? "View Certificate Progress" : "عرض تقدم الشهادة"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children" className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Interactive Lesson 1 */}
            <Card className="rounded-2xl hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {language === "en" ? "My Body Belongs to Me" : "جسدي ملك لي"}
                  </CardTitle>
                  <div className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {language === "en" ? "Ages 4-7" : "الأعمار 4-7"}
                  </div>
                </div>
                <CardDescription>
                  {language === "en" ? "Interactive game teaching body autonomy" : "لعبة تفاعلية تعلم استقلالية الجسد"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2 rounded-xl">
                  <Play className="h-4 w-4" />
                  {language === "en" ? "Play Game" : "العب اللعبة"}
                </Button>
              </CardFooter>
            </Card>

            {/* Interactive Lesson 2 */}
            <Card className="rounded-2xl hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {language === "en" ? "Safe and Unsafe Secrets" : "الأسرار الآمنة وغير الآمنة"}
                  </CardTitle>
                  <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                    {language === "en" ? "Ages 8-12" : "الأعمار 8-12"}
                  </div>
                </div>
                <CardDescription>
                  {language === "en" ? "Learn which secrets are okay to keep" : "تعلم أي الأسرار يمكن الاحتفاظ بها"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2 rounded-xl">
                  <Play className="h-4 w-4" />
                  {language === "en" ? "Start Activity" : "بدء النشاط"}
                </Button>
              </CardFooter>
            </Card>

            {/* Interactive Lesson 3 */}
            <Card className="rounded-2xl hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{language === "en" ? "Digital Safety" : "السلامة الرقمية"}</CardTitle>
                  <div className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                    {language === "en" ? "Ages 13-17" : "الأعمار 13-17"}
                  </div>
                </div>
                <CardDescription>
                  {language === "en"
                    ? "Staying safe online and recognizing digital risks"
                    : "البقاء آمنًا عبر الإنترنت والتعرف على المخاطر الرقمية"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2 rounded-xl">
                  <Play className="h-4 w-4" />
                  {language === "en" ? "Start Module" : "بدء الوحدة"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-[40px] shadow-xl">
            <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md animate-bounce-medium">
                <Volume2 className="h-10 w-10 text-blue-600" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {language === "en" ? "Voice Guidance for Young Learners" : "التوجيه الصوتي للمتعلمين الصغار"}
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </h3>
                <p className="text-muted-foreground">
                  {language === "en"
                    ? "Enable voice narration to help younger children navigate through lessons."
                    : "تمكين السرد الصوتي لمساعدة الأطفال الأصغر سنًا على التنقل عبر الدروس."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <VolumeX className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                  <Volume2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
