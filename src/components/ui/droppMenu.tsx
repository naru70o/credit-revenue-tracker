"use client";
import { deleteCredit } from "@/app/actions/actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

// next js doesm't wanna let me to pass event handler from a server components to a client component

// solution i'll take the delete div to a client component and pass the event handler from there

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto inline-block">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => deleteCredit(creditData._id)}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>Update</DropdownMenuItem>
        <DropdownMenuItem>paid</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
