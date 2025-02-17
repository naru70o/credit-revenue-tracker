"use client";
import React, { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { updateCredit } from "../app/_actions/actions";
import LoadingSpinner from "./ui/loadingSpinner";

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
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={async (formData: FormData) => {
        startTransition(async () => {
          await updateCredit(formData, creditData._id);
          onhandleClose();
        });
      }}
      className="flex flex-col gap-3 items-center justify-center mt-4"
    >
      {/* Amount */}
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="amount">Amount</label>
        <Input
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          name="amount"
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
          name="product"
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
          name="personWhotaken"
          type="text"
          className="self-center"
          required
        />
      </div>

      {/* Date picker */}
      <div className="flex flex-col justify-center w-full">
        <DatePicker value={selectedDate} onChange={setSelectedDate} />
        <Input type="hidden" name="date" value={selectedDate?.toISOString()} />
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
        <Button type="submit" className="flex-1" disabled={pending}>
          {pending ? <LoadingSpinner /> : "update"}
        </Button>
      </div>
    </form>
  );
}
