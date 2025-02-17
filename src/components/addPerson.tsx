"use client";

import { createCustomer } from "@/app/_actions/actions";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Spinner from "./ui/spinner";

export default function AddPerson({
  setIsDialogOpen,
}: {
  setIsDialogOpen: (value: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  console.log(isPending, "[ this is from the client ]");

  return (
    <div className=" text-black py-8 px-4 grid justify-center">
      <div className="flex flex-col justify-center">
        <form
          action={async (formData) => {
            startTransition(async () => {
              await createCustomer(formData);
              setIsDialogOpen(false);
            });
          }}
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
