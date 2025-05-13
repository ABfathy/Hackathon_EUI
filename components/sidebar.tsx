"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, BookOpen, AlertTriangle, MapPin, MessageCircle, Shield, Menu, Bot, Globe, LogIn } from "lucide-react"
import { useLanguage } from "@/context/language-context"

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
    icon: <Shield className="h-5 w-5" />,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

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
        <SheetContent side="left" className="p-0 rounded-r-3xl">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                <div className="bg-yellow-200 dark:bg-yellow-900 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                {language === "en" ? (
                  <span className="text-purple-600">SafeGuard</span>
                ) : (
                  <span className="text-emerald-600">حماية</span>
                )}
              </h2>
            </div>
            <div className="px-2">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-1 p-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all hover:text-purple-600 border border-transparent hover:border-purple-200",
                        pathname === item.href
                          ? "bg-gradient-to-r from-purple-50 to-emerald-50 text-purple-600 dark:bg-gradient-to-r dark:from-purple-950 dark:to-emerald-950 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                          : "text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-950",
                      )}
                    >
                      <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">{item.icon}</div>
                      <div>{language === "en" ? item.title : item.titleAr}</div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="px-4 flex flex-col gap-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base">
                  <LogIn className="h-5 w-5" />
                  <span>{language === "en" ? "Login / Register" : "تسجيل الدخول / التسجيل"}</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base">
                <Bot className="h-5 w-5" />
                <span>{language === "en" ? "AI Assistant" : "المساعد الذكي"}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-2 border-dashed border-purple-200 dark:border-purple-800"
              >
                <Globe className="h-5 w-5" />
                <span>{language === "en" ? "العربية" : "English"}</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col border-r bg-background h-screen w-72 sticky top-0 rounded-r-3xl border-r-2 border-dashed border-purple-200 dark:border-purple-800">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <div className="bg-yellow-200 dark:bg-yellow-900 p-3 rounded-full">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            {language === "en" ? (
              <span className="text-purple-600">SafeGuard</span>
            ) : (
              <span className="text-emerald-600">حماية</span>
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
                    ? "bg-gradient-to-r from-purple-50 to-emerald-50 text-purple-600 dark:bg-gradient-to-r dark:from-purple-950 dark:to-emerald-950 dark:text-purple-400 border-purple-200 dark:border-purple-800"
                    : "text-muted-foreground hover:bg-purple-50 dark:hover:bg-purple-950",
                )}
              >
                <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">{item.icon}</div>
                <div>{language === "en" ? item.title : item.titleAr}</div>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 space-y-2 border-t">
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base">
              <LogIn className="h-5 w-5" />
              <span>{language === "en" ? "Login / Register" : "تسجيل الدخول / التسجيل"}</span>
            </Button>
          </Link>
          <Button variant="outline" className="w-full flex items-center gap-2 rounded-xl h-12 text-base">
            <Bot className="h-5 w-5" />
            <span>{language === "en" ? "AI Assistant" : "المساعد الذكي"}</span>
          </Button>
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-2 border-dashed border-purple-200 dark:border-purple-800"
          >
            <Globe className="h-5 w-5" />
            <span>{language === "en" ? "العربية" : "English"}</span>
          </Button>
        </div>
      </div>
    </>
  )
}
