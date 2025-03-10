import { Credit } from "@/components/credit";
import FilterCredits from "@/components/filterCredits";
import { Button } from "@/components/ui/button";
import {
  connectiondb,
  Credit as CreditModel,
  Customer,
} from "@/lib/database/models";
import { formatAmount } from "@/lib/utils";
import { Types } from "mongoose";

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

interface CreditResponse {
  credits: CreditData[];
}

interface CustomerData {
  _id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  await connectiondb();
  const params = await searchParams;
  console.log(params);

  // fetching all the credits from the database
  const creditsData = (
    await CreditModel.find()
      .sort({
        tookTime: -1,
      })
      .lean()
  ).map((credit) => ({
    amount: credit.amount,
    customerId: (credit.customerId as Types.ObjectId).toString(),
    isPaid: credit.isPaid,
    personWhotaken: credit.personWhotaken,
    product: credit.product,
    tookTime: credit.tookTime,
    __v: credit.__v,
    _id: (credit._id as Types.ObjectId).toString(),
  })) as CreditData[];

  // fetching Customers data from the database
  const customersData = (await Customer.find().lean()).map((customer) => ({
    _id: (customer._id as Types.ObjectId).toString(),
    name: customer.name,
    phoneNumber: customer.phoneNumber,
    createdAt: customer.createdAt.toISOString(),
  })) as CustomerData[];

  // total amount of un paid credits
  const totalUnpaidAmount = creditsData
    .filter((credit) => !credit.isPaid)
    .reduce((acc, credit) => acc + credit.amount, 0);

  return (
    <div className="text-gray-700 py-16 px-4">
      <div className="flex flex-col justify-center">
        <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check your depts...
          </h1>
          <div>
            your total Credits{" "}
            <div className="font-medium">{formatAmount(totalUnpaidAmount)}</div>
          </div>
        </div>
        <FilterCredits />
      </div>
      <Credit creditData={creditsData} customers={customersData} />
    </div>
  );
};

export default page;
