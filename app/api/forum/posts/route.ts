import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db"

// Get all posts
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get("sectionId")

    if (!sectionId) {
      return NextResponse.json({ error: "Section ID is required" }, { status: 400 })
    }

    // Check if user has access to the section
    const section = await prisma.forumSection.findUnique({
      where: { id: sectionId }
    })

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }

    if (section.type === "PARENTS_ONLY" && session.user.userType !== "PARENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const posts = await prisma.forumPost.findMany({
      where: { sectionId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            userType: true
          }
        },
        _count: {
          select: {
            replies: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching forum posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new post
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, sectionId } = body

    if (!title || !content || !sectionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user has access to the section
    const section = await prisma.forumSection.findUnique({
      where: { id: sectionId }
    })

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }

    if (section.type === "PARENTS_ONLY" && session.user.userType !== "PARENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const post = await prisma.forumPost.create({
      data: {
        title,
        content,
        sectionId,
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

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error creating forum post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 