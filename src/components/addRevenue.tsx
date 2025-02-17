"use client";

import { addRevenue } from "@/app/_actions/actions";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { Input } from "./ui/input";
import LoadingSpinner from "./ui/loadingSpinner";

export default function AddRevenue({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <form
      action={async (formData) => {
        startTransition(async () => {
          await addRevenue(formData);
          closeDialog();
        });
      }}
      className="flex flex-col gap-3 items-center justify-center mt-8"
    >
      {/* phone */}
      <div className="flex flex-col justify-center w-[80%]">
        <label htmlFor="amount">Amount</label>
        <Input
          type="number"
          name="amount"
          id="amount"
          className="self-center rounded-xl"
          required
        />
      </div>
      <div className="flex flex-col justify-center w-[80%]">
        <label htmlFor="date">Date</label>
        <DatePicker value={selectedDate} onChange={setSelectedDate} />
        <Input
          id="date"
          type="hidden"
          value={selectedDate?.toISOString()}
          name="date"
        />
      </div>
      <Button
        type="submit"
        className="mt-4 inline w-32 self-center rounded-xl"
        disabled={pending}
      >
        {pending ? <LoadingSpinner /> : "Add Revenue"}
      </Button>
    </form>
  );
}
