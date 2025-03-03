"use client";
import React, { useTransition } from "react";
import { updateCustomerInfo } from "../app/_actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LoadingSpinner from "./ui/loadingSpinner";
import toast from "react-hot-toast";
import { string } from "zod";

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
  const [isPending, startTransition] = useTransition();
  const [error, setErrors] = React.useState<{
    name?: string;
    phoneNumber?: string;
  }>({});

  return (
    <form
      action={async (formData: FormData) => {
        startTransition(async () => {
          const response = await updateCustomerInfo(formData, _id);
          if (response.status) {
            toast.success(response.message ?? "success");
            handleCloseDialog();
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
            toast.error(response.message ?? "error");
          }
        });
      }}
      className="flex flex-col gap-4 items-center justify-center w-full"
    >
      {/* name */}
      <div className="flex flex-col justify-center">
        <label>Name</label>
        <Input
          name="personName"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          type="text"
          className="self-center rounded-xl"
          required
        />
        <Input name="id" type="hidden" value={_id} />
        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
      </div>
      {/* phone */}
      <div className="flex flex-col justify-center">
        <label>Number</label>
        <Input
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          className="self-center rounded-xl"
          required
        />
        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
      </div>
      <Button
        type="submit"
        className="mt-4 min-w-32 inline self-center rounded-xl"
      >
        {isPending ? <LoadingSpinner /> : "Update Customer"}
      </Button>
    </form>
  );
};

export default UpdateCustomerForm;
