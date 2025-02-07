"use client"

import Image from "next/image"
import Link from "next/link"
import { Twitter, DiscIcon as Discord } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'

export default function Page() {

  const { login, authenticated, ready, user,logout } = usePrivy()
  const router = useRouter()

  return (
    <main className="min-h-screen bg-[#000510] text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/infinity-background.png"
          alt="Infinity Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-4 md:p-6">
          <div className="flex gap-6">
            <Link href="https://twitter.com" className="hover:opacity-80 transition-opacity">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link href="https://discord.com" className="hover:opacity-80 transition-opacity">
              <Discord className="w-6 h-6" />
            </Link>
            <Link href="https://telegram.org" className="hover:opacity-80 transition-opacity">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.504 1.201-.825 1.23-.703.064-1.237-.461-1.917-.903-1.065-.693-1.669-1.123-2.702-1.799-1.195-.824-.42-1.278.261-2.02.179-.193 3.262-2.982 3.321-3.236.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.157.472-.002.089.018.181.002.289z" />
              </svg>
            </Link>
          </div>
          <div className="flex gap-4">
            {/* <Link href="/docs" className="px-4 py-2 text-sm font-medium text-white hover:opacity-80 transition-opacity">
              Docs
            </Link> */}

            <div className="text-white mt-2">
                  Welcome, {user?.wallet?.address ? 
                    `${user.wallet.address.slice(0, 5)}...${user.wallet.address.slice(-5)}` 
                    : ''}
            </div>

            {!authenticated && (
            <Button
              onClick={login}
              className="px-4 py-2 text-sm font-medium text-white rounded bg-gradient-to-r from-[#4169E1] to-[#9c72fe] hover:from-[#3a5fcf] hover:to-[#8b65e3] transition-all duration-200 ease-in-out"
            >
              Sign In
            </Button>
            )}

            {authenticated && (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-white rounded bg-gradient-to-r from-[#4169E1] to-[#9c72fe] hover:from-[#3a5fcf] hover:to-[#8b65e3] transition-all duration-200 ease-in-out"
            >
              Launch App
            </Link>
            )}
            {authenticated && (
            <Button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white rounded bg-gradient-to-r from-[#FF4500] to-[#FF6347] hover:from-[#FF6347] hover:to-[#FF7F50] transition-all duration-200 ease-in-out"            >
              Logout
            </Button>
            )}

          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Infinity
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Loyalty program automation with your own AI Agent
          </p>
        </div>
      </div>
    </main>
  )
}

