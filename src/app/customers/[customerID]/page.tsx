import { NewCredit } from "@/components/newCredit";
import { Dropdown } from "@/components/ui/droppMenu";
import { connectiondb, Credit, Customer } from "@/lib/database/models";
import { formatAmount, formatDate } from "@/lib/utils";
import { Types } from "mongoose";

interface CreditData {
  amount: number;
  customerId: string;
  isPaid: boolean;
  personWhotaken: string;
  product: string;
  tookTime: string;
  __v: number;
  _id: string;
}

interface Customer {
  _id: string;
  name: string;
}

const Page = async ({
  params,
}: {
  params: Promise<{ customerID: string }>;
}) => {
  // Selecting the customer id from the URL
  const { customerID } = await params;

  if (!customerID) {
    throw new Error("Customer ID is required");
  }

  await connectiondb();
  const customers: Customer[] = (
    await Customer.find({ _id: customerID }).lean()
  ).map((customer) => ({
    _id: (customer._id as Types.ObjectId).toString(),
    name: customer.name,
  }));

  // selecting all the credits
  const creditsData = (
    await Credit.find()
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

  // Filtering the credits by customer id
  const filteredData = creditsData.filter((item: CreditData) =>
    customerID.includes(item.customerId)
  );

  // Calculating the total credits
  const totalCredits = filteredData
    .filter((credit: CreditData) => credit.isPaid === false)
    .reduce((acc: number, item: CreditData) => acc + item.amount, 0);

  // Name and user id
  const [{ name, _id }] = customers || [{} as Customer];

  return (
    <div className="text-gray-700 py-16 px-4 overflow-y-scroll">
      <div className="flex flex-col justify-center">
        <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
          <h1 className="font-bold text-2xl text-start w-[60%]">
            {name} total Credits of {formatAmount(totalCredits)}
          </h1>
        </div>
        <NewCredit _id={_id} customerName={name} />
        <div className="my-8">
          {filteredData.map((credit: CreditData) => (
            <div
              className="flex justify-between items-center bg-[#D9D9D9] rounded-xl w-full py-2 px-4 cursor-pointer mt-4 overflow-clip relative"
              key={credit._id}
            >
              <div
                className={`absolute left-0 top-0 h-full w-2 ${
                  credit.isPaid === true ? "bg-[#5B913B]" : "bg-[#F72C5B]"
                } `}
              ></div>
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">
                  {formatAmount(credit.amount)} : {credit.personWhotaken}
                </h1>
                <div>
                  Took {credit.product} at {formatDate(credit.tookTime)}
                </div>
              </div>

              <Dropdown creditData={credit} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
