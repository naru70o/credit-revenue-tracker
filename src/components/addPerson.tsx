"use client";

import { createCustomer } from "@/app/_actions/actions";
import { useTransition, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Spinner from "./ui/spinner";
import toast from "react-hot-toast";

export default function AddPerson({
  setIsDialogOpen,
}: {
  setIsDialogOpen: (value: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ name?: string; phoneNumber?: string }>(
    {}
  );
  const formref = useRef<HTMLFormElement | null>(null);

  return (
    <div className="text-black py-8 px-4 grid justify-center">
      <div className="flex flex-col justify-center">
        <form
          action={async (formData) => {
            startTransition(async () => {
              setErrors({}); // Clear previous errors

              const response = await createCustomer(formData);

              if (response.status) {
                toast.success(response.message ?? "success");
                setIsDialogOpen(false);
              } else if (response.errors) {
                // Display validation errors
                const newErrors: { name?: string; phoneNumber?: string } = {};
                response.errors.forEach(
                  (err: { path: string; message: string }) => {
                    newErrors[err.path as "name" | "phoneNumber"] = err.message;
                  }
                );
                setErrors(newErrors);
              } else {
                toast.error(response.message ?? "failed");
              }
            });
          }}
          ref={formref}
          className="flex flex-col gap-4 items-center justify-center w-full"
        >
          {/* Name Input */}
          <div className="flex flex-col justify-center w-full">
            <label>Name</label>
            <Input
              id="personName"
              name="name"
              type="text"
              className="self-center rounded-xl"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col justify-center w-full">
            <label>Number</label>
            <Input
              id="personNumber"
              name="phoneNumber"
              type="text"
              className="self-center rounded-xl"
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          <Button
            disabled={isPending}
            className="mt-4 inline w-32 self-center rounded-xl"
          >
            {isPending ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              "Add customer"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
