export function ActiveCampaigns() {
  return (
    <div className="bg-[#343434] rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
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
            <td className="py-2">Free Tacos</td>
            <td className="py-2">34/50</td>
            <td className="py-2">$170</td>
            <td className="py-2">$250</td>
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

