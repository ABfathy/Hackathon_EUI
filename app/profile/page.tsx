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
    joinFamily: "Join Family",
    familyCode: "Family Code",
    enterCode: "Enter family code",
    copyCode: "Copy Code",
    codeCopied: "Code Copied!",
    familyMembers: "Family Members",
    noFamilyCode: "No family code assigned",
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
    joinFamily: "الانضمام إلى العائلة",
    familyCode: "رمز العائلة",
    enterCode: "أدخل رمز العائلة",
    copyCode: "نسخ الرمز",
    codeCopied: "تم نسخ الرمز!",
    familyMembers: "أعضاء العائلة",
    noFamilyCode: "لم يتم تعيين رمز العائلة",
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
        setFamilyMembers(data.familyMembers || [])
      }
    } catch (error) {
      console.error("Error fetching family data:", error)
      setFamilyMembers([])
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
      
      // Sign out without redirect parameter
      await signOut({ 
        redirect: false,
      });
      
      // Show success toast
      toast({
        title: t.signOutSuccess,
        duration: 1500
      });
      
      // Force page reload to clear any session state that might remain in memory
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      })
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

  // Get userType from session
  const userType = session.user.userType;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>{t.name}</Label>
            <p>{session?.user?.name}</p>
          </div>
          <div className="space-y-2">
            <Label>{t.email}</Label>
            <p>{session?.user?.email}</p>
          </div>

          {/* Family Management Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold">{t.familySection}</h3>
            
            {/* Family Code Display - Read Only */}
            <div className="space-y-2">
              <Label>{t.familyCode}</Label>
              {familyCode ? (
                <div className="flex items-center gap-2">
                  <Input
                    type={showFamilyCode ? "text" : "password"}
                    value={familyCode}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowFamilyCode(!showFamilyCode)}
                  >
                    {showFamilyCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    disabled={copied}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">{t.noFamilyCode}</p>
              )}
            </div>

            {/* Join Family Section - Only for independent children */}
            {!familyCode && userType && userType.toUpperCase() === "INDEPENDENT_CHILD" && (
              <div className="space-y-2">
                <Label>{t.joinFamily}</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder={t.enterCode}
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                  />
                  <Button
                    onClick={handleJoinFamily}
                    disabled={isLoading || !joinCode}
                  >
                    {t.joinFamily}
                  </Button>
                </div>
              </div>
            )}

            {/* Family Members List */}
            {familyMembers && familyMembers.length > 0 && (
              <div className="space-y-2">
                <Label>{t.familyMembers}</Label>
                <div className="space-y-2">
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                    >
                      <Users className="h-4 w-4" />
                      <span>{member.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ({member.userType && member.userType.toUpperCase() === "PARENT" ? t.parent : t.child})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                disabled={isSigningOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isSigningOut ? t.loading : t.signOut}
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
                <AlertDialogAction onClick={handleSignOut}>
                  {t.confirm}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
} 