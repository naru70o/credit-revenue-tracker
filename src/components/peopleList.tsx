"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
  id: number;
  name: string;
  number: string;
}

export default function PeopleList() {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(customersData.map((customer: Customer) => console.log(customer)));

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        console.log(response.data);
        setCustomersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [setCustomersData]);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    {
       customersData.map((customer: Customer) => {
       return (
        <div className="flex justify-center items-center" key={customer.id}>
          <p>{customer.name}</p>
          <p>{customer.number}</p>
        </div>
      )
    }
      )
    }
  );
}
