import { WelcomeHeader } from "@/components/dashboard/welcome-header"
import { LoyaltyPointsSummary } from "@/components/dashboard/loyalty-points-summary"
import { CampaignSummary } from "@/components/dashboard/campaign-summary"
import { ActiveCampaigns } from "@/components/dashboard/active-campaigns"
import { CompletedCampaigns } from "@/components/dashboard/completed-campaigns"
import { Reports } from "@/components/dashboard/reports"

export default function DashboardPage() {
  return (
    <div className="space-y-6 pt-4 md:pt-0">
      <WelcomeHeader
        businessName="Ether Eatery"
        businessImage="/images/Ether-Eatery-Profile.png"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoyaltyPointsSummary />
        <ActiveCampaigns />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CampaignSummary />
        <CompletedCampaigns />
      </div>

      <Reports />
    </div>
  )
}

