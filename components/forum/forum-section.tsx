import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import Link from "next/link"

interface ForumSectionProps {
  id: string
  name: string
  description: string
  type: "PARENTS_ONLY" | "TEENS_ONLY" | "BOTH"
  _count: {
    posts: number
  }
  onClick?: () => void
}

export function ForumSection({ id, name, description, type, _count, onClick }: ForumSectionProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "PARENTS_ONLY":
        return "bg-blue-500"
      case "TEENS_ONLY":
        return "bg-purple-500"
      case "BOTH":
        return "bg-emerald-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
        <span>{type === "PARENTS_ONLY" ? "Parents Only" : type === "TEENS_ONLY" ? "Teens Only" : "Both"}</span>
        <span>{_count.posts} posts</span>
      </div>
    </div>
  )
} 