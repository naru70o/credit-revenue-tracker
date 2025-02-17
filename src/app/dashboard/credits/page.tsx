import React from "react";
import DashboardToggleButtons from "@/components/dashboardToggleButtons";
import { DeptChart } from "@/components/deptChart";
import { formatAmount, formatDate, PUBLIC_URL } from "@/lib/utils";
import { connectiondb, Credit } from "../../../lib/database/models";
import { unstable_cache } from "next/cache";

interface CreditData {
  _id: string;
  customerId: string;
  amount: number;
  product: string;
  personWhotaken: string;
  tookTime: string;
  isPaid: boolean;
  __v: number;
}

interface ChartData {
  credits: "paid" | "unpaid";
  value: number;
  fill: string;
}

const credits = unstable_cache(
  async () => {
    const creditsData = await Credit.find()
      .sort({
        tookTime: -1,
      })
      .lean();

    return creditsData as CreditData[];
  },
  ["credits"],
  { revalidate: 1000, tags: ["credits"] }
);

const page = async () => {
  await connectiondb();
  const creditsData = await credits();
  // const creditsData: CreditData[] = (await Credit.find()
  //   .sort({
  //     tookTime: -1,
  //   })
  //   .lean()) as CreditData[];

  console.log(typeof creditsData);

  const getLastTwoMonthsTotals = (transactions: CreditData[]) => {
    const now = new Date();
    const lastTwoMonths = [
      new Date(now.getFullYear(), now.getMonth() - 1).getMonth(), // Last month (0-based index)
      new Date(now.getFullYear(), now.getMonth() - 2).getMonth(), // Two months ago
    ];

    return transactions
      .filter(({ tookTime }) => {
        const transactionDate = new Date(tookTime);
        return lastTwoMonths.includes(transactionDate.getMonth());
      })
      .reduce(
        (totals, { isPaid, amount }) => {
          if (isPaid) {
            totals.paid += amount;
          } else {
            totals.unpaid += amount;
          }
          return totals;
        },
        { paid: 0, unpaid: 0 }
      );
  };

  const totals = getLastTwoMonthsTotals(creditsData);

  const chartData: ChartData[] = [
    { credits: "paid", value: totals.paid, fill: "hsl(var(--chart-1))" },
    { credits: "unpaid", value: totals.unpaid, fill: "hsl(var(--chart-2))" },
  ];

  const lastThreeCredits = creditsData.slice(0, 3);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4 relative">
      <DeptChart chartData={chartData} />

      {/* Dept List Header */}
      <div className="text-center mb-4 mt-8">
        <p className="text-gray-700 text-sm">sadexdii dhaqaale u dambeeyay</p>
      </div>

      {/* Dept List */}
      <div className="w-full max-w-md">
        {lastThreeCredits.map((credit: CreditData) => (
          <div
            key={credit._id}
            className="flex justify-between items-center bg-gray-300 text-gray-800 px-4 py-2 mb-2 text-sm rounded-xl"
          >
            <div>{formatAmount(credit.amount)}</div>
            <div>{formatDate(credit.tookTime)}</div>
          </div>
        ))}
      </div>

      <DashboardToggleButtons />
    </div>
  );
};

export default page;
