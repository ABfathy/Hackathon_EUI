"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Wind, LogIn, UserPlus, Github, Mail } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function LoginPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-br from-yellow-200 to-purple-200 rounded-full text-purple-600 dark:from-yellow-800 dark:to-purple-800 dark:text-purple-300 animate-pulse shadow-lg mb-4">
            <Wind className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold">
            {language === "en" ? (
              <span className="text-purple-600">Nismah</span>
            ) : (
              <span className="text-emerald-600">نِسمة</span>
            )}
          </h1>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl p-1 mb-6">
            <TabsTrigger
              value="login"
              className="rounded-lg data-[state=active]:bg-purple-100 data-[state=active]:text-purple-600"
            >
              {language === "en" ? "Login" : "تسجيل الدخول"}
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="rounded-lg data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-600"
            >
              {language === "en" ? "Register" : "التسجيل"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-2 border-purple-200 dark:border-purple-800 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle>{language === "en" ? "Welcome back!" : "مرحبًا بعودتك!"}</CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Enter your credentials to access your account"
                    : "أدخل بيانات الاعتماد الخاصة بك للوصول إلى حسابك"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{language === "en" ? "Email" : "البريد الإلكتروني"}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === "en" ? "name@example.com" : "name@example.com"}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{language === "en" ? "Password" : "كلمة المرور"}</Label>
                    <Link href="#" className="text-xs text-purple-600 hover:underline">
                      {language === "en" ? "Forgot password?" : "نسيت كلمة المرور؟"}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder={language === "en" ? "••••••••" : "••••••••"}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    {language === "en" ? "Remember me" : "تذكرني"}
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-xl">
                  <LogIn className="mr-2 h-4 w-4" />
                  {language === "en" ? "Sign In" : "تسجيل الدخول"}
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {language === "en" ? "Or continue with" : "أو تابع باستخدام"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="rounded-xl">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle>{language === "en" ? "Create an account" : "إنشاء حساب"}</CardTitle>
                <CardDescription>
                  {language === "en" ? "Enter your information to create an account" : "أدخل معلوماتك لإنشاء حساب"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">{language === "en" ? "First name" : "الاسم الأول"}</Label>
                    <Input id="first-name" placeholder={language === "en" ? "John" : "محمد"} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">{language === "en" ? "Last name" : "اسم العائلة"}</Label>
                    <Input id="last-name" placeholder={language === "en" ? "Doe" : "أحمد"} className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">{language === "en" ? "Email" : "البريد الإلكتروني"}</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder={language === "en" ? "name@example.com" : "name@example.com"}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">{language === "en" ? "Password" : "كلمة المرور"}</Label>
                  <Input
                    id="password-register"
                    type="password"
                    placeholder={language === "en" ? "••••••••" : "••••••••"}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    {language === "en" ? "Confirm password" : "تأكيد كلمة المرور"}
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder={language === "en" ? "••••••••" : "••••••••"}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    {language === "en" ? "I agree to the terms and conditions" : "أوافق على الشروط والأحكام"}
                  </Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                  <UserPlus className="mr-2 h-4 w-4" />
                  {language === "en" ? "Create Account" : "إنشاء حساب"}
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      {language === "en" ? "Or continue with" : "أو تابع باستخدام"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="rounded-xl">
                    <Github className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button variant="outline" className="rounded-xl">
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-purple-600 hover:underline">
            {language === "en" ? "← Back to home" : "← العودة إلى الصفحة الرئيسية"}
          </Link>
        </div>
      </div>
    </div>
  )
}
