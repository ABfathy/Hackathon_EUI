"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { signIn } from "next-auth/react"

type Language = "en" | "ar"

const translations = {
  en: {
    title: "Welcome Back",
    subtitle: "Sign in to your account to continue",
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    register: "Don't have an account? Create one",
    error: "Invalid email or password",
    success: "Registration successful! Please sign in.",
    loading: "Signing in..."
  },
  ar: {
    title: "مرحباً بعودتك",
    subtitle: "سجل دخولك للمتابعة",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    register: "ليس لديك حساب؟ إنشاء حساب",
    error: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    success: "تم التسجيل بنجاح! يرجى تسجيل الدخول.",
    loading: "جاري تسجيل الدخول..."
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const t = translations[language as Language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError(t.error)
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      setError(t.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Wind className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl text-center font-bold">
            {t.title}
          </CardTitle>
          <CardDescription className="text-center">
            {t.subtitle}
          </CardDescription>
          {searchParams.get("registered") && (
            <div className="text-sm text-green-600 text-center">
              {t.success}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t.loading : t.signIn}
            </Button>
            <div className="text-center text-sm">
              <Link href="/register" className="text-primary hover:underline">
                {t.register}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
