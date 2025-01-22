"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
}

export default function CustomersList() {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
            <div className="flex justify-between items-center bg-[#D9D9D9] rounded-lg w-full py-2 px-4 cursor-pointer hover:bg-gray-300">
              <p>{customer.name}</p>
              <p>{customer.phoneNumber}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
