import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

interface User {
  id: string
  name: string
  email: string
  password: string
  userType: "parent" | "child"
  phoneNumber?: string
  dateOfBirth?: string
  familyCode?: string
  parentEmail?: string
  parentPhone?: string
  createdAt: Date
}

// In-memory storage for users (replace with database in production)
export let users: User[] = []

// In-memory storage for family codes (replace with database in production)
export let familyCodes: { [key: string]: string[] } = {}

// Generate a random family code
function generateFamilyCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, userType, phoneNumber, dateOfBirth, familyCode, parentEmail, parentPhone } = body

    // Validate required fields
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Validate child registration
    if (userType === "child") {
      if (!dateOfBirth || !parentEmail || !parentPhone) {
        return NextResponse.json(
          { error: "Child registration requires date of birth and parent contact information" },
          { status: 400 }
        )
      }

      // Calculate age
      const birthDate = new Date(dateOfBirth)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      // Validate age (must be under 18)
      if (age >= 18) {
        return NextResponse.json(
          { error: "Child must be under 18 years old" },
          { status: 400 }
        )
      }

      // Validate parent exists
      const parent = users.find(user => user.email === parentEmail && user.userType === "parent")
      if (!parent) {
        return NextResponse.json(
          { error: "Parent account not found" },
          { status: 400 }
        )
      }

      // Use parent's family code
      if (parent.familyCode) {
        body.familyCode = parent.familyCode
      } else {
        // Generate new family code for parent if they don't have one
        const newFamilyCode = generateFamilyCode()
        parent.familyCode = newFamilyCode
        familyCodes[newFamilyCode] = [parent.id]
        body.familyCode = newFamilyCode
      }
    } else if (userType === "parent") {
      // Generate family code for new parent
      const newFamilyCode = generateFamilyCode()
      body.familyCode = newFamilyCode
      familyCodes[newFamilyCode] = []
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      password: hashedPassword,
      userType,
      phoneNumber,
      dateOfBirth,
      familyCode: body.familyCode,
      parentEmail,
      parentPhone,
      createdAt: new Date()
    }

    users.push(user)

    // Add user to family if they have a family code
    if (user.familyCode) {
      if (!familyCodes[user.familyCode]) {
        familyCodes[user.familyCode] = []
      }
      familyCodes[user.familyCode].push(user.id)
    }

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        familyCode: user.familyCode
      }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 