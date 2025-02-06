"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#999999",
      },
    },
    y: {
      grid: {
        color: "#484848",
      },
      ticks: {
        color: "#999999",
      },
    },
  },
}

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      data: [38, 25, 30, 45],
      backgroundColor: "#9333ea",
    },
  ],
}

export function CampaignSummary() {
  return (
    <div className="bg-[#343434] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Campaign Summary</h2>
        <select className="bg-[#484848] text-white px-2 py-1 rounded">
          <option>Free Tacos</option>
        </select>
      </div>
      <Bar options={options} data={data} />
    </div>
  )
}

