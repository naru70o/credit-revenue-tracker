"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import AddRevenue from "./addRevenue";

export default function AddRevenueModel({
  isDialogOpen,
  closeDialog,
}: {
  isDialogOpen: boolean;
  closeDialog: () => void;
}) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Add Your Today&apos;s Revenue</DialogTitle>
          <DialogDescription>
            Please put the Amount and the Date.
          </DialogDescription>
        </DialogHeader>
        <AddRevenue closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
