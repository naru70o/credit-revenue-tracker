"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { AddCreditForm } from "./addCreditForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function AddCredit({
  customerId,
  isDialogOpen,
  handleClosedialog,
  customerName,
}: {
  customerId: string;
  isDialogOpen: boolean;
  handleClosedialog: (value: boolean) => void;
  customerName: string;
}) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [amount, setAmount] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [personWhotaken, setPersonWhotaken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!amount || !product || !personWhotaken) {
        throw new Error("All fields are required");
      }

      // Create credit data object
      const creditData = {
        customerId,
        amount: Number(amount),
        product,
        personWhotaken,
        tookTime: selectedDate || new Date(),
      };

      const response = await axios.post("/api/credits", creditData);

      // Handle success
      if (response.status === 200) {
        // Reset form fields
        setAmount("");
        setProduct("");
        setPersonWhotaken("");
        setSelectedDate(new Date());
        handleClosedialog(false);
      }
    } catch (error) {
      console.error("Error adding credit:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add credit. Please try again."
      );
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleClosedialog}>
        <DialogContent className="sm:max-w-[425px] rounded-xl w-[96%]">
          <DialogHeader>
            <DialogTitle>Add Credit for {customerName}</DialogTitle>
            <DialogDescription>
              Details for the selected credit.
            </DialogDescription>
          </DialogHeader>
          <div className=" text-black py-4 px-4 grid justify-center">
            <div className="flex flex-col justify-center">
              <AddCreditForm
                amount={amount}
                product={product}
                setAmount={setAmount}
                personWhotaken={personWhotaken}
                setPersonWhotaken={setPersonWhotaken}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setProduct={setProduct}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
