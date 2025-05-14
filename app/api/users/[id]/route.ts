import { NextRequest, NextResponse } from "next/server"
import { getUserById } from "@/lib/db-service"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string | string[] } }
) {
  try {
    // Extract the user ID safely using the params object provided by Next.js
    // Use Promise.resolve to ensure we properly handle params even if it's a promise
    const paramObj = await Promise.resolve(params);
    const userId = Array.isArray(paramObj.id) ? paramObj.id[0] : paramObj.id;

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only allow users to access their own data
    if (session.user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get user from database
    const user = await getUserById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user details with sensitive data removed
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      dateOfBirth: user.dateOfBirth,
      familyCode: user.familyCode,
      // Don't include password or other sensitive fields
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 