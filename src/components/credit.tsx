"use client";
import { formatAmount, formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { CreditDetailsModal } from "./creditDetailsModal";

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

export const Credit = ({
  creditData,
  customers,
}: {
  creditData: CreditData[];
  customers: CustomerData[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedCredit, setSelectedCredit] = useState<CreditData | null>(null);
  const handleOpen = (credit: CreditData) => {
    setSelectedCredit(credit);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedCredit(null);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-8 ">
        {creditData.credits.map((credit: CreditData) => {
          const customerInfo = customers.find(
            (customer: CustomerData) => customer._id === credit.customerId
          );

          return (
            <div
              key={credit._id}
              onClick={() => handleOpen(credit)}
              className="bg-[#D9D9D9] rounded-xl w-full py-2 px-4 mt-4 relative overflow-clip"
            >
              <div
                className={`absolute left-0 top-0 h-full w-2 bg-[#7226ff]`}
              ></div>
              <div
                // onClick={() => handleOpen(credit.id)}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p>{customerInfo?.name}</p>
                    <p>
                      <span className="font-medium">
                        {formatAmount(credit.amount)}
                      </span>{" "}
                      at {formatDate(credit.tookTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Dialog (Modal) */}
      <CreditDetailsModal
        isDialogOpen={isDialogOpen}
        handleClose={handleClose}
        selectedCredit={selectedCredit}
        customers={customers}
      />
    </>
  );
};
