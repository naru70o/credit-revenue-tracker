"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button"

import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { UpdateCredit } from "../updateCredit";
import { AlertDialogModel } from "../AlertDialog";

import { deleteCredit } from "@/app/actions/actions";

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

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
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
            <Trash strokeWidth={1.5} />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <Pencil strokeWidth={1.5} /> Update
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

      {isDialogOpen && (
        <UpdateCredit handleClose={handleClose} isDialogOpen={isDialogOpen} />
      )}
    </>
  );
}
