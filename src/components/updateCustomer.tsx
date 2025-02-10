"use client";
import { updateCustomerInfo } from "../app/_actions/actions";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Customer {
  _id: string | undefined;
  name: string | undefined;
  phoneNumber: string | undefined;
}

interface UpdateDate {
  name: string | undefined;
  phoneNumber: string | undefined;
}

const UpdateCustomerForm = ({
  currentCustomer,
  handleCloseDialog,
}: {
  currentCustomer: Customer | null;
  handleCloseDialog: () => void;
}) => {
  const [personName, setPersonName] = React.useState(currentCustomer?.name);
  const [phoneNumber, setPhoneNumber] = React.useState(
    currentCustomer?.phoneNumber
  );
  const [_id, setId] = React.useState<string | undefined>(currentCustomer?._id);

  async function handleClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateData: UpdateDate = {
      name: personName,
      phoneNumber: phoneNumber,
    };

    try {
      await updateCustomerInfo(_id, updateData);
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
