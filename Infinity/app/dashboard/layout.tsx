"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileHeader } from "@/components/dashboard/mobile-header"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px is the breakpoint for md in Tailwind
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    if (isMobile) {
      document.body.style.overflow = !isSidebarOpen ? "hidden" : ""
    }
  }

  return (
    <div className="flex min-h-screen bg-[#232323] text-white">
      <MobileHeader toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} isMobile={isMobile} />
      <main
        className={`flex-1 overflow-auto p-4 md:p-6 transition-all duration-300 ease-in-out ${isMobile ? "mt-16" : ""}`}
      >
        {children}
      </main>
    </div>
  )
}

