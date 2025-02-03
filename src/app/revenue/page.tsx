import AddRevenueButton from "@/components/addRevenueButton";
import RevenuesList from "@/components/revenuesList";
import { formatAmount } from "@/lib/utils";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}



const Page = async () => {
  const res = await fetch("http://localhost:3000/api/revenue", {
    next: {
      tags: ["revenue"],
    },
  });

  const revenueData: Revenue[] = await res.json();
  const revenues = revenueData.revenues;
  const totalRevenue = revenues.reduce(
    (acc: number, curr: number) => acc + curr.amount,
    0
  );

  return (
    <div className="text-black py-16 px-4 bg-gray-100">
      <div className="flex flex-col justify-center">
        <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check Your Revenue
          </h1>
          <p>Your total revenue is {formatAmount(totalRevenue)}</p>
        </div>
        <div className="inline-block self-end">
          <AddRevenueButton />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 ">
        <RevenuesList revenueData={revenues} />
      </div>
    </div>
  );
};

export default Page;
