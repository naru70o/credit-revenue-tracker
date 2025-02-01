"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AddRevenueModel from "./addRevenueModel";

export default function AddRevenueButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function closeDialog() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-700 rounded-xl"
        onClick={() => setIsDialogOpen(true)}
      >
        Add revenue
      </Button>
      {isDialogOpen && (
        <AddRevenueModel
          isDialogOpen={isDialogOpen}
          closeDialog={closeDialog}
        />
      )}
    </>
  );
}
