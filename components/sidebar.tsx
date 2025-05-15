"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, BookOpen, AlertTriangle, MapPin, MessageCircle, Shield, Menu, Bot, Globe, LogIn, Moon, Sun, Languages, User, LogOut, Users, Wind } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "next-themes"
import { useSession, signOut } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

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
    title: "Expert Counseling",
    titleAr: "استشارة الخبراء",
    href: "/expert-counseling",
    icon: <Users className="h-5 w-5" />,
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
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()
  const [isSigningOut, setIsSigningOut] = useState(false)

  // Only show theme toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle sign out with direct navigation
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      
      // Save theme preference before clearing storage
      const themePreference = localStorage.getItem('theme');
      
      // Clear localStorage and sessionStorage except theme preference
      // Instead of clearing everything, selectively remove auth-related items
      for (const key in localStorage) {
        // Skip theme-related keys
        if (key !== 'theme' && !key.includes('theme')) {
          localStorage.removeItem(key);
        }
      }
      
      // Clear session storage
      sessionStorage.clear();
      
      // Sign out with callbackUrl to ensure proper redirection
      await signOut({ 
        redirect: false,
        callbackUrl: '/login'
      });
      
      // Restore theme preference if it existed
      if (themePreference) {
        localStorage.setItem('theme', themePreference);
      }
      
      // Show success toast
      toast({
        title: language === "en" ? "Successfully signed out" : "تم تسجيل الخروج بنجاح",
        duration: 1500
      });
      
      // Force hard reload to clear any in-memory state
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
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
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 rounded-xl h-12 text-base border-purple-200 dark:border-gray-700"
            disabled={isSigningOut}
          >
            <LogOut className="h-5 w-5 text-purple-600 dark:text-gray-300" />
            <span className="truncate">{isSigningOut ? (language === "en" ? "Signing Out..." : "جاري الخروج...") : (language === "en" ? "Sign Out" : "تسجيل الخروج")}</span>
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
            {/* Updated Mobile Sidebar Bottom Section */}
            <div className="px-6 py-4 flex flex-col gap-3 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-t dark:border-gray-800 mt-2">
              {/* Profile buttons remain handled by renderAuthButtons() */}
              <div className="flex flex-col gap-3">
                {renderAuthButtons()}
              </div>
              
              {/* AI Assistant Button - Updated styling */}
              <Link href="/ai-assistant" className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-between rounded-xl h-12 text-base bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 border-purple-100 dark:border-gray-700 shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-lg">
                      <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="truncate">{language === "en" ? "AI Assistant" : "المساعد الذكي"}</span>
                  </div>
                  <div className="text-purple-500 text-xs px-1.5 py-0.5 bg-purple-50 dark:bg-purple-900/20 rounded-md dark:text-purple-300">
                    AI
                  </div>
                </Button>
              </Link>
              
              {/* Language & Theme Controls in a grid layout */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 rounded-xl py-2 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-gray-700 border border-purple-100 dark:border-gray-700 shadow-sm transition-all"
                >
                  <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm">{language === "en" ? "العربية" : "English"}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-2 rounded-xl py-2 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-gray-700 border border-purple-100 dark:border-gray-700 shadow-sm transition-all"
                >
                  {mounted && theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-indigo-500" />
                  )}
                  <span className="text-sm">{mounted && theme === "dark" ? "Light" : "Dark"}</span>
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col bg-background h-screen w-72 sticky top-0 rounded-r-3xl border-r-2 border-dashed border-purple-200 dark:border-gray-700">
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
        {/* Updated Desktop Sidebar Bottom Section */}
        <div className="p-5 space-y-3 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-t dark:border-gray-800 rounded-br-3xl">
          {/* Profile and sign out buttons */}
          <div className="flex flex-col gap-3 mb-3">
            {renderAuthButtons()}
          </div>
          
          {/* AI Assistant Button - Updated styling */}
          <Link href="/ai-assistant" className="w-full block">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between rounded-xl h-12 text-base bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-gray-700 border-purple-100 dark:border-gray-700 shadow-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-lg">
                  <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span>{language === "en" ? "AI Assistant" : "المساعد الذكي"}</span>
              </div>
              <div className="text-purple-500 text-xs px-1.5 py-0.5 bg-purple-50 dark:bg-purple-900/20 rounded-md dark:text-purple-300">
                AI
              </div>
            </Button>
          </Link>
          
          {/* Language & Theme Controls in a grid layout */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              className="flex items-center gap-2 rounded-xl py-2 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-gray-700 border border-purple-100 dark:border-gray-700 shadow-sm transition-all"
            >
              <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm">{language === "en" ? "العربية" : "English"}</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 rounded-xl py-2 bg-white/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-gray-700 border border-purple-100 dark:border-gray-700 shadow-sm transition-all"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-500" />
              ) : (
                <Moon className="h-4 w-4 text-indigo-500" />
              )}
              <span className="text-sm">{mounted && theme === "dark" ? "Light" : "Dark"}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
