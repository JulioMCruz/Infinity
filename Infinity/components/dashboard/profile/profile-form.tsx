"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Twitter, DiscIcon as Discord } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function ProfileForm() {
  const [logo, setLogo] = useState<string | null>(null)
  const [banner, setBanner] = useState<string | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBanner(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo Upload */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div
              className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-purple-600 to-blue-600",
              )}
            >
              {logo ? (
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="Business Logo"
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-white/70" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
            <label
              htmlFor="logo-upload"
              className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </label>
          </div>
          <span className="text-sm text-gray-400">Business Logo</span>
        </div>

        {/* Banner Upload */}
        <div className="md:col-span-2">
          <div className="relative">
            <div
              className={cn(
                "w-full h-32 rounded-lg flex items-center justify-center",
                "bg-gradient-to-r from-purple-600 to-blue-600",
              )}
            >
              {banner ? (
                <Image
                  src={banner || "/placeholder.svg"}
                  alt="Business Banner"
                  width={800}
                  height={128}
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-white/70" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" id="banner-upload" />
            <label
              htmlFor="banner-upload"
              className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </label>
          </div>
          <span className="text-sm text-gray-400 mt-2 block">Business Banner</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="business-name">Business Name</Label>
          <Input id="business-name" className="bg-[#484848] border-0" />
        </div>

        <div>
          <Label htmlFor="industry">Industry / Niche</Label>
          <Input id="industry" className="bg-[#484848] border-0" />
        </div>

        <div>
          <Label htmlFor="description">Business Description</Label>
          <Textarea id="description" className="bg-[#484848] border-0 min-h-[100px]" />
        </div>

        <div>
          <Label htmlFor="wallet">Merchant Wallet Address</Label>
          <Input id="wallet" className="bg-[#484848] border-0" />
        </div>

        <div>
          <Label htmlFor="token-name">Points Token Name</Label>
          <Input id="token-name" className="bg-[#484848] border-0" />
        </div>

        <div>
          <Label htmlFor="token-ticker">Points Token Ticker</Label>
          <Input id="token-ticker" className="bg-[#484848] border-0" />
        </div>

        <div className="space-y-4">
          <Label>Client connection</Label>
          <div className="flex flex-wrap gap-4">
            <button type="button" className="p-3 bg-[#484848] rounded-lg hover:bg-[#575757] transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button type="button" className="p-3 bg-[#484848] rounded-lg hover:bg-[#575757] transition-colors">
              <Discord className="w-5 h-5" />
            </button>
            <button type="button" className="p-3 bg-[#484848] rounded-lg hover:bg-[#575757] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.504 1.201-.825 1.23-.703.064-1.237-.461-1.917-.903-1.065-.693-1.669-1.123-2.702-1.799-1.195-.824-.42-1.278.261-2.02.179-.193 3.262-2.982 3.321-3.236.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.178.12.13.145.309.157.472-.002.089.018.181.002.289z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Twitter connection enables the agent to post on your behalf.
            <br />
            Discord and Telegram connection enables the agent to interact with you through those platforms.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[300px] px-4 py-2 text-white font-semibold rounded-md bg-gradient-to-r from-[#4169E1] to-[#9c72fe] hover:from-[#3a5fcf] hover:to-[#8b65e3] transition-all duration-200 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

