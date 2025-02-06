import Link from "next/link"
import { Menu } from "lucide-react"

interface MobileHeaderProps {
  toggleSidebar: () => void
}

export function MobileHeader({ toggleSidebar }: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#343434] p-4 flex justify-between items-center">
      <button className="p-2 bg-[#484848] rounded-md" onClick={toggleSidebar}>
        <Menu className="w-6 h-6" />
      </button>
      <Link href="/" className="flex items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#4169E1] to-[#9c72fe] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            INFINITY
          </span>
          <span className="text-[#ff00ff] ml-1">∞</span>
        </h1>
      </Link>
      <div className="w-10"></div> {/* This empty div balances the layout */}
    </div>
  )
}

