"use client";

import React from "react";
import { Button } from "./ui/button";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  id: number;
}
interface DetailsProps {
  revenue: Revenue;
  onHandleDelete: (id: number) => void; // Function to handle deletion
}

export const Details: React.FC<DetailsProps> = ({
  revenue,
  onHandleDelete,
}) => {
  const { date, amount, id } = revenue;

  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <div className="flex justify-between w-full items-center">
        <div>amount</div>
        <div>{amount}</div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div>Date</div>
        <div>{date}</div>
      </div>
      <Button type="button" variant="outline" className="w-full">
        Edit
      </Button>
      <Button
        onClick={() => onHandleDelete(id)}
        type="button"
        variant="destructive"
        className="w-full"
      >
        Delete
      </Button>
    </div>
  );
};
