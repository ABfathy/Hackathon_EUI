"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, BookOpen, AlertTriangle, MapPin, MessageCircle, Wind, Menu, Bot, Globe, LogIn, Moon, Sun, Languages, User, LogOut } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"

interface NavItem {
  title: string
  titleAr: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "Home",
    titleAr: "الرئيسية",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Educational Resources",
    titleAr: "الموارد التعليمية",
    href: "/educational-resources",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Reporting & Monitoring",
    titleAr: "الإبلاغ والمراقبة",
    href: "/reporting",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  {
    title: "Community Awareness",
    titleAr: "التوعية المجتمعية",
    href: "/community",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    title: "Support Forum",
    titleAr: "منتدى الدعم",
    href: "/support",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    title: "Security & Privacy",
    titleAr: "الأمان والخصوصية",
    href: "/security",
    icon: <Wind className="h-5 w-5" />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()

  // Only show theme toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const renderAuthButtons = () => {
    if (session) {
      return (
        <>
          <Link href="/profile" className="w-full">
            <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-purple-200 dark:border-gray-700">
              <User className="h-5 w-5 text-purple-600 dark:text-gray-300" />
              <span className="truncate">{session.user?.name || session.user?.email}</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-purple-200 dark:border-gray-700"
          >
            <LogOut className="h-5 w-5 text-purple-600 dark:text-gray-300" />
            <span className="truncate">{language === "en" ? "Sign Out" : "تسجيل الخروج"}</span>
          </Button>
        </>
      )
    }

    return (
      <Link href="/login" className="w-full">
        <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-purple-200 dark:border-gray-700">
          <LogIn className="h-5 w-5 text-purple-600 dark:text-gray-300" />
          <span className="truncate">{language === "en" ? "Login / Register" : "تسجيل الدخول / التسجيل"}</span>
        </Button>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40 rounded-full">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 rounded-r-3xl w-[85vw] sm:w-[400px]"
          title={language === "en" ? "Navigation Menu" : "قائمة التنقل"}
        >
          <div className="flex h-full flex-col">
            <div className="p-6">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <div className="bg-yellow-200 dark:bg-gray-800/50 p-3 rounded-full animate-pulse">
                  <Wind className="h-6 w-6 text-purple-600 dark:text-gray-300" />
                </div>
                {language === "en" ? (
                  <span className="text-purple-600 dark:text-gray-200">Nismah</span>
                ) : (
                  <span className="text-emerald-600 dark:text-gray-200">نِسمة</span>
                )}
              </h2>
            </div>
            <ScrollArea className="flex-1">
              <div className="px-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all hover:text-purple-600 border border-transparent hover:border-purple-200",
                        pathname === item.href
                          ? "bg-gradient-to-r from-purple-50 to-emerald-50 text-purple-600 dark:bg-gray-800/50 dark:text-gray-200 border-purple-200 dark:border-gray-700"
                          : "text-muted-foreground hover:bg-purple-50 dark:hover:bg-gray-800/30 dark:text-gray-400",
                      )}
                    >
                      <div className="bg-white dark:bg-gray-800/50 p-2 rounded-full shadow-sm">
                        {React.cloneElement(item.icon as React.ReactElement<any>, {
                          className: "h-5 w-5 text-purple-600 dark:text-gray-300"
                        })}
                      </div>
                      <div className="truncate">{language === "en" ? item.title : item.titleAr}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollArea>
            <div className="px-4 flex flex-col gap-2">
              {renderAuthButtons()}
              <Link href="/ai-assistant" className="w-full">
                <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-purple-200 dark:border-gray-700">
                  <Bot className="h-5 w-5 text-purple-600 dark:text-gray-300" />
                  <span className="truncate">{language === "en" ? "AI Assistant" : "المساعد الذكي"}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-2 border-dashed border-purple-200 dark:border-gray-700"
              >
                <Globe className="h-5 w-5 text-purple-600 dark:text-gray-300" />
                <span className="truncate">{language === "en" ? "العربية" : "English"}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-2 border-dashed border-purple-200 dark:border-gray-700"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5 text-purple-600 dark:text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-purple-600 dark:text-gray-300" />
                )}
                <span>{mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col border-r bg-background h-screen w-72 sticky top-0 rounded-r-3xl border-r-2 border-dashed border-purple-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <div className="bg-yellow-200 dark:bg-gray-800/50 p-3 rounded-full animate-pulse">
              <Wind className="h-6 w-6 text-purple-600 dark:text-gray-300" />
            </div>
            {language === "en" ? (
              <span className="text-purple-600 dark:text-gray-200">Nismah</span>
            ) : (
              <span className="text-emerald-600 dark:text-gray-200">نِسمة</span>
            )}
          </h2>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all hover:text-purple-600 border border-transparent hover:border-purple-200",
                  pathname === item.href
                    ? "bg-gradient-to-r from-purple-50 to-emerald-50 text-purple-600 dark:bg-gray-800/50 dark:text-gray-200 border-purple-200 dark:border-gray-700"
                    : "text-muted-foreground hover:bg-purple-50 dark:hover:bg-gray-800/30 dark:text-gray-400",
                )}
              >
                <div className="bg-white dark:bg-gray-800/50 p-2 rounded-full shadow-sm">
                  {React.cloneElement(item.icon as React.ReactElement<any>, {
                    className: "h-5 w-5 text-purple-600 dark:text-gray-300"
                  })}
                </div>
                <div>{language === "en" ? item.title : item.titleAr}</div>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
          {renderAuthButtons()}
          <Link href="/ai-assistant" className="w-full">
            <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-gray-200 dark:border-gray-700">
              <Bot className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span>{language === "en" ? "AI Assistant" : "المساعد الذكي"}</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-2 border-dashed border-purple-200 dark:border-gray-700"
          >
            <Globe className="h-5 w-5 text-purple-600 dark:text-gray-300" />
            <span>{language === "en" ? "العربية" : "English"}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-2 border-dashed border-purple-200 dark:border-gray-700"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-5 w-5 text-purple-600 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-purple-600 dark:text-gray-300" />
            )}
            <span>{mounted && theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </Button>
        </div>
      </div>
    </>
  )
}
