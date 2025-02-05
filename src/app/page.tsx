import { DeptChart } from "@/components/deptChart";
import { RevenueChart } from "@/components/revenueChart";
import { formatDate, formatMonth, PUBLIC_URL } from "@/lib/utils";
import React from "react";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}

const page: React.FC = async () => {
  const revenueResponse = await fetch(`${PUBLIC_URL}/api/revenue`, {
    next: {
      tags: ["revenue"],
    },
  });
  const revenue = await revenueResponse.json();
  const revenueData: Revenue[] = revenue.revenues;

  const aggregatedData = revenueData.reduce((acc, { date, amount }) => {
    const month = formatMonth(date);
    acc[month] = (acc[month] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(aggregatedData).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  console.log(chartData);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      {/* <RevenueChart chartData={chartData} revenueData={revenueData} /> */}
      <DeptChart />
      {/* Toggle Buttons */}
      <div className="flex items-center gap-2 mb-6">
        <button className="px-4 py-2 bg-gray-300 rounded-full text-sm font-medium">
          Revenue
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium">
          Depts
        </button>
      </div>

      {/* Dept Status */}
      <div className="text-center mb-12">
        <p className="text-gray-700 text-sm">Depts 65% was paid</p>
      </div>

      {/* Dept List Header */}
      <div className="text-center mb-4">
        <p className="text-gray-700 text-sm">
          Here are your last 5 people who took depts from your shop
        </p>
      </div>

      {/* Dept List */}
      <div className="w-full max-w-md">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-300 text-gray-800 rounded-lg px-4 py-2 mb-2 text-sm"
            >
              <span>10/oct/2025</span>
              <span>kadar</span>
              <span>10,000</span>
            </div>
          ))}
      </div>

      {/* More Button */}
      <button className="px-4 py-2 mt-4 bg-purple-500 text-white rounded-lg text-sm font-medium">
        More
      </button>
    </div>
  );
};

export default page;
