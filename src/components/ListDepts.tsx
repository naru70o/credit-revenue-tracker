"use client";

import { Details } from "@/components/details";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

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

const ListDept = () => {
  const [revenueData, setRevenueData] = useState(revenuesData);
  const [openId, setOpenId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  //   Delete

  function handleDelete(id: number) {
    const updatedData = revenueData.filter((item) => item.id !== id);
    setRevenueData(updatedData);
  }

  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="text-gray-700 py-16 px-4">
      <div className="flex flex-col justify-center gap-12">
        <div>
          <h1 className="font-bold text-2xl text-start w-1/2">
            Check your depts
          </h1>
          <p>your total owes to people {totalRevenue}</p>
        </div>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">
            <Link href="/revenue/add">add revenue</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 ">
        <div className="flex justify-between items-center w-full font-normal px-4">
          <p>amount</p>
          <p>date</p>
          <p>status</p>
        </div>

        {/* <revenue list /> */}

        {revenueData.map((revenue) => {
          return (
            <div
              key={revenue.id}
              className="bg-[#D9D9D9] rounded-lg w-full py-2 px-4 mt-4"
            >
              <div
                onClick={() => handleOpen(revenue.id)}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="cursor-pointer">⬇️</div>
                  <p>{revenue.amount}</p>
                </div>
                <p>{revenue.date}</p>
                <p>💹</p>
              </div>
              {openId === revenue.id && (
                <Details revenue={revenue} onHandleDelete={handleDelete} />
              )}
            </div>
          );
        })}
      </div>
      <Menu />
    </div>
  );
};

export default ListDept;
