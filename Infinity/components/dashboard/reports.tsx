export function Reports() {
  return (
    <div className="bg-[#343434] rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="space-y-2">
        <button className="w-full text-left px-4 py-2 bg-[#484848] rounded hover:bg-[#575757]">Today</button>
        <button className="w-full text-left px-4 py-2 bg-[#484848] rounded hover:bg-[#575757]">Yesterday</button>
      </div>
    </div>
  )
}

