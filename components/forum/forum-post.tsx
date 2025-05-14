import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface ForumPostProps {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    userType: string
  }
  _count: {
    replies: number
  }
  onClick?: () => void
}

export function ForumPost({ id, title, content, createdAt, author, _count, onClick }: ForumPostProps) {
  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "PARENT":
        return "bg-blue-500"
      case "CHILD":
      case "INDEPENDENT_CHILD":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{content}</p>
      <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
        <span>Posted by {author.name}</span>
        <span>{_count.replies} replies</span>
      </div>
    </div>
  )
} 