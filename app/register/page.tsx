"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Wind } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "parent",
    familyCode: "",
    phoneNumber: "",
    dateOfBirth: ""
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { language } = useLanguage()

  const translations = {
    en: {
      title: "Create an Account",
      subtitle: "Join Nismah to protect and support children",
      name: "Full Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      register: "Create Account",
      login: "Already have an account? Sign in",
      error: "An error occurred. Please try again.",
      passwordMismatch: "Passwords do not match",
      userType: "Account Type",
      parent: "Parent/Guardian",
      child: "Child (Under 18)",
      familyCode: "Family Code (Optional)",
      familyCodeDescription: "Enter your family code to link accounts",
      phoneNumber: "Phone Number",
      dateOfBirth: "Date of Birth",
      forChildAccounts: "For Child Accounts",
      parentEmail: "Parent/Guardian Email",
      parentPhone: "Parent/Guardian Phone"
    },
    ar: {
      title: "إنشاء حساب",
      subtitle: "انضم إلى نِسمة لحماية ودعم الأطفال",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      register: "إنشاء حساب",
      login: "لديك حساب بالفعل؟ تسجيل الدخول",
      error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      passwordMismatch: "كلمات المرور غير متطابقة",
      userType: "نوع الحساب",
      parent: "الوالد/الوصي",
      child: "الطفل (أقل من 18)",
      familyCode: "رمز العائلة (اختياري)",
      familyCodeDescription: "أدخل رمز العائلة لربط الحسابات",
      phoneNumber: "رقم الهاتف",
      dateOfBirth: "تاريخ الميلاد",
      forChildAccounts: "لحسابات الأطفال",
      parentEmail: "بريد الوالد/الوصي الإلكتروني",
      parentPhone: "هاتف الوالد/الوصي"
    }
  }

  const t = translations[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError(t.passwordMismatch)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          familyCode: formData.familyCode,
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth
        })
      })

      if (!response.ok) {
        throw new Error("Registration failed")
      }

      router.push("/login?registered=true")
    } catch (error) {
      setError(t.error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
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
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>{t.userType}</Label>
              <RadioGroup
                defaultValue="parent"
                onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parent" id="parent" />
                  <Label htmlFor="parent">{t.parent}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="child" id="child" />
                  <Label htmlFor="child">{t.child}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t.phoneNumber}</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">{t.dateOfBirth}</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familyCode">{t.familyCode}</Label>
              <Input
                id="familyCode"
                name="familyCode"
                type="text"
                value={formData.familyCode}
                onChange={handleChange}
                placeholder={t.familyCodeDescription}
              />
            </div>

            {formData.userType === "child" && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <h3 className="font-medium">{t.forChildAccounts}</h3>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">{t.parentEmail}</Label>
                  <Input
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">{t.parentPhone}</Label>
                  <Input
                    id="parentPhone"
                    name="parentPhone"
                    type="tel"
                    required
                  />
                </div>
              </div>
            )}

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
              {isLoading ? "Loading..." : t.register}
            </Button>

            <div className="text-center text-sm">
              <Link href="/login" className="text-primary hover:underline">
                {t.login}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 