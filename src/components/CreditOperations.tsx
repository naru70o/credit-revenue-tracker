"use client";

import { deleteCredit } from "@/app/actions/actions";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

interface CreditData {
  amount: number;
  customerId: string;
  isPaid: boolean;
  personWhotaken: string;
  product: string;
  tookTime: string;
  __v: number;
  _id: string;
}

export const CreditOperations = ({ credit }: { credit: CreditData }) => {
  return (
    <div className="flex items-center gap-2">
      <Pencil size={16} />
      <Trash2 size={16} onClick={() => deleteCredit(credit._id)} />
    </div>
  );
};
