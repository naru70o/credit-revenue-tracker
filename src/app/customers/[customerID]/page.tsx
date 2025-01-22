import React from "react";
import { Menu } from "@/components/menu";

import axios from "axios";
import { DeleteCustomer } from "@/components/deleteCustomer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddCredit from "@/components/addCredit";

const page = async ({ params }: { params: { customerID: string } }) => {
  const customer = params.customerID;
  const response = await axios.get(
    `http://localhost:3000/api/customers/${customer}`
  );

  const credits = await axios.get(`http://localhost:3000/api/credits`);
  const creditsData = credits.data.credits;
  console.log("this is the credits data", creditsData);

  const filteredData = creditsData.filter((item) =>
    customer.includes(item.customerId)
  );
  console.log("this is the filtered data", filteredData);

  const { name, phoneNumber, _id } = response.data;

  return (
    <div className="text-gray-700 py-16 px-4 overflow-y-scroll">
      <div className="flex flex-col justify-center gap-12">
        <h1 className="font-bold text-2xl text-start w-1/2">
          here is you dear customer {name}
        </h1>
        <div className="inline-block self-end ">
          <Link href="#">
            <Button variant="default" className="mr-3">
              Add dept
            </Button>
          </Link>
          <DeleteCustomer _id={_id} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 ">
        <div className="flex justify-between items-center w-full font-normal px-4">
          <p>name</p>
          <p>phone</p>
          <p>total dept</p>
        </div>
        <AddCredit customerId={_id} />
        {/* customers List */}
      </div>
      <Menu />
    </div>
  );
};

export default page; // export default page;
