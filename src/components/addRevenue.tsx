"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DatePicker } from "./ui/datePicker";
import { Menu } from "./menu";

export default function AddRevenue() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [revenue, setRevenue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date); // Update the selected date in the parent component
    console.log("Selected Date:", date); // Log the selected date
  };

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
    } catch (error) {
      console.log("error accured", error);
    }
  };

  console.log("Date:", selectedDate);

  return (
    <>
      <div className="bg-gray-100 text-black py-8 px-4 h-screen grid justify-center">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-2xl text-center">
            Please add your daily Revenue
          </h1>
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
              <DatePicker
                value={selectedDate}
                onChange={(e) => setSelectedDate(e)}
              />{" "}
            </div>
            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              className="mt-4 inline w-32 self-center"
            >
              Add revenue
            </Button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </>
  );
}
