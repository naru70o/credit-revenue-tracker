"use client";
import React, { useTransition } from "react";
import { updateCustomerInfo } from "../app/_actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LoadingSpinner from "./ui/loadingSpinner";
import toast from "react-hot-toast";

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

  return (
    <form
      action={async (formData: FormData) => {
        startTransition(async () => {
          const { message, status } = await updateCustomerInfo(formData, _id);
          if (status) {
            toast.success(message);
          } else {
            toast.error(message);
          }
          handleCloseDialog();
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
