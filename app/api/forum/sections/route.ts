import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db"

// Get all forum sections
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    // Get all sections or filter by type
    const where = type ? { type: type as any } : {}
    
    const sections = await prisma.forumSection.findMany({
      where,
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    })

    // Filter sections based on user type
    const filteredSections = sections.filter(section => {
      if (section.type === "BOTH") return true;
      if (section.type === "PARENTS_ONLY" && session.user.userType === "PARENT") return true;
      if (section.type === "TEENS_ONLY" && (session.user.userType === "CHILD" || session.user.userType === "INDEPENDENT_CHILD")) return true;
      return false;
    })
    
    console.log(`User type: ${session.user.userType}, Filtered ${sections.length} -> ${filteredSections.length} sections`);

    return NextResponse.json(filteredSections)
  } catch (error) {
    console.error("Error fetching forum sections:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new forum section (admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only allow parents to create sections
    if (session.user.userType !== "PARENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { name, description, type } = body

    if (!name || !description || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const section = await prisma.forumSection.create({
      data: {
        name,
        description,
        type
      }
    })

    return NextResponse.json(section)
  } catch (error) {
    console.error("Error creating forum section:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 