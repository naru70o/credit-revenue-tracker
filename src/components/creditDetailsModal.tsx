import React from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { formatDate } from "@/lib/utils";

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

export const CreditDetailsModal = ({
  isDialogOpen,
  handleClose,
  selectedCredit,
  customers,
}: {
  isDialogOpen: boolean;
  handleClose: () => void;
  selectedCredit: CreditData | null;
  customers: CustomerData[];
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Credit Details</DialogTitle>
          <DialogDescription>
            Details for the selected credit.
          </DialogDescription>
        </DialogHeader>
        {selectedCredit && (
          <div className="flex flex-col gap-2 py-4">
            <div className="flex items-center gap-2">
              <p className="text-right">Customer:</p>
              <p className="col-span-3">
                {
                  customers.find((c) => c._id === selectedCredit.customerId)
                    ?.name
                }
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-right">Amount:</p>
              <p className="col-span-3">{selectedCredit.amount}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-right">Who took it:</p>
              <p className="col-span-3">{selectedCredit.personWhotaken}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-right">Date:</p>
              <p className="col-span-3">
                {formatDate(selectedCredit.tookTime)}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
