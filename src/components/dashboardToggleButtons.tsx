"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function DashboardToggleButtons() {
  const pathName = usePathname();

  return (
    <div className="items-center gap-2 mb-6 bg-gray-300 rounded-xl mt-8 h-fit">
      <Link href="/dashboard/revenue">
        <button
          className={`px-4 py-2 ${
            pathName === "/dashboard/revenue" ? "bg-purple-500" : ""
          } text-white rounded-xl text-sm font-medium`}
        >
          Revenue
        </button>
      </Link>
      <Link href="/dashboard/credits">
        <button
          className={`px-4 py-2 ${
            pathName === "/dashboard/credits" ? "bg-purple-500" : ""
          } text-white rounded-xl text-sm font-medium`}
        >
          Credits
        </button>
      </Link>
    </div>
  );
}
