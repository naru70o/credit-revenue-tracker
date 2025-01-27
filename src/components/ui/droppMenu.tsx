"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EllipsisVertical,
  Pencil,
  Square,
  SquareCheckBig,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { UpdateCredit } from "../updateCredit";
import { AlertDialogModel } from "../AlertDialog";

import { deleteCredit, setCreditToPaid } from "@/app/actions/actions";

interface CreditData {
  amount: number;
  customerId: string;
  isPaid: boolean;
  personWhotaken: string;
  product: string;
  tookTime: string;
  __v: number;
  _id: string;
}

export function Dropdown({ creditData }: { creditData: CreditData }) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  const handlePaidOpen = () => {
    setIsPaid(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto inline-block">
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
            <div className="flex w-full gap-2 items-center">
              <Trash strokeWidth={1.5} />
              Delete
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <div className="flex w-full gap-2 items-center">
              <Pencil strokeWidth={1.5} /> Update
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsPaid(true)}>
            {creditData.isPaid === true ? (
              <div className="flex w-full items-center gap-2">
                <SquareCheckBig strokeWidth={1.5} /> paided
              </div>
            ) : (
              <div className="flex w-full items-center gap-2">
                <Square strokeWidth={1.5} /> paid
              </div>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDeleteOpen && (
        <AlertDialogModel
          actionName="Delete"
          isDeleteOpen={isDeleteOpen}
          onHandleDeleteClose={handleCloseDelete}
          onDeleteHandler={() => deleteCredit(creditData._id)}
        />
      )}

      {isPaid && (
        <AlertDialogModel
          actionName="Paid"
          isDeleteOpen={isPaid}
          onHandleDeleteClose={handlePaidOpen}
          onDeleteHandler={() => setCreditToPaid(creditData._id)}
        />
      )}

      {isDialogOpen && (
        <UpdateCredit
          creditData={creditData}
          handleClose={handleClose}
          isDialogOpen={isDialogOpen}
        />
      )}
    </>
  );
}
