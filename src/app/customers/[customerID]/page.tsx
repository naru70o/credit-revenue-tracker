import { Menu } from "@/components/menu";
import { NewCredit } from "@/components/newCredit";
import { Dropdown } from "@/components/ui/droppMenu";
import { formatAmount, formatDate } from "@/lib/utils";
import axios from "axios";

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
  const response = await axios.get(
    `http://localhost:3000/api/customers/${customer}`
  );

  // selecting all the credits
  const credits = await axios.get(`http://localhost:3000/api/credits`);
  const creditsData = credits.data.credits;

  // Filtering the credits by customer id
  const filteredData = creditsData.filter((item: CreditData) =>
    customer.includes(item.customerId)
  );

  let totalCredits = filteredData
    .filter((credit: CreditData) => credit.isPaid === false)
    .reduce((acc: number, item: CreditData) => acc + item.amount, 0);

  // const totalCredits = filteredData.reduce(
  //   (acc: number, item: CreditData) => acc + item.amount,
  //   0
  // );

  const { name, phoneNumber, _id } = response.data;

  return (
    <div className="text-gray-700 py-16 px-4 overflow-y-scroll">
      <div className="flex flex-col justify-center">
        <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
          <h1 className="font-bold text-2xl text-start w-1/2">
            {name} total Credits of {formatAmount(totalCredits)}
          </h1>
        </div>
        <NewCredit _id={_id} customerName={name} />
        {filteredData.map((credit: CreditData) => (
          <div
            className="flex justify-between items-center bg-[#D9D9D9] rounded-xl w-full py-2 px-4 cursor-pointer  mb-2 overflow-clip relative"
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
        <Menu />
      </div>
    </div>
  );
};

export default Page;
