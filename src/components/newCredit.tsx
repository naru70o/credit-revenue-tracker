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
          {isDialogOpen ? "Close" : "Add Credit"}
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        {isDialogOpen && (
          <AddCredit
            isDialogOpen={isDialogOpen}
            handleClosedialog={handleClosedialog}
            customerId={_id}
            customerName={customerName}
          />
        )}
        {/* customers List */}
      </div>
    </>
  );
};
