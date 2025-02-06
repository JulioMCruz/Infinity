export function CompletedCampaigns() {
    return (
      <div className="bg-[#343434] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Completed Campaigns</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="pb-2">Active Campaigns</th>
              <th className="pb-2">Claimed So Far</th>
              <th className="pb-2">Value Claimed</th>
              <th className="pb-2">Budget</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#484848]">
              <td className="py-2">Free Margaritas</td>
              <td className="py-2">35/35</td>
              <td className="py-2">$350</td>
              <td className="py-2">$350</td>
            </tr>
            <tr className="border-t border-[#484848]">
              <td className="py-2">-</td>
              <td className="py-2">-</td>
              <td className="py-2">-</td>
              <td className="py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  
  