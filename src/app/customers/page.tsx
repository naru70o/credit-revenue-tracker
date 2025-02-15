import CustomersList from "@/components/customersList";
import { AddCustomerButton } from "@/components/ui/AddCustomerButton";
import { connectiondb, Customer } from "@/lib/database/models";
import { Types } from "mongoose"; // Import Types from mongoose
import { unstable_cache } from "next/cache";

interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
  _v: number;
}

// Cached data fetcher
const getCustomers = unstable_cache(
  async () => {
    const rawCustomers = await Customer.find().lean();
    return rawCustomers.map((cus) => ({
      _id: (cus._id as Types.ObjectId).toString(),
      name: cus.name,
      phoneNumber: cus.phoneNumber,
      _v: cus.__v,
    }));
  },
  ["customers"], // Cache key
  { revalidate: 1000, tags: ["customers"] } // Revalidate every hour + tag
);

const page = async () => {
  // await connectiondb();
  // const CustomerData: Customer[] = (await Customer.find().lean()).map(
  //   (cus) => ({
  //     _id: (cus._id as Types.ObjectId).toString(),
  //     name: cus.name,
  //     phoneNumber: cus.phoneNumber,
  //     _v: cus.__v, // Ensure _v matches your interface
  //   })
  // );
  await connectiondb();
  const CustomerData = await getCustomers();

  console.log(CustomerData);

  return (
    <>
      <div className="text-gray-700 py-16 px-4">
        <div className="flex flex-col justify-center">
          <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
            <h1 className="font-bold text-2xl text-start w-[60%]">
              Please add new Customer
            </h1>
          </div>
          <div className="inline-block self-end">
            <AddCustomerButton />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center my-8">
          {/* customers List */}
          <div className="mt-4 w-full flex flex-col gap-4">
            <CustomersList customersData={CustomerData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page; // export default page;
