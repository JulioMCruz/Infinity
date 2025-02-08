import Image from "next/image"
import { ProfileForm } from "@/components/dashboard/profile/profile-form"

export default function ProfilePage() {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 md:pt-0">
      <div className="flex items-center justify-center gap-2 mb-8">
        <Image
          src="/images/nillion.png"
          alt="Nillion Logo"
          width={36}
          height={36}
          className="h-12 w-12"
        />
        <span className="text-2xl text-gray-400">Data Secured by Nillion</span>
      </div>      
      <ProfileForm />
    </div>
  )
}

