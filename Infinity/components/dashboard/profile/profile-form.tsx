"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Camera, Twitter, DiscIcon as Discord, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export function ProfileForm() {
  const [logo, setLogo] = useState<string | null>(null)
  const [banner, setBanner] = useState<string | null>(null)
  const [isNewUser, setIsNewUser] = useState<boolean>(true)
  const { user } = usePrivy()
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [isCheckingUser, setIsCheckingUser] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    description: '',
    merchantwalletaddress: '',
    tokenname: ''
  });

  useEffect(() => {
    let mounted = true;

    const checkUserExists = async () => {
      // Don't check if already checked and not a new user
      if (!isCheckingUser && !isNewUser) return;

      try {
        if (mounted) setIsCheckingUser(true);
        const wallet = user?.wallet?.address || '';
        
        const response = await fetch('/api/user/exists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ wallet: wallet }),
        });
        const existsData = await response.json();
        
        if (!mounted) return;

        if (existsData.exists) {
          setIsNewUser(false);
          
          const profileResponse = await fetch('/api/user/get', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wallet: wallet }),
          });
          const profileData = await profileResponse.json();

          console.log('🚀 ~ checkUserExists ~ profileData:')
          
          if (!mounted) return;

          console.log('🚀 ~ checkUserExists ~ profileData:', profileData)

          // Load profile data into state
          setFormData({
            name: profileData.profile.name || '',
            industry: profileData.profile.industry || '',
            description: profileData.profile.description || '',
            merchantwalletaddress: profileData.profile.merchantwalletaddress || '',
            tokenname: profileData.profile.tokenname || ''
          });
          setLogo(profileData.profile.logo || null);
          setBanner(profileData.profile.banner || null);


        } else {
          setIsNewUser(true);
        }

        toast({
          title: existsData.exists ? "Welcome back!" : "Welcome!",
          description: existsData.exists ? "Your profile has been loaded." : "Please complete your profile.",
          className: "bg-[#343434] border-[#484848] text-white",
        });

      } catch (error) {
        console.error('Error checking user existence:', error);
        if (mounted) {
          toast({
            title: "Error",
            description: "Failed to verify user status. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        if (mounted) setIsCheckingUser(false);
      }
    };

    if (user?.wallet?.address) {
      checkUserExists();
    }

    return () => {
      mounted = false;
    };
  }, [user?.wallet?.address, toast, isCheckingUser, isNewUser]);
  

  const validateFileSize = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
    return true;
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!validateFileSize(file)) {
        setErrors(prev => ({
          ...prev,
          logo: 'Logo image must be less than 2MB'
        }));
        return;
      }

      setErrors(prev => ({
        ...prev,
        logo: ''
      }));

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
      if (!validateFileSize(file)) {
        setErrors(prev => ({
          ...prev,
          banner: 'Banner image must be less than 2MB'
        }));
        return;
      }

      setErrors(prev => ({
        ...prev,
        banner: ''
      }));

      const reader = new FileReader()
      reader.onloadend = () => {
        setBanner(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = (formData: any) => {
    const newErrors: Record<string, string> = {}

    if (!formData.name?.trim()) {
      newErrors.name = 'Business name is required'
    }
    if (!formData.industry?.trim()) {
      newErrors.industry = 'Industry is required'
    }
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.merchantwalletaddress?.trim()) {
      newErrors.wallet = 'Merchant wallet address is required'
    }
    if (!formData.tokenname?.trim()) {
      newErrors.tokenname = 'Token name is required'
    }
    if (!logo) {
      newErrors.logo = 'Business logo is required'
    }
    if (!banner) {
      newErrors.banner = 'Business banner is required'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.currentTarget
    
    const formData = {
      userwallet: user?.wallet?.address || '',
      name: (form.querySelector('#business-name') as HTMLInputElement)?.value,
      industry: (form.querySelector('#industry') as HTMLInputElement)?.value,
      description: (form.querySelector('#description') as HTMLTextAreaElement)?.value,
      merchantwalletaddress: (form.querySelector('#wallet') as HTMLInputElement)?.value,
      tokenname: (form.querySelector('#token-name') as HTMLInputElement)?.value,
      logo: logo,
      banner: banner
    }

    const formErrors = validateForm(formData)
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('/api/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ profile: formData }),
        })
        const data = await response.json()

        if (response.ok) {
          toast({
            title: "Success!",
            description: "Your profile has been updated successfully.",
            className: "bg-[#343434] border-[#484848] text-white",
          })
        } else {
          throw new Error(data.message || 'Failed to update profile')
        }

      } catch (error) {
        console.error('Error submitting form:', error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
          variant: "destructive",
        })
      }
    }
    setIsSubmitting(false)
  }

  if (isCheckingUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <p className="text-gray-400">Verifying user status...</p>
      </div>
    )
  }

  return (
    <form className="space-y-8 mx-4" onSubmit={handleSubmit}>
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
          {errors.logo && <span className="text-red-500 text-sm">{errors.logo}</span>}
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
          {errors.banner && <span className="text-red-500 text-sm">{errors.banner}</span>}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="business-name">
            Business Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="business-name" 
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={cn(
              "bg-[#484848] border-0",
              errors.name && "border-2 border-red-500"
            )} 
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div>
          <Label htmlFor="industry">
            Industry / Niche <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="industry" 
            value={formData.industry}
            onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
            className={cn(
              "bg-[#484848] border-0",
              errors.industry && "border-2 border-red-500"
            )} 
          />
          {errors.industry && <span className="text-red-500 text-sm">{errors.industry}</span>}
        </div>

        <div>
          <Label htmlFor="description">
            Business Description <span className="text-red-500">*</span>
          </Label>
          <Textarea 
            id="description" 
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={cn(
              "bg-[#484848] border-0 min-h-[100px]",
              errors.description && "border-2 border-red-500"
            )} 
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>

        <div>
          <Label htmlFor="wallet">
            Merchant Wallet Address <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="wallet" 
            value={formData.merchantwalletaddress}
            onChange={(e) => setFormData(prev => ({ ...prev, merchantwalletaddress: e.target.value }))}
            className={cn(
              "bg-[#484848] border-0",
              errors.wallet && "border-2 border-red-500"
            )} 
          />
          {errors.wallet && <span className="text-red-500 text-sm">{errors.wallet}</span>}
        </div>

        <div>
          <Label htmlFor="token-name">
            Points Token Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="token-name" 
            value={formData.tokenname}
            onChange={(e) => setFormData(prev => ({ ...prev, tokenname: e.target.value }))}
            className={cn(
              "bg-[#484848] border-0",
              errors.tokenname && "border-2 border-red-500"
            )} 
          />
          {errors.tokenname && <span className="text-red-500 text-sm">{errors.tokenname}</span>}
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
            disabled={isSubmitting}
            className={cn(
              "w-[300px] px-4 py-2 text-white font-semibold rounded-md",
              "bg-gradient-to-r from-[#4169E1] to-[#9c72fe]",
              "hover:from-[#3a5fcf] hover:to-[#8b65e3]",
              "transition-all duration-200 ease-in-out",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  )
}

