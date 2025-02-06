"use client"

import { useState, type ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileHeader } from "@/components/dashboard/mobile-header"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    document.body.style.overflow = !isSidebarOpen ? "hidden" : ""
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#232323] text-white">
      <MobileHeader toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className={`flex-1 overflow-auto p-4 md:p-6 mt-16 md:mt-0 ${isSidebarOpen ? "md:ml-64" : ""}`}>
        {children}
      </main>
    </div>
  )
}

