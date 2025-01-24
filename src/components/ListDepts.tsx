"use client";

import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const ListDept = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [creditData, setCreditData] = useState<CreditData[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setIsLoading] = useState(false);

  const handleOpen = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  async function fetchData() {
    try {
      const creditsData = await credits(); // Await the promise
      console.log("here is the credits data", creditsData);
      return creditsData.credits;
    } catch (error) {
      console.error("Failed to fetch credits:", error);
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
          <p>your total owes to people {totalAmountCredits}</p>
        </div>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">
            <Link href="/revenue/add">add revenue</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 ">
        {creditData.map((credit: CreditData) => {
          const customerInfo = customers.find(
            (customer: CustomerData) => customer._id === credit.customerId
          );

          console.log("Customer Info: this is the final", customerInfo);

          return (
            <div
              key={credit._id}
              className="bg-[#D9D9D9] rounded-xl w-full py-2 px-4 mt-4"
            >
              <div
                // onClick={() => handleOpen(credit.id)}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="cursor-pointer">⬇️</div>
                  <p>{credit.amount}</p>
                  <p>{customerInfo?.name}</p>
                </div>
                <p>{formatDate(credit.tookTime)}</p>
              </div>
              {/* <CreditDetails /> */}
            </div>
          );
        })}
      </div>
      <Menu />
    </div>
  );
};

export default ListDept;
