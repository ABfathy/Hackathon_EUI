import { prisma } from "@/lib/db"
import { v4 as uuidv4 } from 'uuid'

// Generate unique email for testing
const generateUniqueEmail = () => `test_${uuidv4().substring(0, 8)}@example.com`

async function testRegistration() {
  console.log("\n=== Testing Registration ===")
  
  // Generate unique emails for test
  const parentEmail = generateUniqueEmail()
  const childEmail = generateUniqueEmail()
  const independentChildEmail = generateUniqueEmail()
  
  // Test parent registration
  const parentData = {
    name: "Test Parent",
    email: parentEmail,
    password: "test123",
    userType: "PARENT",
    phoneNumber: "+1234567890"
  }

  try {
    console.log("Registering parent:", parentData.email)
    const parentResponse = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parentData)
    })

    let parentResult
    const parentText = await parentResponse.text()
    try {
      parentResult = JSON.parse(parentText)
    } catch (e) {
      console.error("Failed to parse parent registration response:", parentText)
      throw new Error("Invalid response from parent registration")
    }
    
    console.log("Parent Registration:", parentResult)

    // Test child registration
    const childData = {
      name: "Test Child",
      email: childEmail,
      password: "test123",
      userType: "CHILD",
      phoneNumber: "+1234567891",
      dateOfBirth: "2010-01-01",
      parentEmail: parentEmail,
      parentPhone: "+1234567890"
    }

    console.log("Registering child:", childData.email)
    const childResponse = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(childData)
    })

    let childResult
    const childText = await childResponse.text()
    try {
      childResult = JSON.parse(childText)
    } catch (e) {
      console.error("Failed to parse child registration response:", childText)
      throw new Error("Invalid response from child registration")
    }
    
    console.log("Child Registration:", childResult)

    // Test independent child registration
    const independentChildData = {
      name: "Test Independent Child",
      email: independentChildEmail,
      password: "test123",
      userType: "INDEPENDENT_CHILD",
      phoneNumber: "+1234567892",
      dateOfBirth: "2010-01-01"
    }

    console.log("Registering independent child:", independentChildData.email)
    const independentChildResponse = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(independentChildData)
    })

    let independentChildResult
    const independentChildText = await independentChildResponse.text()
    try {
      independentChildResult = JSON.parse(independentChildText)
    } catch (e) {
      console.error("Failed to parse independent child registration response:", independentChildText)
      throw new Error("Invalid response from independent child registration")
    }
    
    console.log("Independent Child Registration:", independentChildResult)
    
    return {
      parentEmail,
      childEmail,
      independentChildEmail,
      parentFamilyCode: parentResult.user?.familyCode
    }
  } catch (error) {
    console.error("Registration test failed:", error)
    return {
      parentEmail,
      childEmail,
      independentChildEmail,
      parentFamilyCode: null
    }
  }
}

async function cleanup(emails: { parentEmail: string, childEmail: string, independentChildEmail: string }) {
  console.log("\n=== Cleaning Up ===")
  
  try {
    // Delete test users
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [
            emails.parentEmail,
            emails.childEmail,
            emails.independentChildEmail
          ]
        }
      }
    })
    console.log("Test users deleted")
  } catch (error) {
    console.error("Cleanup failed:", error)
  }
}

async function runTests() {
  try {
    const emails = await testRegistration()
    // Note: Authentication cannot be tested directly through fetch with NextAuth
    await cleanup(emails)
    console.log("\n=== Test Complete ===")
    console.log("To test login, use the following credentials manually in the login page:")
    console.log(`- Parent: ${emails.parentEmail} / password: test123`)
    console.log(`- Child: ${emails.childEmail} / password: test123`)
    console.log(`- Independent Child: ${emails.independentChildEmail} / password: test123`)
  } catch (error) {
    console.error("Test failed:", error)
  } finally {
    await prisma.$disconnect()
  }
}

runTests() 