import DashboardToggleButtons from "@/components/dashboardToggleButtons";
import { RevenueChart } from "@/components/revenueChart";
import { Button } from "@/components/ui/button";
import { connectiondb, Revenue } from "@/lib/database/models";
import { formatAmount, formatDate, formatMonth } from "@/lib/utils";
import { Types } from "mongoose";
import { unstable_cache } from "next/cache";
import Link from "next/link";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}

const allRevenues = unstable_cache(
  async () => {
    const data = (await Revenue.find().sort({ date: -1 }).lean()).map(
      (rev) => ({
        amount: rev.amount,
        date: formatDate(rev.date),
        _id: (rev._id as Types.ObjectId).toString(),
      })
    );
    return data;
  },
  ["revenues"],
  { revalidate: 1000, tags: ["revenues"] }
);

const revenueChart = unstable_cache(
  async () => {
    const dashboardRevenueData = (
      await Revenue.find().sort({ date: 1 }).lean()
    ).map((rev) => ({
      amount: rev.amount,
      date: rev.date,
      _id: (rev._id as Types.ObjectId).toString,
    }));
    return dashboardRevenueData;
  },
  ["revenues"],
  {
    revalidate: 1000,
    tags: ["revenues"],
  }
);

const page = async () => {
  await connectiondb();
  const data = await allRevenues();
  const dashboardRevenueData = await revenueChart();

  // first three revenues in the array
  const firstThreeRevenues = data.slice(0, 3);

  if (!firstThreeRevenues.length || !dashboardRevenueData.length) {
    return (
      <div className="grid grid-cols-1 justify-center content-center h-screen px-4">
        <div className="text-center text-2xl font-bold">
          {" "}
          There is no revenue data available.
        </div>
        <Button variant="default" className="mt-4">
          <Link href="/revenue">Add new Revenue</Link>
        </Button>
        <Button variant="default" className="mt-2">
          <Link href="/dashboard/credits">Credits Dashboard</Link>
        </Button>
      </div>
    );
  }

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
        <p className="text-gray-700 text-sm">the last three ( 3 ) Revenues</p>
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
