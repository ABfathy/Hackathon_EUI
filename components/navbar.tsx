"use client"

import { useSession } from "next-auth/react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { Wind } from "lucide-react"

const translations = {
  en: {
    signIn: "Sign In",
    signOut: "Sign Out",
    profile: "Profile",
    home: "Home",
    resources: "Resources",
    support: "Support"
  },
  ar: {
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    profile: "الملف الشخصي",
    home: "الرئيسية",
    resources: "الموارد",
    support: "الدعم"
  }
}

export default function Navbar() {
  const { data: session } = useSession()
  const { language } = useLanguage()
  const router = useRouter()
  const t = translations[language]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="inline-block p-2 bg-gradient-to-br from-yellow-200 to-purple-200 rounded-full text-purple-600 dark:from-yellow-800 dark:to-purple-800 dark:text-purple-300 animate-pulse shadow-md">
                <Wind className="h-5 w-5" />
              </div>
              <span className="font-semibold">
                {language === "en" ? (
                  <span className="text-purple-600">Nismah</span>
                ) : (
                  <span className="text-emerald-600">نِسمة</span>
                )}
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm hover:text-primary transition-colors">
                {t.home}
              </Link>
              <Link href="/educational-resources" className="text-sm hover:text-primary transition-colors">
                {t.resources}
              </Link>
              <Link href="/support" className="text-sm hover:text-primary transition-colors">
                {t.support}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm hidden md:inline-block">
                  {session.user?.name || session.user?.email}
                </span>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/profile")}
                >
                  {t.profile}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  {t.signOut}
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={() => router.push("/login")}
              >
                {t.signIn}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 