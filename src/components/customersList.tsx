"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dropdown } from "./ui/droppMenu";
interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
}

export default function CustomersList() {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleDelete = async (_id: string) => {
    try {
      const res = await axios.delete(`/api/customers/${_id}`);
      // delete this customer based on this id
      console.log(res.data);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (_id: string) => {};

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

  return (
    <>
      {customersData.map((customer: Customer) => (
        <div key={customer._id}>
          <Link href={`/customers/${customer._id}`}>
            <div className="flex justify-between items-center bg-[#D9D9D9] rounded-xl w-full py-2 px-4 cursor-pointer hover:bg-gray-300">
              <div>
                <p>{customer.name}</p>
                <p>{customer.phoneNumber}</p>
              </div>
              <Dropdown
                delete={() => handleDelete(customer._id)}
                edit={() => handleUpdate(customer._id)}
              />
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
