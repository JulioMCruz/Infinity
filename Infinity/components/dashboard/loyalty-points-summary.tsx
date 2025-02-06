interface Transaction {
    txHash: string
    amount: number
    time: string
    pointsEarned: number
  }
  
  const transactions: Transaction[] = [
    { txHash: "0xa08...e921", amount: 25, time: "10:30 AM", pointsEarned: 25 },
    { txHash: "0xa08...e921", amount: 17, time: "08:05 AM", pointsEarned: 17 },
    { txHash: "0xa08...e921", amount: 25, time: "09:52 PM", pointsEarned: 25 },
    { txHash: "0xa08...e921", amount: 10, time: "10:28 AM", pointsEarned: 10 },
    { txHash: "0xa08...e921", amount: 20, time: "07:37 AM", pointsEarned: 20 },
  ]
  
  export function LoyaltyPointsSummary() {
    return (
      <div className="bg-[#343434] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Loyalty Points Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="pb-2">tx hash</th>
                <th className="pb-2">amount (USD)</th>
                <th className="pb-2">time</th>
                <th className="pb-2">points earned</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-t border-[#484848]">
                  <td className="py-2 text-gray-300">{tx.txHash}</td>
                  <td className="py-2">${tx.amount}</td>
                  <td className="py-2">{tx.time}</td>
                  <td className="py-2">{tx.pointsEarned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  