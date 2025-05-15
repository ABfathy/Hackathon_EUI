import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db"

// Get all replies for a post
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId")

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    // Check if user has access to the post
    const post = await prisma.forumPost.findUnique({
      where: { id: postId },
      include: {
        section: true
      }
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (post.section.type === "PARENTS_ONLY" && session.user.userType !== "PARENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const replies = await prisma.forumReply.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            userType: true
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    })

    return NextResponse.json(replies)
  } catch (error) {
    console.error("Error fetching forum replies:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new reply
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { content, postId } = body

    if (!content || !postId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user has access to the post
    const post = await prisma.forumPost.findUnique({
      where: { id: postId },
      include: {
        section: true
      }
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    if (post.section.type === "PARENTS_ONLY" && session.user.userType !== "PARENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const reply = await prisma.forumReply.create({
      data: {
        content,
        postId,
        authorId: session.user.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            userType: true
          }
        }
      }
    })

    return NextResponse.json(reply)
  } catch (error) {
    console.error("Error creating forum reply:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 