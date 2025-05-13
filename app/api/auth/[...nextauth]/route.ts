import NextAuth, { AuthOptions, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/lib/db-service"
import { JWT } from "next-auth/jwt"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          throw new Error("Invalid credentials")
        }

        // Find user in the database
        const user = await getUserByEmail(credentials.email)
        console.log("User found:", user ? "Yes" : "No", user ? `(userType: ${user.userType})` : "");
        
        if (!user) {
          console.log("User not found");
          throw new Error("Invalid email or password")
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password)
        console.log("Password valid:", isValid);
        
        if (!isValid) {
          console.log("Invalid password");
          throw new Error("Invalid email or password")
        }

        // Return user object without password
        console.log("Authentication successful");
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
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.userType = token.userType as string
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 