import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ForumReplyProps {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    userType: string
  }
}

export function ForumReply({ content, createdAt, author }: ForumReplyProps) {
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
    <div className="flex gap-4 p-4 border-b last:border-b-0">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{author.name}</span>
          <Badge className={getUserTypeColor(author.userType)}>
            {author.userType === "PARENT" ? "Parent" : "Teen"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  )
} 