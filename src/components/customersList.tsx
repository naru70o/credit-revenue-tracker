"use client";

import { DeleteCustomer } from "@/app/actions/actions";
import { Trash2, UserPen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AlertDialogModel } from "./AlertDialog";
import { UpdateCustomerModel } from "./updateCustomerModel";

interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
}

export default function CustomersList({
  customersData,
}: {
  customersData: Customer[];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleUpdate = (_id: string, name: string, phoneNumber: string) => {
    setIsUpdateDialogOpen(true);
    const customerData: Customer = {
      _id,
      name,
      phoneNumber,
    };
    setCurrentCustomer(customerData);
  };

  const handleUpdateClose = () => {
    setIsUpdateDialogOpen(false);
  };

  // function that gets run after i touch the update icon and let's obserbing the current customer id

  const handleDelete = (_id: string) => {
    setCurrentCustomerId(_id);
    setIsDialogOpen(true);
  };

  return (
    <>
      {customersData.map((customer: Customer) => (
        <div key={customer._id}>
          <div className="flex justify-between items-center bg-[#D9D9D9] rounded-xl w-full py-2 px-4 cursor-pointer hover:bg-gray-300">
            <Link className="flex-1 w-full" href={`/customers/${customer._id}`}>
              <div className="flex-1">
                <p>{customer.name}</p>
                <p>{customer.phoneNumber}</p>
              </div>
            </Link>
            <div className="flex gap-2">
              <Trash2
                onClick={() => handleDelete(customer._id)}
                strokeWidth={1.5}
              />
              <UserPen
                strokeWidth={1.5}
                onClick={() =>
                  handleUpdate(
                    customer._id,
                    customer.name,
                    customer.phoneNumber
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}
      {isUpdateDialogOpen && customersData && (
        <UpdateCustomerModel
          currentCustomer={currentCustomer}
          toggleDialog={isUpdateDialogOpen}
          onhandleClose={handleUpdateClose}
        />
      )}
      {isDialogOpen && (
        <AlertDialogModel
          actionName="Delete"
          isDeleteOpen={isDialogOpen}
          onDeleteHandler={() => DeleteCustomer(currentCustomerId)}
          onHandleDeleteClose={handleClose}
        />
      )}
    </>
  );
}
