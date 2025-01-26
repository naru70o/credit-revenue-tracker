"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { UpdateCredit } from "../updateCredit";

export function Dropdown() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto inline-block">
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash strokeWidth={1.5} />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <Pencil strokeWidth={1.5} /> Update
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDialogOpen && (
        <UpdateCredit handleClose={handleClose} isDialogOpen={isDialogOpen} />
      )}
    </>
  );
}
