import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import AddPerson from "./addPerson";

export const AddCustomerModel = ({
  isDialogOpen,
  handleClose,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  handleClose: () => void;
  setIsDialogOpen: (value: boolean) => void;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>
            Please put the users name and number.
          </DialogDescription>
        </DialogHeader>
        <AddPerson setIsDialogOpen={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
