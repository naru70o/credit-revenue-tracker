import React from "react";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CustomersList from "@/components/customersList";

const page = async () => {
  return (
    <div className="text-gray-700 py-16 px-4">
      <div className="flex flex-col justify-center gap-12">
        <h1 className="font-bold text-2xl text-start w-1/2">
          Please add new Customer
        </h1>
        <div className="inline-block self-end">
          <Button className="bg-blue-500 hover:bg-blue-700">
            <Link href="/customers/add">add customer</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8 ">
        {/* customers List */}
        <div className="mt-4 w-full flex flex-col gap-4">
          <CustomersList />
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default page; // export default page;
