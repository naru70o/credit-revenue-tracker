"use client";
import React from "react";
import Link from "next/link";
// naviagte hook

import { createPortal } from "react-dom";
import {
  ArrowUpFromLine,
  ChartNoAxesColumnIncreasing,
  CircleUser,
  HomeIcon,
  UserRoundPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const Menu = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  return createPortal(
    <div className="w-full fixed bottom-0 left-0 py-7 px-4 bg-slate-200 rounded-t-3xl text-end">
      <div className="flex justify-between items-center">
        <Link
          href="/dashboard"
          className={`${currentPath === "/dashboard" ? "text-blue-500" : ""}`}
        >
          <HomeIcon />
        </Link>
        <Link href="#">
          <ArrowUpFromLine />
        </Link>
        <Link
          href="/customers"
          className={`${currentPath === "/dashboard" ? "text-blue-500" : ""}`}
        >
          <UserRoundPlus />
        </Link>
        <Link href="#">
          <ChartNoAxesColumnIncreasing />
        </Link>
        <Link href="#">
          <CircleUser />
        </Link>
      </div>
    </div>,
    document.body
  );
};
