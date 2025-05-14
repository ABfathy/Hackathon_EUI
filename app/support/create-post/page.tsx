"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"

export default function CreatePostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  const { data: session, status } = useSession()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (status === "loading") return null
  if (status === "unauthenticated" || !session) {
    router.replace("/support")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content || !sectionId) {
      setError("All fields are required.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, sectionId }),
      })
      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to create post.")
        setLoading(false)
        return
      }
      let redirectSectionId = sectionId
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('lastCreateSectionId')
        if (stored) redirectSectionId = stored
        localStorage.removeItem('lastCreateSectionId')
      }
      router.replace(`/support?sectionId=${redirectSectionId}`)
    } catch (err) {
      setError("Failed to create post.")
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={loading}
            />
            <textarea
              className="w-full min-h-[120px] p-2 border rounded-md"
              placeholder="Write your post content here..."
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={loading}
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => {
                let redirectSectionId = sectionId
                if (typeof window !== 'undefined') {
                  const stored = localStorage.getItem('lastCreateSectionId')
                  if (stored) redirectSectionId = stored
                  localStorage.removeItem('lastCreateSectionId')
                }
                router.replace(`/support?sectionId=${redirectSectionId}`)
              }} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Submit Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 