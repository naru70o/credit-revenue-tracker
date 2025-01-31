"use client";
import { formatAmount, formatDate } from "@/lib/utils";
import { Trash2, UserPen } from "lucide-react";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  id: number;
}

const RevenuesList = ({ revenueData }: { revenueData: Revenue[] }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-8 ">
      {revenueData.map((revenue: Revenue) => {
        return (
          <div
            key={revenue.id}
            className="bg-gray-300 rounded-xl w-full py-2 px-4 mt-4"
          >
            <div
              //   onClick={() => handleOpen(revenue.id)}
              className="flex justify-between items-center"
            >
              <div className="flex flex-col items-start gap-1">
                <div>{formatAmount(revenue.amount)}</div>
                <div className="cursor-pointer">
                  your revenue {formatDate(revenue.date)}
                </div>
              </div>
              <div className="flex gap-2">
                <Trash2
                  // onClick={() => handleDelete(customer._id)}
                  strokeWidth={1.5}
                />
                <UserPen strokeWidth={1.5} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RevenuesList;
