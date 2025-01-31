import { Button } from "@/components/ui/button";
import FullSpinner from "@/components/ui/FullSpinner";
import { formatAmount } from "@/lib/utils";
import Link from "next/link";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  id: number;
}

const Page = async () => {
  const res = await fetch("http://localhost:3000/api/revenue", {
    next: {
      tags: ["revenue"],
    },
  });

  const revenueData: Revenue[] = await res.json();
  console.log(revenueData);
  // const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="text-black py-16 px-4 bg-gray-100">
      <div className="flex flex-col justify-center gap-12">
        <div>
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check your revenue
          </h1>
          <p>your total revenue is {formatAmount(72327)}</p>
        </div>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">
            <Link href="/revenue/add">add revenue</Link>
          </Button>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default Page;
