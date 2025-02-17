import React, { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { DatePicker } from "./ui/datePicker";
import { updateRevenue } from "../app/_actions/actions";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/loadingSpinner";

interface Revenue {
  amount: number;
  date: string; // Assuming date is in the format "DD/MMM/YYYY"
  _id: string;
}

export default function UpdateRevenueForm({
  currentRevenue,
  onHandleClose,
}: {
  currentRevenue: Revenue;
  onHandleClose: () => void;
}) {
  const [amount, setAmount] = useState(currentRevenue.amount.toString());
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(currentRevenue.date)
  );
  const [pending, startTransition] = useTransition();
  return (
    <form
      action={async (formData: FormData) => {
        startTransition(async () => {
          await updateRevenue(formData, currentRevenue._id);
          onHandleClose();
        });
      }}
      className="flex flex-col gap-3 items-center justify-center mt-8"
    >
      {/* phone */}
      <div className="flex flex-col justify-center w-[80%]">
        <label htmlFor="text">amount</label>
        <Input
          value={amount}
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
          type="text"
          className="self-center"
          required
        />
      </div>
      <div className="flex flex-col justify-center w-[80%]">
        <DatePicker
          value={selectedDate}
          onChange={() => setSelectedDate(selectedDate)}
        />{" "}
        <Input value={selectedDate?.toISOString()} name="date" type="hidden" />
      </div>
      <Button
        type="submit"
        className="mt-4 inline w-32 self-center rounded-xl"
        disabled={pending}
      >
        {pending ? <LoadingSpinner /> : "Update"}
      </Button>
    </form>
  );
}
