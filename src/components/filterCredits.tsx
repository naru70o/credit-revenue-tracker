"use client";
import React from "react";
import { Button } from "./ui/button";

export default function FilterCredits() {
  return (
    <div className="flex items-center self-end">
      <FilterButton>unpaid</FilterButton>
      <FilterButton className="border-x border-x-white">Paid</FilterButton>
      <FilterButton>highest</FilterButton>
    </div>
  );
}

function FilterButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      size="sm"
      className={`bg-blue-500 hover:bg-blue-700 ${className || ""}`}
    >
      {children}
    </Button>
  );
}
