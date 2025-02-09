"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { updateCredit } from "@/_actions/actions";

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

interface UpdatedCreditData {
  amount: number;
  product: string;
  personWhotaken: string;
  tookTime: string;
}

export default function CreditUpdateForm({
  creditData,
  onhandleClose,
}: {
  creditData: CreditData;
  onhandleClose: () => void;
}) {
  const [amount, setAmount] = useState<string>(creditData.amount.toString());
  const [product, setProduct] = useState<string>(creditData.product);
  const [personWhotaken, setPersonWhotaken] = useState<string>(
    creditData.personWhotaken
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(creditData.tookTime)
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Prepare the updated data
    const updatedData: UpdatedCreditData = {
      amount: parseFloat(amount),
      product,
      personWhotaken,
      tookTime:
        selectedDate instanceof Date
          ? selectedDate.toISOString()
          : selectedDate || "",
    };

    try {
      // Call the server action to update the credit
      await updateCredit(creditData._id, updatedData);
      onhandleClose(); // Close the form after successful update
    } catch (error) {
      console.log(error);
      setError("Failed to update credit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 items-center justify-center mt-4"
    >
      {/* Amount */}
      <div className="flex flex-col justify-center w-full">
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
      <div className="flex flex-col justify-center w-full">
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
      <div className="flex flex-col justify-center w-full">
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
      <div className="flex flex-col justify-center w-full">
        <DatePicker value={selectedDate} onChange={setSelectedDate} />
      </div>

      <div className="flex items-center justify-center w-full">
        <Button
          className="flex-1"
          type="button"
          variant="secondary"
          onClick={onhandleClose}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Add Credit"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </form>
  );
}
