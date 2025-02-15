"use client";

import { createCustomer } from "@/app/_actions/actions";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AddPerson({
  setIsDialogOpen,
}: {
  setIsDialogOpen: (value: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  // const handleClick = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null); // Reset error state

  //   try {
  //     await axios.post("/api/customers", {
  //       name: personName,
  //       phoneNumber: personNumber,
  //     });

  //     //reseting the fields after submiting
  //     setPersonName("");
  //     setPersonNumber("");
  //     setIsSubmiting(true);
  //     setIsDialogOpen(false);
  //   } catch (err) {
  //     setError("Failed to add customer. Please try again.");
  //     console.error(err);
  //   }
  // };

  return (
    <div className=" text-black py-8 px-4 grid justify-center">
      <div className="flex flex-col justify-center">
        <form
          action={createCustomer}
          className="flex flex-col gap-4 items-center justify-center w-full"
        >
          {/* name */}
          <div className="flex flex-col justify-center">
            <label>Name</label>
            <Input
              id="personName"
              name="name"
              type="text"
              className="self-center rounded-xl"
              required
            />
          </div>
          {/* phone */}
          <div className="flex flex-col justify-center">
            <label>Number</label>
            <Input
              id="personNumber"
              name="phoneNumber"
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
