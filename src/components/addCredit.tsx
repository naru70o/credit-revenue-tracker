"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { AddCreditForm } from "./addCreditForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function AddCredit({
  customerId,
  isDialogOpen,
  handleClosedialog,
  customerName,
}: {
  customerId: string;
  isDialogOpen: boolean;
  handleClosedialog: (value: boolean) => void;
  customerName: string;
}) {
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleClosedialog}>
        <DialogContent className="sm:max-w-[425px] rounded-xl w-[96%]">
          <DialogHeader>
            <DialogTitle>Add Credit for {customerName}</DialogTitle>
            <DialogDescription>please fill the Credit info.</DialogDescription>
          </DialogHeader>
          <div className=" text-black py-4 px-4 grid justify-center">
            <div className="flex flex-col justify-center">
              <AddCreditForm
                customerId={customerId}
                closeDialog={handleClosedialog}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
