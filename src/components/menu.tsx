"use client";

import Link from "next/link";

import {
  ArrowUpFromLine,
  ChartNoAxesColumnIncreasing,
  CircleUser,
  HomeIcon,
  UserRoundPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Menu = () => {
  const currentPath = usePathname();

  return (
    <div className="w-full text-gray-700 fixed bottom-0 left-0 py-7 px-4 bg-slate-200 rounded-t-3xl text-end">
      <div className="flex justify-between items-center">
        <Link
          href="/dashboard/revenue"
          className={`${
            currentPath === "/dashboard/revenue" ? "text-blue-500" : ""
          }`}
        >
          <HomeIcon />
        </Link>
        <Link
          href="/credits"
          className={`${currentPath === "/credits" ? "text-blue-500" : ""}`}
        >
          <ArrowUpFromLine />
        </Link>
        <Link
          href="/customers"
          className={`${currentPath === "/customers" ? "text-blue-500" : ""}`}
        >
          <UserRoundPlus />
        </Link>
        <Link
          href="/revenue"
          className={`${currentPath === "/revenue" ? "text-blue-500" : ""}`}
        >
          <ChartNoAxesColumnIncreasing />
        </Link>
        <Link
          href="/user"
          className={`${currentPath === "/user" ? "text-blue-500" : ""}`}
        >
          <CircleUser />
        </Link>
      </div>
    </div>
  );
};

export default Menu;