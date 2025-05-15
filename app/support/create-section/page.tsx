'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/context/language-context"
import { useSession } from "next-auth/react"
import { ArrowLeft } from "lucide-react"

const translations = {
  en: {
    title: "Create New Forum Section",
    subtitle: "Create a new forum section for discussions",
    name: "Section Name",
    namePlaceholder: "Enter section name",
    description: "Description",
    descriptionPlaceholder: "Describe what this forum section is about",
    type: "Section Type",
    parentsOnly: "Parents Only",
    teensOnly: "Teens Only",
    both: "Both Parents and Teens",
    create: "Create Section",
    cancel: "Cancel",
    unauthorized: "You must be a parent to create forum sections",
    backToForums: "Back to Forums"
  },
  ar: {
    title: "إنشاء قسم منتدى جديد",
    subtitle: "إنشاء قسم منتدى جديد للمناقشات",
    name: "اسم القسم",
    namePlaceholder: "أدخل اسم القسم",
    description: "الوصف",
    descriptionPlaceholder: "صف ما يدور حوله هذا القسم",
    type: "نوع القسم",
    parentsOnly: "للآباء فقط",
    teensOnly: "للمراهقين فقط",
    both: "للآباء والمراهقين",
    create: "إنشاء قسم",
    cancel: "إلغاء",
    unauthorized: "يجب أن تكون أحد الوالدين لإنشاء أقسام المنتدى",
    backToForums: "العودة إلى المنتديات"
  }
}

export default function CreateSectionPage() {
  const { language } = useLanguage()
  const t = translations[language]
  const { data: session, status } = useSession()
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<"PARENTS_ONLY" | "TEENS_ONLY" | "BOTH">("BOTH")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !description) {
      setError("Please fill in all fields")
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch("/api/forum/sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          type
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to create section")
      }

      router.push("/support")
    } catch (error) {
      console.error("Error creating section:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="container mx-auto space-y-8 max-w-3xl py-8">
        <div className="flex items-center space-x-2">
          <div className="animate-spin h-5 w-5 border-2 border-purple-600 dark:border-purple-400 rounded-full border-t-transparent"></div>
          <p className="text-muted-foreground">{language === "en" ? "Loading..." : "جاري التحميل..."}</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || !session) {
    router.push("/support")
    return null
  }

  if (session.user.userType !== "PARENT") {
    return (
      <div className="container mx-auto space-y-8 max-w-3xl py-8">
        <Button variant="outline" onClick={() => router.push("/support")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.backToForums}
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{t.unauthorized}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.push("/support")}>
              {t.backToForums}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-8 max-w-3xl py-8">
      <Button variant="outline" onClick={() => router.push("/support")} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t.backToForums}
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                placeholder={t.descriptionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">{t.type}</Label>
              <Select
                value={type}
                onValueChange={(value: "PARENTS_ONLY" | "TEENS_ONLY" | "BOTH") => setType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.type} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PARENTS_ONLY">{t.parentsOnly}</SelectItem>
                  <SelectItem value="TEENS_ONLY">{t.teensOnly}</SelectItem>
                  <SelectItem value="BOTH">{t.both}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/support")}>
              {t.cancel}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-current rounded-full border-t-transparent mr-2"></div>
                  {language === "en" ? "Creating..." : "جاري الإنشاء..."}
                </div>
              ) : (
                t.create
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
