import React from "react";
import { DatePicker } from "./ui/datePicker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const AddCreditForm = ({
  handleSubmit,
  amount,
  setAmount,
  product,
  setProduct,
  personWhotaken,
  setPersonWhotaken,
  selectedDate,
  setSelectedDate,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  amount: string;
  setAmount: (amount: string) => void;
  product: string;
  setProduct: (product: string) => void;
  personWhotaken: string;
  setPersonWhotaken: (personWhotaken: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (selectedDate: Date | undefined) => void;
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 items-center justify-center mt-4 w-full"
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

      <Button
        type="submit"
        className="mt-4 block w-full self-center"
        // disabled={isSubmitting}
      >
        add credit
      </Button>
    </form>
  );
};
