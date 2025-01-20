"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
  id: number;
  name: string;
  phone: string;
}

export default function PeopleList() {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(customersData);

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
        // console.log()
        <div
          className="flex justify-between w-full items-center"
          key={customer.id}
        >
          <p>{customer.name}</p>
          <p>{customer.phone}</p>
        </div>
      ))}
    </>
  );
}
