import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Import the users array from the registration route
import { users } from "../register/route"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        // Find user in the users array
        const user = users.find(user => user.email === credentials.email)
        if (!user) {
          throw new Error("Invalid email or password")
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
          throw new Error("Invalid email or password")
        }

        // Return user object without password
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.userType = token.userType as string
      }
      return session
    }
  }
})

export { handler as GET, handler as POST } 