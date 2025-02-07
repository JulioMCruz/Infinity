import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import { PrivyWrapper } from "@/lib/privy/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Infinity - AI-Powered Loyalty Program Automation",
  description: "Automate your loyalty program with your own AI Agent",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyWrapper>
          {children}
        </PrivyWrapper>
      </body>
    </html>
  )
}

