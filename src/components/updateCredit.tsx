"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { formatDate } from "@/lib/utils";
import { DatePicker } from "./ui/datePicker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

export const UpdateCredit = ({
  isDialogOpen,
  handleClose,
}: {
  isDialogOpen: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Update Credit</DialogTitle>
          <DialogDescription>
            Details for the selected credit.
          </DialogDescription>
        </DialogHeader>
        {/* form  */}
      </DialogContent>
    </Dialog>
  );
};
