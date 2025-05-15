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
import { useToast } from "@/components/ui/use-toast"

const translations = {
  en: {
    title: "Create an Account",
    subtitle: "Join Nismah to protect and support children",
    name: "Name",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    userType: "I am a",
    parent: "Parent/Guardian",
    child: "Child",
    phoneNumber: "Phone Number",
    dateOfBirth: "Date of Birth",
    parentEmail: "Parent/Guardian Email",
    parentPhone: "Parent/Guardian Phone",
    register: "Register",
    login: "Already have an account? Sign in",
    error: "Error",
    success: "Success",
    registrationSuccess: "Registration successful! Redirecting to login...",
    passwordsDontMatch: "Passwords don't match",
    invalidEmail: "Invalid email format",
    invalidPhone: "Invalid phone number format",
    required: "This field is required",
    invalidDate: "Invalid date format (YYYY-MM-DD)",
    childRequirements: "Child registration requires parent information",
    independentChild: "Independent Child",
    userExists: "An account with this email already exists. Please try logging in or use a different email.",
    registrationFailed: "Registration failed. Please try again.",
    parentAccountNotFound: "The parent email you provided is not registered as a parent account. Please ensure the parent registers first."
  },
  ar: {
    title: "إنشاء حساب",
    subtitle: "انضم إلى نِسمة لحماية ودعم الأطفال",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    userType: "أنا",
    parent: "الوالد/الوصي",
    child: "الطفل",
    phoneNumber: "رقم الهاتف",
    dateOfBirth: "تاريخ الميلاد",
    parentEmail: "بريد الوالد/الوصي الإلكتروني",
    parentPhone: "رقم هاتف الوالد/الوصي",
    register: "تسجيل",
    login: "لديك حساب بالفعل؟ تسجيل الدخول",
    error: "خطأ",
    success: "نجاح",
    registrationSuccess: "تم التسجيل بنجاح! جاري التوجيه إلى صفحة تسجيل الدخول...",
    passwordsDontMatch: "كلمات المرور غير متطابقة",
    invalidEmail: "صيغة البريد الإلكتروني غير صالحة",
    invalidPhone: "صيغة رقم الهاتف غير صالحة",
    required: "هذا الحقل مطلوب",
    invalidDate: "صيغة التاريخ غير صالحة (YYYY-MM-DD)",
    childRequirements: "تسجيل الطفل يتطلب معلومات الوالد",
    independentChild: "طفل مستقل",
    userExists: "هذا البريد الإلكتروني مسجل بالفعل. يرجى تسجيل الدخول أو استخدام بريد إلكتروني آخر.",
    registrationFailed: "فشل التسجيل. يرجى المحاولة مرة أخرى.",
    parentAccountNotFound: "البريد الإلكتروني للوالد غير مسجل كحساب والد. يرجى التأكد من تسجيل الوالد أولاً."
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const { toast } = useToast()
  const t = translations[language]
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "PARENT",
    phoneNumber: "",
    dateOfBirth: "",
    parentEmail: "",
    parentPhone: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setEmailError("") // Clear any previous errors

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t.error,
        description: t.passwordsDontMatch,
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

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
          phoneNumber: formData.phoneNumber,
          dateOfBirth: formData.dateOfBirth,
          parentEmail: formData.parentEmail,
          parentPhone: formData.parentPhone
        })
      })

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Show success message with family code if it's a parent account
      if (formData.userType === "PARENT" && data.user && data.user.familyCode) {
        toast({
          title: t.success,
          description: `Registration successful! Your family code is: ${data.user.familyCode}. Please save this code as you'll need it to connect with your children's accounts.`,
          duration: 10000
        })
      } else {
        toast({
          title: t.success,
          description: t.registrationSuccess
        })
      }

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/login?registered=true")
      }, 2000)
    } catch (error) {
      // Handle error silently without logging to console
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      
      // Set the error message in state if it's a "User already exists" error
      if (errorMessage === "User already exists") {
        setEmailError(t.userExists);
      } else {
        toast({
          title: t.error,
          description: errorMessage,
          variant: "destructive",
          duration: 6000
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUserTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      userType: value
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
                className={emailError ? "border-red-500" : ""}
              />
              {emailError && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
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
              <Label>{t.userType}</Label>
              <RadioGroup
                value={formData.userType}
                onValueChange={handleUserTypeChange}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PARENT" id="parent" />
                  <Label htmlFor="parent">{t.parent}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="CHILD" id="child" />
                  <Label htmlFor="child">{t.child}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="INDEPENDENT_CHILD" id="independent_child" />
                  <Label htmlFor="independent_child">{t.independentChild}</Label>
                </div>
              </RadioGroup>
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

            {formData.userType === "CHILD" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">{t.parentEmail}</Label>
                  <Input
                    id="parentEmail"
                    name="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentPhone">{t.parentPhone}</Label>
                  <Input
                    id="parentPhone"
                    name="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
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