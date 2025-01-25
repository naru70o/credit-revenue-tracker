"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Menu } from "./menu";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { Input } from "./ui/input";
import axios from "axios";

export default function AddCredit({ customerId }: { customerId: string }) {
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

      // Make API call using Axios
      const response = await axios.post("/api/credits", creditData);

      // Handle success
      if (response.status === 200) {
        // Reset form fields
        setAmount("");
        setProduct("");
        setPersonWhotaken("");
        setSelectedDate(new Date());

        // Refresh the page to show updated data
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding credit:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add credit. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 text-black py-4 px-4 grid justify-center">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-2xl text-center">
            Please add credit for this Customer
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 items-center justify-center mt-8"
          >
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
              <DatePicker value={selectedDate} onChange={setSelectedDate} />
            </div>

            <Button
              type="submit"
              className="mt-4 block w-[80%] self-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Credit..." : "Add Credit"}
            </Button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </form>
        </div>
      </div>
      <Menu />
    </>
  );
}
