"use client";

import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/droppMenu";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  id: number;
}

const revenuesData: Revenue[] = [
  { amount: 1200, date: "15/Oct/2025", id: 1 },
  { amount: 950, date: "22/Nov/2025", id: 2 },
  { amount: 3000, date: "05/Dec/2025", id: 3 },
  { amount: 750, date: "10/Jan/2026", id: 4 },
  { amount: 1800, date: "25/Feb/2026", id: 5 },
];

async function revenueFetcher() {
  try {
    const response = await axios.get("/api/revenue");
    const data = response.data;
    console.log("here is your revenue data", data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch revenue data");
  }
}

const Page = () => {
  const [revenueData, setRevenueData] = useState(revenuesData);
  const [isLoading, setIsLoading] = useState(true);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAllData() {
      const revenueData = await revenueFetcher();
      setRevenueData(revenueData.revenues);
      console.log(revenueData);
      setIsLoading(false);
    }
    fetchAllData();
  }, []);

  const handleOpen = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  //   Delete

  function handleDelete(id: number) {
    const updatedData = revenueData.filter((item) => item.id !== id);
    setRevenueData(updatedData);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="text-black py-16 px-4 bg-gray-100">
      <div className="flex flex-col justify-center gap-12">
        <div>
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check your revenue
          </h1>
          <p>your total revenue is {totalRevenue}</p>
        </div>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">
            <Link href="/revenue/add">add revenue</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 ">
        {/* <revenue list /> */}

        {revenueData.map((revenue) => {
          return (
            <div
              key={revenue.id}
              className="bg-gray-300 rounded-xl w-full py-2 px-4 mt-4"
            >
              <div
                onClick={() => handleOpen(revenue.id)}
                className="flex justify-between items-center"
              >
                <div className="flex flex-col items-start gap-1">
                  <div>{revenue.amount}</div>
                  <div className="cursor-pointer">
                    your revenue {formatDate(revenue.date)}
                  </div>
                </div>
                <Dropdown />
              </div>
            </div>
          );
        })}
      </div>
      <Menu />
    </div>
  );
};

export default Page;
