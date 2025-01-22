import React from "react";
import { Menu } from "@/components/menu";

import axios from "axios";
import { DeleteCustomer } from "@/components/deleteCustomer";

const page = async ({ params }: { params: { customerID: string } }) => {
  const customer = params.customerID;
  const response = await axios.get(
    `http://localhost:3000/api/customers/${customer}`
  );

  console.log(response.data);
  const { name, phoneNumber, _id } = response.data;

  return (
    <div className="text-gray-700 py-16 px-4">
      <div className="flex flex-col justify-center gap-12">
        <h1 className="font-bold text-2xl text-start w-1/2">
          here is you dear customer {name}
        </h1>
        <div className="inline-block self-end">
          <DeleteCustomer _id={_id} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 ">
        <div className="flex justify-between items-center w-full font-normal px-4">
          <p>name</p>
          <p>phone</p>
          <p>total dept</p>
        </div>
        {/* customers List */}
      </div>
      <Menu />
    </div>
  );
};

export default page; // export default page;
