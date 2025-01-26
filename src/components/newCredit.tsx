"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AddCredit from "./addCredit";

export const NewCredit = ({ _id }: { _id: string }) => {
  const [openCredit, setOpenCredit] = useState<boolean>(false);

  function handleOpenCredit() {
    setOpenCredit(!openCredit);
  }

  return (
    <>
      <div className="inline-block self-end ">
        <Button onClick={handleOpenCredit} variant="default" className="mr-3">
          {openCredit ? "Close" : "Add Credit"}
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        {openCredit && <AddCredit customerId={_id} />}
        {/* customers List */}
      </div>
    </>
  );
};
