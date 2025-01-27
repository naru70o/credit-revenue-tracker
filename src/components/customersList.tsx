"use client";

import { DeleteCustomer } from "@/app/actions/actions";
import axios from "axios";
import { Trash2, UserPen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertDialogModel } from "./AlertDialog";

interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
}

export default function CustomersList() {
  const [customersData, setCustomersData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [loading, setLoading] = useState(true);

  // const handleUpdate = async (_id: string) => {};

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [setCustomersData, setLoading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleClose = () => {
    setIsDialogOpen(false);
  };

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
              <UserPen strokeWidth={1.5} />
            </div>
          </div>
        </div>
      ))}
      <AlertDialogModel
        actionName="Delete"
        onHandleDeleteClose={handleClose}
        isDeleteOpen={isDialogOpen}
        onDeleteHandler={() => DeleteCustomer(currentCustomerId)}
      />
    </>
  );
}
