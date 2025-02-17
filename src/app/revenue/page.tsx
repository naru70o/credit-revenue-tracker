import AddRevenueButton from "@/components/addRevenueButton";
import RevenuesList from "@/components/revenuesList";
import { formatAmount, PUBLIC_URL } from "@/lib/utils";
import { connectiondb, Revenue } from "@/lib/database/models";
import { Types } from "mongoose"; // Import Types from mongoose
import { unstable_cache } from "next/cache";

interface Revenue {
  _id: string;
  amount: number;
  date: string;
  __v: number;
}

const revenue = unstable_cache(
  async () => {
    const revenueData = (await Revenue.find().sort({ date: -1 }).lean()) // Converts to plain objects but keeps _id as an ObjectId
      .map((rev) => ({
        ...rev,
        _id: (rev._id as Types.ObjectId).toString(), // Explicitly cast _id
        date: new Date(rev.date).toISOString(), // Ensure date is a string
      })) as Revenue[];
    return revenueData;
  },
  ["revenues"],
  { revalidate: 1000, tags: ["revenues"] }
);

const Page = async () => {
  await connectiondb();
  const revenueData = await revenue();

  console.log(typeof revenueData, "from the server");

  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="text-black py-16 px-4 bg-gray-100">
      <div className="flex flex-col justify-center">
        <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check Your Revenue
          </h1>
          <div>Your total revenue is {formatAmount(totalRevenue)}</div>
        </div>
        <div className="inline-block self-end">
          <AddRevenueButton />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-8">
        <RevenuesList revenueData={revenueData} />
      </div>
    </div>
  );
};

export default Page;
