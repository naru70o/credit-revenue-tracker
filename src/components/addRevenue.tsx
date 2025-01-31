"use client";

import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { Input } from "./ui/input";
import { revalidateTag } from "next/cache";

export default function AddRevenue({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [revenue, setRevenue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDate) {
      setError("Please select a date");
      return;
    }

    if (!revenue) {
      setError("Please enter a revenue amount");
      return;
    }

    try {
      const response = await axios.post("/api/revenue", {
        amount: revenue,
        date: selectedDate,
      });

      console.log("Revenue added successfully:", response.data);

      setSelectedDate(undefined);
      setRevenue("");
      revalidateTag("revenues");
      closeDialog();
    } catch (error) {
      console.log("error accured", error);
    }
  };

  console.log("Date:", selectedDate);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 items-center justify-center mt-8"
    >
      {/* phone */}
      <div className="flex flex-col justify-center w-[80%]">
        <label htmlFor="text">amount</label>
        <Input
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          type="text"
          className="self-center"
          required
        />
      </div>
      <div className="flex flex-col justify-center w-[80%]">
        <DatePicker value={selectedDate} onChange={(e) => setSelectedDate(e)} />{" "}
      </div>
      <Button type="submit" className="mt-4 inline w-32 self-center">
        Add revenue
      </Button>
    </form>
  );
}
