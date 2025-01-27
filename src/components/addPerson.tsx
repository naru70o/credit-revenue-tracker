"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddPerson() {
  const router = useRouter();
  const [personName, setPersonName] = useState<string>("");
  const [personNumber, setPersonNumber] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await axios.post("/api/customers", {
        name: personName,
        phoneNumber: personNumber,
      });

      console.log(response.data);
      router.push("/customers");
      // Optionally, you can reset the form fields here
      setPersonName("");
      setPersonNumber("");
    } catch (err) {
      setError("Failed to add customer. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className=" text-black py-8 px-4 grid justify-center">
      <div className="flex flex-col justify-center">
        <form
          onSubmit={handleClick}
          className="flex flex-col gap-4 items-center justify-center w-full"
        >
          {/* name */}
          <div className="flex flex-col justify-center">
            <label>Name</label>
            <Input
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              type="text"
              className="self-center rounded-xl"
              required
            />
          </div>
          {/* phone */}
          <div className="flex flex-col justify-center">
            <label>Number</label>
            <Input
              value={personNumber}
              onChange={(e) => setPersonNumber(e.target.value)}
              type="text"
              className="self-center rounded-xl"
              required
            />
          </div>
          <Button
            type="submit"
            className="mt-4 inline w-32 self-center rounded-xl"
          >
            Add customer
          </Button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
