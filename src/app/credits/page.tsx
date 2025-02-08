import { Credit } from "@/components/credit";
import { Button } from "@/components/ui/button";
import { formatAmount, PUBLIC_URL } from "@/lib/utils";

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

const page = async () => {
  const creditsRes = await fetch(`${PUBLIC_URL}/api/credits`, {
    next: {
      tags: ["credits"],
    },
  });

  const customersRes = await fetch(`${PUBLIC_URL}/api/customers`, {
    next: {
      tags: ["customers"],
    },
  });

  const customersData: CustomerData[] = await customersRes.json();
  const creditsData: CreditResponse = await creditsRes.json();
  const credits: CreditData[] = creditsData.credits;

  // total amount of un paid credits
  const totalUnpaidAmount = credits
    .filter((credit) => !credit.isPaid)
    .reduce((acc, credit) => acc + credit.amount, 0);
  console.log(totalUnpaidAmount);

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
              {formatAmount(totalUnpaidAmount)}
            </span>{" "}
          </p>
        </div>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">filtering</Button>
        </div>
      </div>
      <Credit creditData={credits} customers={customersData} />
    </div>
  );
};

export default page;
