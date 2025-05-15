"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react"
import { prisma } from "@/lib/db"

export default function CreatePostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")
  const sectionType = searchParams.get("sectionType")
  const { data: session, status } = useSession()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null)

  useEffect(() => {
    const fetchSectionId = async () => {
      if (sectionId) {
        setTargetSectionId(sectionId)
        return
      }
      
      if (sectionType) {
        try {
          // Find or create a section of the given type
          const response = await fetch(`/api/forum/sections?type=${sectionType}`, {
            method: "GET",
          })
          
          if (response.ok) {
            const data = await response.json()
            console.log("Available sections for type:", sectionType, data)
            
            if (data && data.length > 0) {
              // Always use the first section of this type to maintain consistency
              setTargetSectionId(data[0].id)
              console.log("Using existing section ID:", data[0].id)
            } else {
              // No section found, must create one
              console.log("No existing section found for type:", sectionType, "creating new section")
              
              const createResponse = await fetch("/api/forum/sections", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: sectionType === "PARENTS_ONLY" ? "Parents Only Forum" : 
                         sectionType === "TEENS_ONLY" ? "Teens Only Forum" : "Parents & Teens Forum",
                  description: sectionType === "PARENTS_ONLY" ? 
                    "A safe space for parents to discuss child safety concerns" : 
                    sectionType === "TEENS_ONLY" ? 
                    "A supportive community for teens to share and support each other" : 
                    "Collaborative space for families to discuss safety together",
                  type: sectionType
                })
              })
              
              if (createResponse.ok) {
                const newSection = await createResponse.json()
                setTargetSectionId(newSection.id)
              } else {
                setError("Failed to create section")
              }
            }
          } else {
            setError("Failed to fetch section")
          }
        } catch (err) {
          setError("Error processing section")
        }
      }
    }
    
    fetchSectionId()
  }, [sectionId, sectionType])

  if (status === "loading") return null
  if (status === "unauthenticated" || !session) {
    router.replace("/support")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content || !targetSectionId) {
      setError("All fields are required.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      console.log("Creating post with section ID:", targetSectionId);
      
      const response = await fetch("/api/forum/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, sectionId: targetSectionId }),
      })
      if (!response.ok) {
        const data = await response.json()
        console.error("Error creating post:", data);
        setError(data.error || "Failed to create post.")
        setLoading(false)
        return
      }
      
      const post = await response.json();
      console.log("Post created successfully:", post);
      
      // Determine where to redirect based on section type
      let redirectParam = ""
      if (sectionType) {
        if (sectionType === "PARENTS_ONLY") {
          redirectParam = "sectionId=parents-only"
        } else if (sectionType === "TEENS_ONLY") {
          redirectParam = "sectionId=teens-only" 
        } else if (sectionType === "BOTH") {
          redirectParam = "sectionId=parents-and-teens"
        }
      } else if (sectionId) {
        redirectParam = `sectionId=${sectionId}`
      }
      
      // Always redirect to support page with the correct section parameter
      router.replace(`/support?${redirectParam}`)
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
                // Determine where to redirect based on section type
                let redirectParam = ""
                if (sectionType) {
                  if (sectionType === "PARENTS_ONLY") {
                    redirectParam = "sectionId=parents-only"
                  } else if (sectionType === "TEENS_ONLY") {
                    redirectParam = "sectionId=teens-only" 
                  } else if (sectionType === "BOTH") {
                    redirectParam = "sectionId=parents-and-teens"
                  }
                } else if (sectionId) {
                  redirectParam = `sectionId=${sectionId}`
                }
                
                router.replace(`/support?${redirectParam}`)
              }} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !targetSectionId}>
                {loading ? "Posting..." : "Submit Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 