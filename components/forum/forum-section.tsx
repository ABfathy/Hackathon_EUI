import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Lock, UserCheck } from "lucide-react"
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
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PARENTS_ONLY":
        return <Lock className="h-4 w-4" />
      case "TEENS_ONLY":
        return <UserCheck className="h-4 w-4" />
      case "BOTH":
        return <Users className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PARENTS_ONLY":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800"
      case "TEENS_ONLY":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 border-purple-200 dark:border-purple-800"
      case "BOTH":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300 border-gray-200 dark:border-gray-800"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "PARENTS_ONLY":
        return "Parents Only"
      case "TEENS_ONLY":
        return "Teens Only"
      case "BOTH":
        return "Parents & Teens"
      default:
        return type
    }
  }

  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{name}</h3>
        <Badge variant="outline" className={`${getTypeColor(type)} flex items-center gap-1`}>
          {getTypeIcon(type)}
          <span>{getTypeLabel(type)}</span>
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <div className="flex items-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span className="font-semibold text-sm">{_count.posts}</span> posts
        </span>
      </div>
    </div>
  )
}