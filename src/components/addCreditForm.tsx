"use client";
import React from "react";
import { DatePicker } from "./ui/datePicker";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { createCredit } from "@/app/_actions/actions";
import { useTransition } from "react";
import Spinner from "./ui/spinner";

export const AddCreditForm = ({
  customerId,
  closeDialog,
}: {
  customerId: string;
  closeDialog: (value: boolean) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [pending, startTransition] = useTransition();
  return (
    <form
      action={async (formData) => {
        startTransition(async () => {
          await createCredit(formData, customerId);
          closeDialog(false);
        });
      }}
      className="flex flex-col gap-3 items-center justify-center mt-4 w-full"
    >
      {/* Amount */}
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="amount">Amount</label>
        <Input
          id="amount"
          name="amount"
          type="number"
          className="self-center rounded-xl"
          required
        />
      </div>

      {/* Product */}
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="product">Product</label>
        <Input
          id="product"
          name="product"
          type="text"
          className="self-center rounded-xl"
          required
        />
      </div>

      {/* Person Who Taken */}
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="person">Who took it</label>
        <Input
          id="person"
          name="personWhotaken"
          type="text"
          className="self-center rounded-xl"
          required
        />
      </div>

      {/* Date picker */}
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="tookTime">Date</label>
        <DatePicker value={selectedDate} onChange={setSelectedDate} />
        <Input
          id="tookTime"
          type="hidden"
          name="tookTime"
          value={selectedDate?.toISOString()}
        />
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="mt-4 block w-32 self-center rounded-xl"
      >
        {pending ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          "Add Credit"
        )}
      </Button>
    </form>
  );
};
