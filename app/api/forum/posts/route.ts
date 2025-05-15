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
    const sectionType = searchParams.get("sectionType")

    if (!sectionId && !sectionType) {
      return NextResponse.json({ error: "Section ID or Section Type is required" }, { status: 400 })
    }

    let posts;
    
    if (sectionId) {
      // Traditional lookup by section ID
      const section = await prisma.forumSection.findUnique({
        where: { id: sectionId }
      })

      if (!section) {
        return NextResponse.json({ error: "Section not found" }, { status: 404 })
      }

      if (section.type === "PARENTS_ONLY" && session.user.userType !== "PARENT") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }

      posts = await prisma.forumPost.findMany({
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
    } else {
      // Lookup by section type
      if (sectionType === "PARENTS_ONLY" && session.user.userType !== "PARENT") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
      
      if (sectionType === "TEENS_ONLY" && 
          session.user.userType !== "CHILD" && 
          session.user.userType !== "INDEPENDENT_CHILD") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }

      // Get all sections of the given type
      const sections = await prisma.forumSection.findMany({
        where: { type: sectionType as any }
      })
      
      if (!sections || sections.length === 0) {
        return NextResponse.json([])
      }

      const sectionIds = sections.map(section => section.id)
      
      posts = await prisma.forumPost.findMany({
        where: { 
          sectionId: { in: sectionIds } 
        },
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
    }

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

    // Check permissions by section type
    if (section.type === "PARENTS_ONLY" && session.user.userType !== "PARENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    
    // Teens can only post in teens-only or both sections
    if (section.type === "TEENS_ONLY" && 
        session.user.userType !== "CHILD" && 
        session.user.userType !== "INDEPENDENT_CHILD") {
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