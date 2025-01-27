"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CreditUpdateForm() {
  const [amount, setAmount] = useState<string>("10000");
  const [product, setProduct] = useState<string>("");
  const [personWhotaken, setPersonWhotaken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
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
        <Button type="button" variant="secondary" onClick={handleClose}>
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
  );
}
