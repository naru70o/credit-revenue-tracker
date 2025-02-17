"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AddCredit from "./addCredit";

export const NewCredit = ({
  _id,
  customerName,
}: {
  _id: string;
  customerName: string;
}) => {
  const [isDialogOpen, setisDialog] = useState<boolean>(false);

  function handleClosedialog() {
    setisDialog(!isDialogOpen);
  }

  return (
    <>
      <div className="inline-block self-end ">
        <Button
          onClick={handleClosedialog}
          variant="default"
          className="rounded-xl"
        >
          Add credit
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center">
        {isDialogOpen && (
          <AddCredit
            isDialogOpen={isDialogOpen}
            handleClosedialog={handleClosedialog}
            customerId={_id}
            customerName={customerName}
          />
        )}
      </div>
    </>
  );
};
