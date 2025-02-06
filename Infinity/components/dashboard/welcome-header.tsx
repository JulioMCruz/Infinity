import Image from "next/image"

interface WelcomeHeaderProps {
  businessName: string
  businessImage: string
}

export function WelcomeHeader({ businessName, businessImage }: WelcomeHeaderProps) {
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(currentDate)

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image
          src={businessImage}
          alt={businessName}
          width={64}
          height={64}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-4xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent font-bold">
            Welcome back!
          </h1>
          <h2 className="text-xl text-purple-400">{businessName}</h2>
        </div>
      </div>
      <div className="text-right text-gray-400">{formattedDate}</div>
    </div>
  )
}

