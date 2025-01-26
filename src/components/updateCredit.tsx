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
  selectedCredit,
  isDialogOpen,
  handleClose,
}: {
  selectedCredit: CreditData;
  isDialogOpen: boolean;
  handleClose: () => void;
}) => {
  const [amount, setAmount] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [personWhotaken, setPersonWhotaken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Update Credit</DialogTitle>
          <DialogDescription>
            Details for the selected credit.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-3 items-center justify-center mt-8">
          {/* Amount */}
          <div className="flex flex-col justify-center w-[80%]">
            <label htmlFor="amount">Amount</label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              className="self-center"
              required
            />
          </div>

          {/* Product */}
          <div className="flex flex-col justify-center w-[80%]">
            <label htmlFor="product">Product</label>
            <Input
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              type="text"
              className="self-center"
              required
            />
          </div>

          {/* Person Who Taken */}
          <div className="flex flex-col justify-center w-[80%]">
            <label htmlFor="person">Who took it</label>
            <Input
              id="person"
              value={personWhotaken}
              onChange={(e) => setPersonWhotaken(e.target.value)}
              type="text"
              className="self-center"
              required
            />
          </div>

          {/* Date picker */}
          <div className="flex flex-col justify-center w-[80%]">
            {/* <DatePicker value={selectedDate} onChange={setSelectedDate} /> */}
          </div>

          <div className="flex justify-center w-[80%]">
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="mt-4 block self-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Credit..." : "Add Credit"}
            </Button>
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
};
