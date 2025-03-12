"use client";
import React from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterCredits() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const handleFilter = (credit: string) => {
    const routeURL = new URLSearchParams(searchParam);
    routeURL.set("credit", credit);
    router.replace(`${pathName}?${routeURL.toString()}`, { scroll: false });
  };

  const activeFilter = searchParam.get("credit") ?? "all";

  return (
    <div className="flex items-center self-end">
      <FilterButton
        onhandlerFilter={handleFilter}
        filter="unpaid"
        activeFilter={activeFilter}
      >
        unpaid
      </FilterButton>
      <FilterButton
        onhandlerFilter={handleFilter}
        filter="paid"
        activeFilter={activeFilter}
        className="border-x border-x-white"
      >
        Paid
      </FilterButton>
      <FilterButton
        onhandlerFilter={handleFilter}
        filter="highest"
        activeFilter={activeFilter}
      >
        highest
      </FilterButton>
    </div>
  );
}

function FilterButton({
  children,
  className,
  onhandlerFilter,
  activeFilter,
  filter,
}: {
  children: React.ReactNode;
  className?: string;
  onhandlerFilter: (credit: string) => void;
  activeFilter: string;
  filter: string;
}) {
  return (
    <Button
      size="sm"
      className={`bg-blue-500 hover:bg-blue-700 ${className || ""}`}
      onClick={() => onhandlerFilter(filter)}
    >
      {children}
    </Button>
  );
}
