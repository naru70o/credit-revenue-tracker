import { formatAmount, formatDate } from "@/lib/utils";
import React from "react";

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

export const DialogCreditDetails = ({
  selectedCredit,
  customers,
}: {
  selectedCredit: CreditData;
  customers: CustomerData[];
}) => {
  console.log("from dialogCreditDetails", customers);
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center gap-2">
        <p className="text-right">Customer:</p>
        <p className="col-span-3">
          {customers.find((c) => c._id === selectedCredit.customerId)?.name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-right">Amount:</p>
        <p className="col-span-3">{formatAmount(selectedCredit.amount)}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-right">Who took it:</p>
        <p className="col-span-3">{selectedCredit.personWhotaken}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-right">Date:</p>
        <p className="col-span-3">{formatDate(selectedCredit.tookTime)}</p>
      </div>
    </div>
  );
};

//  {selectedCredit && (
//           <DialogCreditDetails
//             creditData={selectedCredit}
//             customers={customers}
//           />
//         )}
