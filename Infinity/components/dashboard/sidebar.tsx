"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Twitter, MessageSquare, LayoutDashboard, Settings, Database, DiscIcon as DiscordIcon, X } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isMobile: boolean
}

export function Sidebar({ isOpen, setIsOpen, isMobile }: SidebarProps) {
  const pathname = usePathname()

  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile) setIsOpen(false)
    }
    window.addEventListener("popstate", handleRouteChange)
    return () => window.removeEventListener("popstate", handleRouteChange)
  }, [setIsOpen, isMobile])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    if (isMobile) {
      document.body.style.overflow = !isOpen ? "hidden" : ""
    }
  }

  const navigation = {
    agent: [
      { name: "Chats", href: "/dashboard/chats", icon: MessageSquare },
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Campaign Manager", href: "/dashboard/campaigns", icon: LayoutDashboard },
    ],
    owner: [
      { name: "Profile", href: "/dashboard/profile", icon: Settings },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    customer: [
      { name: "Data Center", href: "/dashboard/data", icon: Database },
      { name: "Settings", href: "/dashboard/customer-settings", icon: Settings },
    ],
  }

  return (
    <>
      {isMobile && isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>}
      <div
        className={`sidebar transition-transform duration-300 ease-in-out fixed md:sticky top-0 inset-y-0 left-0 z-50 w-64 bg-[#343434] flex flex-col overflow-y-auto pt-16 md:pt-0 h-screen ${
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        }`}
      >
        {isMobile && (
          <button className="absolute top-4 right-4 p-2 bg-[#484848] rounded-md" onClick={toggleSidebar}>
            <X className="w-6 h-6" />
          </button>
        )}
        <div className="p-4 border-b border-[#484848]">
          <Link href="/" className="block">
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-[#4169E1] to-[#9c72fe] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                INFINITY
              </span>
              <span className="text-[#ff00ff] ml-2">∞</span>
            </h1>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-[#999999] mb-2">Quick Summary</h2>
          </div>

          <div className="px-2">
            {Object.entries(navigation).map(([category, items]) => (
              <div key={category} className="mb-8">
                <h2 className="px-4 py-2 text-sm font-semibold bg-[#575757] text-white mb-2">
                  {category.toUpperCase()}
                </h2>
                <nav className="space-y-1">
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-2 text-sm ${
                        pathname === item.href ? "bg-[#575757] text-white" : "text-[#999999] hover:bg-[#484848]"
                      }`}
                      onClick={() => isMobile && toggleSidebar()}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-purple-600">
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 text-sm font-semibold">LOGOUT</button>
            <div className="space-y-2">
              <Link href="#" className="block px-4 py-1 text-sm">
                Resources
              </Link>
              <Link href="#" className="block px-4 py-1 text-sm">
                Help
              </Link>
              <Link href="#" className="block px-4 py-1 text-sm">
                Contact Us
              </Link>
            </div>
            <div className="flex justify-center space-x-4 pt-4">
              <Twitter className="h-5 w-5" />
              <DiscordIcon className="h-5 w-5" />
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.504 1.201-.825 1.23-.703.064-1.237-.461-1.917-.903-1.065-.693-1.669-1.123-2.702-1.799-1.195-.824-.42-1.278.261-2.02.179-.193 3.262-2.982 3.321-3.236.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.157.472-.002.089.018.181.002.289z" />
              </svg>
            </div>
            <div className="text-center text-sm">Logged in as 0xabc.....123</div>
          </div>
        </div>
      </div>
    </>
  )
}

