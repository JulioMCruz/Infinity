import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react" // Import React
import { PrivyWrapper } from "@/lib/privy/provider"

//import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ["latin"] })

// Create a client
//const queryClient = new QueryClient()

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
          {/*<QueryClientProvider client={queryClient}>*/}
            <PrivyWrapper>
              {children}
            </PrivyWrapper>
          {/*</QueryClientProvider>*/}
      </body>
    </html>
  )
}

