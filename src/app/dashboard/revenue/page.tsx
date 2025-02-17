import React from "react";
import DashboardToggleButtons from "@/components/dashboardToggleButtons";
import { RevenueChart } from "@/components/revenueChart";
import { connectiondb, Revenue } from "@/lib/database/models";
import { formatAmount, formatDate, formatMonth, PUBLIC_URL } from "@/lib/utils";
import { Types } from "mongoose";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}



const page = async () => {
  // Last Three revenues
  await connectiondb();
  const data = (await Revenue.find().sort({ date: -1 }).lean()).map((rev) => ({
    amount: rev.amount,
    date: formatDate(rev.date),
    _id: (rev._id as Types.ObjectId).toString(),
  }));

  const dashboardRevenueData = (
    await Revenue.find().sort({ date: 1 }).lean()
  ).map((rev) => ({
    amount: rev.amount,
    date: rev.date,
    _id: (rev._id as Types.ObjectId).toString,
  }));

  //   first three revenues in the array
  const firstThreeRevenues = data.slice(0, 3);

  const aggregatedData = dashboardRevenueData.reduce(
    (acc, { date, amount }) => {
      const month = formatMonth(date);
      acc[month] = (acc[month] || 0) + amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const chartData = Object.entries(aggregatedData).map(([month, revenue]) => ({
    month,
    revenue,
  }));

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4 relative">
      <RevenueChart chartData={chartData} />

      {/* Dept List Header */}
      <div className="text-center mb-4">
        <p className="text-gray-700 text-sm">sadexdii dhaqaale u dambeeyay</p>
      </div>

      {/* Dept List */}
      <div className="w-full max-w-md">
        {firstThreeRevenues.map((revenue: Revenue) => (
          <div
            key={revenue._id}
            className="flex justify-between items-center bg-gray-300 text-gray-800 px-4 py-2 mb-2 text-sm rounded-xl"
          >
            <div>{formatAmount(revenue.amount)}</div>
            <div>{revenue.date}</div>
          </div>
        ))}
      </div>

      <DashboardToggleButtons />
    </div>
  );
};

export default page;
