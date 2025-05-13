import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { users, familyCodes } from "../auth/register/route"

// Generate a random family code
function generateFamilyCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

// GET /api/family - Get family members
export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = users.find(u => u.email === session.user.email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If user has a family code, get all family members
    if (user.familyCode) {
      const familyMemberIds = familyCodes[user.familyCode] || []
      const familyMembers = users
        .filter(u => familyMemberIds.includes(u.id))
        .map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          userType: u.userType
        }))

      return NextResponse.json({
        familyCode: user.familyCode,
        members: familyMembers
      })
    }

    return NextResponse.json({
      familyCode: null,
      members: []
    })
  } catch (error) {
    console.error("Family API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT /api/family/join - Join a family using a code
export async function PUT(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { familyCode } = await request.json()
    if (!familyCode) {
      return NextResponse.json({ error: "Family code is required" }, { status: 400 })
    }

    const user = users.find(u => u.email === session.user.email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Check if family code exists
    if (!familyCodes[familyCode]) {
      return NextResponse.json({ error: "Invalid family code" }, { status: 400 })
    }

    // Only independent children can join a family
    if (user.userType !== "independent_child") {
      return NextResponse.json({ 
        error: "Only independent children can join a family using a code" 
      }, { status: 400 })
    }

    // Add user to family
    user.familyCode = familyCode
    familyCodes[familyCode].push(user.id)

    return NextResponse.json({ message: "Successfully joined family" })
  } catch (error) {
    console.error("Family API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 