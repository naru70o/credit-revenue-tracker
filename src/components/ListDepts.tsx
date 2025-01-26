"use client";

import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { formatAmount, formatDate } from "@/lib/utils";
// import { Dialog, DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CreditDetailsModal } from "./creditDetailsModal";
import { Credit } from "./credit";

interface CreditData {
  _id: string;
  customerId: string;
  amount: number;
  product: string;
  personWhotaken: string;
  tookTime: string;
  isPaid: boolean;
  __v: number;
}

interface CustomerData {
  _id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
}

async function credits(): Promise<CreditData[]> {
  try {
    const response = await axios.get("/api/credits");
    return response.data; // Assuming the API returns { data: CreditData[] }
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
}

async function customer(): Promise<CustomerData[]> {
  try {
    const response = await axios.get(`/api/customers`);
    return response.data; // Return only the data
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw new Error("Failed to fetch customers"); // Correctly throw an error
  }
}

async function fetchCustomers() {
  try {
    const customersData = await customer(); // Await the promise
    console.log("here is the customers data", customersData);
    return customersData;
  } catch (error) {
    throw Error("Failed to fetch customers:");
  }
}

const ListDept = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [creditData, setCreditData] = useState<CreditData[]>([]);
 
  const [loading, setIsLoading] = useState(false);



  async function fetchData() {
    try {
      const creditsData = await credits(); // Await the promise
      console.log("here is the credits data", creditsData);
      return creditsData.credits;
    } catch (error) {
      console.error("Failed to fetch credits:", error);
    }
  }

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const creditsData = await fetchData();
        setCreditData(creditsData);
        const customersData = await fetchCustomers();
        setCustomers(customersData);
        console.log("Customers Data:", customersData);
        setIsLoading(true);
      } catch (error) {
        console.error("Failed to fetch credits:", error);
      }
    };
    fetchCredits();
  }, []);

  // while the loading state is false, show a loading message
  if (!loading) {
    return <div>Loading...</div>;
  }

  // this will show the total  of credits
  const totalAmountCredits = creditData.reduce(
    (total, credit) => total + credit.amount,
    0
  );

  return (
    <div className="text-gray-700 py-16 px-4">
      <div className="flex flex-col justify-center gap-12">
        <div>
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check your depts
          </h1>
          <p>
            your total owes to people{" "}
            <span className="font-medium">
              {formatAmount(totalAmountCredits)}
            </span>{" "}
          </p>
        </div>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">
            <Link href="/revenue/add">filtering</Link>
          </Button>
        </div>
      </div>
      <Credit creditData={creditData} customers={customers} />

      <Menu />
    </div>
  );
};

export default ListDept;
