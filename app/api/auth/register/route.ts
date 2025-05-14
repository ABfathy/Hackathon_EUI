import { NextResponse } from "next/server"
import { createUser, getUserByEmail, createFamily } from "@/lib/db-service"
import { prisma } from "@/lib/db"

// Generate a random family code
function generateFamilyCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, userType, phoneNumber, dateOfBirth, parentEmail, parentPhone } = body

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
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    let familyCode: string | undefined
    let actualParentEmail: string | undefined = parentEmail // Store the input parentEmail

    // Handle family code generation based on user type
    if (userType === "PARENT") {
      // Generate new family code for parent
      familyCode = generateFamilyCode()
      await createFamily(familyCode)
    } else if (userType === "CHILD") {
      // Validate child registration
      if (!dateOfBirth) {
        return NextResponse.json(
          { error: "Date of birth is required for child accounts" },
          { status: 400 }
        )
      }

      // Calculate age
      const birthDate = new Date(dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
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

      if (!actualParentEmail || !parentPhone) {
        return NextResponse.json(
          { error: "Child registration requires parent contact information" },
          { status: 400 }
        )
      }

      // Validate parent exists
      const parent = await getUserByEmail(actualParentEmail)
      if (!parent || parent.userType !== "PARENT") {
        return NextResponse.json(
          { error: `Parent account with email ${actualParentEmail} not found. Please make sure the parent account exists and is registered as a parent.` },
          { status: 400 }
        )
      }
      // Use the canonical email from the parent's record for the foreign key
      actualParentEmail = parent.email;

      // Use parent's family code
      familyCode = parent.familyCode || undefined
      if (!familyCode) {
        // Generate new family code for parent if they don't have one
        familyCode = generateFamilyCode()
        await createFamily(familyCode)
        // Update parent's record with the new family code
        await prisma.user.update({
          where: { email: parent.email },
          data: { familyCode: familyCode },
        });
      }
    } else if (userType === "INDEPENDENT_CHILD") {
      // Generate new family code for independent child
      familyCode = generateFamilyCode()
      await createFamily(familyCode)
    }

    // Create user
    const createUserPayload = {
      name,
      email,
      password,
      userType,
      phoneNumber,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      familyCode,
      parentEmail: userType === "CHILD" ? actualParentEmail : null,
      parentPhone: userType === "CHILD" ? parentPhone : null,
    };

    console.log("REGISTER API: About to call createUser with payload:", JSON.stringify(createUserPayload, null, 2));

    const user = await createUser(createUserPayload)

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
    
    // Get a meaningful error message
    let errorMessage = "Internal server error";
    
    if (error instanceof Error) {
      // Send the actual error message for better client-side debugging
      errorMessage = error.message;
      
      // Handle specific error cases
      if (error.message.includes("Unique constraint failed")) {
        errorMessage = "An account with this email already exists";
        return NextResponse.json({ error: errorMessage }, { status: 409 });
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// DELETE /api/auth/register - Delete user
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Delete user from database
    await prisma.user.delete({
      where: { email }
    })

    return NextResponse.json({
      message: "User deleted successfully"
    })
  } catch (error) {
    console.error("Delete user error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 