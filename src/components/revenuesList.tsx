"use client";
import { formatAmount, formatDate } from "@/lib/utils";
import { Trash2, UserPen } from "lucide-react";
import { useState } from "react";
import { AlertDialogModel } from "./AlertDialog";
import { deleteRevenue } from "@/app/actions/actions";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}

const RevenuesList = ({ revenueData }: { revenueData: Revenue[] }) => {
  const [currentRevenue, setCurrentRevenue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  function handleDeleteRevenue(id: string) {
    setCurrentRevenue(id);
    setIsDialogOpen(true);
  }

  return (
    <>
      {revenueData.map((revenue: Revenue) => (
        <div
          key={revenue._id}
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
                onClick={() => handleDeleteRevenue(revenue._id)}
              />
              <UserPen strokeWidth={1.5} />
            </div>
          </div>
        </div>
      ))}
      {isDialogOpen && (
        <AlertDialogModel
          actionName="Delete"
          isDeleteOpen={isDialogOpen}
          onDeleteHandler={() => deleteRevenue(currentRevenue)}
          onHandleDeleteClose={handleCloseDialog}
        />
      )}
    </>
  );
};

export default RevenuesList;
