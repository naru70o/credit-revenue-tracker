import { Menu } from "@/components/menu";
import { NewCredit } from "@/components/newCredit";
import axios from "axios";
import { formatDate } from "@/lib/utils";

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

  // Loading all the credits
  const credits = await axios.get(`http://localhost:3000/api/credits`);
  const creditsData = credits.data.credits;
  console.log("This is the credits data", creditsData);

  // Filtering the credits by customer id
  const filteredData = creditsData.filter((item: CreditData) =>
    customer.includes(item.customerId)
  );

  console.log(
    "This is the filtered data",
    filteredData.map((item: CreditData) => console.log(item))
  );

  const { name, phoneNumber, _id } = response.data;

  return (
    <div className="text-gray-700 py-16 px-4 overflow-y-scroll">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-2xl text-start w-1/2">
          Here is your data, dear customer {name}
        </h1>
        <NewCredit _id={_id} />
        {filteredData.map((credit: CreditData) => (
          <div
            className="flex justify-between items-center bg-[#D9D9D9] rounded-lg w-full py-2 px-4 cursor-pointer hover:bg-gray-300 mb-2"
            key={credit._id}
          >
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">{credit.personWhotaken}</h1>
              <p>
                Took {credit.product} at {formatDate(credit.tookTime)}
              </p>
            </div>
            <div className="">{credit.amount}</div>
          </div>
        ))}
        <Menu />
      </div>
    </div>
  );
};

export default Page;
