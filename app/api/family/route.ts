import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db"
import { getUserByEmail } from "@/lib/db-service"

// Generate a random family code
function generateFamilyCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// GET /api/family - Get family data
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await getUserByEmail(session.user.email)
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Get family members if user has a family code
    let familyMembers: any[] = []
    if (user.familyCode) {
      familyMembers = await prisma.user.findMany({
        where: { familyCode: user.familyCode },
        select: {
          id: true,
          name: true,
          email: true,
          userType: true,
          phoneNumber: true,
          dateOfBirth: true
        }
      })
    }

    return NextResponse.json({
      familyCode: user.familyCode,
      familyMembers
    })
  } catch (error) {
    console.error("Get family data error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/family - Join family
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { familyCode } = body

    if (!familyCode) {
      return NextResponse.json(
        { error: "Family code is required" },
        { status: 400 }
      )
    }

    const user = await getUserByEmail(session.user.email)
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Only independent children can join families
    if (user.userType !== "INDEPENDENT_CHILD") {
      return NextResponse.json(
        { error: "Only independent children can join families" },
        { status: 403 }
      )
    }

    // Check if family code exists
    const family = await prisma.family.findUnique({
      where: { code: familyCode }
    })

    if (!family) {
      return NextResponse.json(
        { error: "Invalid family code" },
        { status: 400 }
      )
    }

    // Update user's family code
    await prisma.user.update({
      where: { email: user.email },
      data: { familyCode }
    })

    return NextResponse.json({
      message: "Successfully joined family",
      familyCode
    })
  } catch (error) {
    console.error("Join family error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 