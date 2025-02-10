"use client";
import { formatAmount, formatDate } from "@/lib/utils";
import { Trash2, UserPen } from "lucide-react";
import { useState } from "react";
import { AlertDialogModel } from "./AlertDialog";
import { deleteRevenue } from "../app/_actions/actions";
import { UpdateRevenueModel } from "./updateRevenueModel";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}

const RevenuesList = ({ revenueData }: { revenueData: Revenue[] }) => {
  const [currentRevenue, setCurrentRevenue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentRevenueToUpdate, setCurrentRevenueToUpdate] =
    useState<Revenue | null>(null);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUpdateClose = () => {
    setIsUpdateDialogOpen(false);
  };

  function handleDeleteRevenue(id: string) {
    setCurrentRevenue(id);
    setIsDialogOpen(true);
  }

  function handleUpdateRevenue(_id: string, amount: number, date: string) {
    const revenue: Revenue = {
      _id,
      amount,
      date,
    };
    setCurrentRevenueToUpdate(revenue);
    setIsUpdateDialogOpen(true);
  }

  return (
    <>
      {revenueData.map((revenue: Revenue) => (
        <div
          key={revenue._id}
          className="bg-gray-300 rounded-xl w-full py-2 px-4 mt-4 relative overflow-clip"
        >
          <div
            className={`absolute left-0 top-0 h-full w-2 bg-[#7226ff]`}
          ></div>
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
              <UserPen
                strokeWidth={1.5}
                onClick={() =>
                  handleUpdateRevenue(revenue._id, revenue.amount, revenue.date)
                }
              />
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

      {isUpdateDialogOpen && currentRevenueToUpdate && (
        <UpdateRevenueModel
          toggleDialog={isUpdateDialogOpen}
          currentRevenue={currentRevenueToUpdate}
          onHandleClose={handleUpdateClose}
        />
      )}
    </>
  );
};

export default RevenuesList;
