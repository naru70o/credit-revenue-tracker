import { Credit } from "@/components/credit";
import ListDept from "@/components/ListDepts";
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/lib/utils";
import React from "react";

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

interface CustomerData {
  _id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
}

const page = async () => {
  const creditsRes = await fetch("http://localhost:3000/api/credits", {
    next: {
      tags: ["credits"],
    },
  });

  const customersRes = await fetch("http://localhost:3000/api/customers", {
    next: {
      tags: ["customers"],
    },
  });

  const customersData: CustomerData[] = await customersRes.json();
  const creditsData: CreditData[] = await creditsRes.json();
  console.log(creditsData, customersData);

  return (
    <div className="text-gray-700 py-16 px-4">
      <div className="flex flex-col justify-center">
        <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check your depts
          </h1>
          <p>
            your total Credits{" "}
            <span className="font-medium">
              {/* {formatAmount(totalAmountCredits)} */}
            </span>{" "}
          </p>
        </div>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">filtering</Button>
        </div>
      </div>
      <Credit creditData={creditsData} customers={customersData} />
    </div>
  );
};

export default page;
