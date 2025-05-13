"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signOut } from "next-auth/react"
import { useLanguage } from "@/context/language-context"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Copy, Check, Eye, EyeOff, LogOut } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const translations = {
  en: {
    title: "Profile",
    name: "Name",
    email: "Email",
    signOut: "Sign Out",
    signOutConfirm: "Are you sure you want to sign out?",
    signOutDescription: "You will need to sign in again to access your account.",
    cancel: "Cancel",
    confirm: "Confirm",
    signOutSuccess: "Successfully signed out",
    loading: "Loading...",
    unauthorized: "Please sign in to view your profile",
    signIn: "Sign In",
    familySection: "Family Management",
    generateCode: "Generate Family Code",
    joinFamily: "Join Family",
    familyCode: "Family Code",
    enterCode: "Enter family code",
    copyCode: "Copy Code",
    codeCopied: "Code Copied!",
    familyMembers: "Family Members",
    noFamilyCode: "No family code generated yet",
    noMembers: "No family members yet",
    parent: "Parent/Guardian",
    child: "Child",
    viewFamilyCode: "View Family Code"
  },
  ar: {
    title: "الملف الشخصي",
    name: "الاسم",
    email: "البريد الإلكتروني",
    signOut: "تسجيل الخروج",
    signOutConfirm: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
    signOutDescription: "ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك.",
    cancel: "إلغاء",
    confirm: "تأكيد",
    signOutSuccess: "تم تسجيل الخروج بنجاح",
    loading: "جاري التحميل...",
    unauthorized: "يرجى تسجيل الدخول لعرض ملفك الشخصي",
    signIn: "تسجيل الدخول",
    familySection: "إدارة العائلة",
    generateCode: "إنشاء رمز العائلة",
    joinFamily: "الانضمام إلى العائلة",
    familyCode: "رمز العائلة",
    enterCode: "أدخل رمز العائلة",
    copyCode: "نسخ الرمز",
    codeCopied: "تم نسخ الرمز!",
    familyMembers: "أعضاء العائلة",
    noFamilyCode: "لم يتم إنشاء رمز العائلة بعد",
    noMembers: "لا يوجد أعضاء في العائلة بعد",
    parent: "الوالد/الوصي",
    child: "الطفل",
    viewFamilyCode: "عرض رمز العائلة"
  }
}

function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { language } = useLanguage()
  const { toast } = useToast()
  const t = translations[language]
  const [familyCode, setFamilyCode] = useState<string | null>(null)
  const [familyMembers, setFamilyMembers] = useState<any[]>([])
  const [joinCode, setJoinCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showFamilyCode, setShowFamilyCode] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated") {
      fetchFamilyData()
    }
  }, [status, router])

  const fetchFamilyData = async () => {
    try {
      const response = await fetch("/api/family")
      if (response.ok) {
        const data = await response.json()
        setFamilyCode(data.familyCode)
        setFamilyMembers(data.members)
      }
    } catch (error) {
      console.error("Error fetching family data:", error)
    }
  }

  const handleGenerateCode = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/family", {
        method: "POST"
      })
      if (response.ok) {
        const data = await response.json()
        setFamilyCode(data.familyCode)
        toast({
          title: "Success",
          description: "Family code generated successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate family code",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinFamily = async () => {
    if (!joinCode) return
    setIsLoading(true)
    try {
      const response = await fetch("/api/family", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ familyCode: joinCode })
      })
      if (response.ok) {
        await fetchFamilyData()
        setJoinCode("")
        toast({
          title: "Success",
          description: "Successfully joined family"
        })
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to join family",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join family",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (familyCode) {
      await navigator.clipboard.writeText(familyCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      
      // Just sign out without deleting data
      await signOut({ 
        callbackUrl: "/login",
        redirect: true
      })
      
      toast({
        title: t.signOutSuccess,
        duration: 3000
      })
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      })
    } finally {
      setIsSigningOut(false)
    }
  }

  if (status === "loading") {
    return <ProfileSkeleton />
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
        <p className="text-lg">{t.unauthorized}</p>
        <Button onClick={() => router.push("/login")}>
          {t.signIn}
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">{t.name}</h3>
            <p>{session.user?.name}</p>
          </div>
          <div>
            <h3 className="font-medium">{t.email}</h3>
            <p>{session.user?.email}</p>
          </div>
          <div>
            <h3 className="font-medium">{t.familyCode}</h3>
            {familyCode ? (
              <div className="flex items-center gap-2">
                <Input 
                  value={showFamilyCode ? familyCode : "••••••"} 
                  readOnly 
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFamilyCode(!showFamilyCode)}
                >
                  {showFamilyCode ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                {showFamilyCode && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">{t.noFamilyCode}</p>
            )}
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full sm:w-auto"
                disabled={isSigningOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {t.signOut}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t.signOutConfirm}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t.signOutDescription}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleSignOut}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {t.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t.familySection}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">{t.familyMembers}</h3>
            {familyMembers.length > 0 ? (
              <div className="space-y-2">
                {familyMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {member.userType === "parent" ? t.parent : t.child}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">{t.noMembers}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 