import { NewCredit } from "@/components/newCredit";
import { Dropdown } from "@/components/ui/droppMenu";
import { formatAmount, formatDate, PUBLIC_URL } from "@/lib/utils";
import { notFound } from "next/navigation";

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

const Page = async ({ params }: { params: { customerID: string } }) => {
  // Selecting the customer id from the URL
  const customer = params.customerID;
  const response = await fetch(`${PUBLIC_URL}/api/customers/${customer}`, {
    next: { tags: ["credit"] },
  });
  const customersData = await response.json();
  console.log("what is inside of this ", customersData);

  if (response.status !== 200) {
    notFound();
  }

  // selecting all the credits
  const responseCredits = await fetch(`${PUBLIC_URL}/api/credits`, {
    next: { tags: ["credit"] },
  });

  const credits = responseCredits.json();
  const { credits: creditsData } = await credits;

  // Filtering the credits by customer id
  const filteredData = creditsData.filter((item: CreditData) =>
    customer.includes(item.customerId)
  );

  const totalCredits = filteredData
    .filter((credit: CreditData) => credit.isPaid === false)
    .reduce((acc: number, item: CreditData) => acc + item.amount, 0);

  const { name, _id } = customersData.customer;

  return (
    <div className="text-gray-700 py-16 px-4 overflow-y-scroll">
      <div className="flex flex-col justify-center">
        <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
          <h1 className="font-bold text-2xl text-start w-[60%]">
            {name} total Credits of {formatAmount(totalCredits)}
          </h1>
        </div>
        <NewCredit _id={_id} customerName={name} />
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
              <p>
                Took {credit.product} at {formatDate(credit.tookTime)}
              </p>
            </div>

            <Dropdown creditData={credit} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
