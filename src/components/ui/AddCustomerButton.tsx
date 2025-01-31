"use client";
import React from "react";
import { Button } from "./button";
import { AddCustomerModel } from "../AddCustomerModel";

export const AddCustomerButton = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 rounded-xl"
      >
        add customer
      </Button>

      {isDialogOpen && (
        <AddCustomerModel
          isDialogOpen={isDialogOpen}
          handleClose={handleClose}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};
