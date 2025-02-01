"use client";

import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { Input } from "./ui/input";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

export default function AddRevenue({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [revenue, setRevenue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!selectedDate) {
  //     setError("Please select a date");
  //     return;
  //   }

  //   if (!revenue) {
  //     setError("Please enter a revenue amount");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("/api/revenue", {
  //       amount: revenue,
  //       date: selectedDate,
  //     });
  //     revalidateTag("revenues");

  //     console.log("Revenue added successfully:", response.data);

  //     setSelectedDate(undefined);
  //     setRevenue("");
  //     closeDialog();
  //   } catch (error) {
  //     console.log("error accured", error);
  //   }
  // };

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
      const response = await fetch("/api/revenue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: revenue,
          date: selectedDate,
        }),
      });

      if (response.ok) {
        // Revalidate the "revenues" tag by calling a server action or API route

        console.log("Revenue added successfully");

        setSelectedDate(undefined);
        setRevenue("");
        // revalidateTag("revenue");
        closeDialog();
        router.push("/revenue");
      } else {
        console.error("Failed to add revenue");
      }
    } catch (error) {
      console.error("Error occurred:", error);
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
      <Button type="submit" className="mt-4 inline w-32 self-center rounded-xl">
        Add revenue
      </Button>
    </form>
  );
}
