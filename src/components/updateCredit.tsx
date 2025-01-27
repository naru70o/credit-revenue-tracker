"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import CreditUpdateForm from "./creditUpdateForm";

interface CreditData {
  _id: string;
  customerId: string;
  amount: number;
  product: string;
  personWhotaken: string;
  tookTime: string;
  isPaid: boolean;
  __v: number;
}

export const UpdateCredit = ({
  isDialogOpen,
  handleClose,
  creditData,
}: {
  isDialogOpen: boolean;
  handleClose: () => void;
  creditData: CreditData;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl w-[90%]">
        <DialogHeader>
          <DialogTitle>Update Credit</DialogTitle>
          <DialogDescription>
            Details for the selected credit to update.
          </DialogDescription>
        </DialogHeader>
        <CreditUpdateForm creditData={creditData} onhandleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
