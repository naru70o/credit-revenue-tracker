"use client";
import { updateCustomerInfo } from "@/app/actions/actions";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Customer {
  _id: string;
  name: string;
  phoneNumber: string;
}

interface UpdateDate {
  name: string;
  phoneNumber: string;
}

const UpdateCustomerForm = ({
  currentCustomer,
  handleCloseDialog,
}: {
  currentCustomer: Customer;
  handleCloseDialog: () => void;
}) => {
  const [personName, setPersonName] = React.useState(currentCustomer.name);
  const [phoneNumber, setPhoneNumber] = React.useState<string>(
    currentCustomer.phoneNumber
  );

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateData: UpdateDate = {
      name: personName,
      phoneNumber: phoneNumber,
    };

    try {
      await updateCustomerInfo(currentCustomer._id, updateData);
      handleCloseDialog();
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          className="self-center rounded-xl"
          required
        />
      </div>
      <Button type="submit" className="mt-4 inline self-center rounded-xl">
        Update Customer
      </Button>
    </form>
  );
};

export default UpdateCustomerForm;
