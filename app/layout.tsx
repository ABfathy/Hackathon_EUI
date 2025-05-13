import type React from "react"
import type { Metadata } from "next"
import { Comfortaa } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import { Providers } from "./providers"

const comfortaa = Comfortaa({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SafeGuard (حماية) - Child Protection Platform",
  description: "A comprehensive platform for child safety and protection",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={comfortaa.className}>
        <Providers>
          <div className="flex min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-purple-950">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
