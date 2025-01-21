import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div className="text-black py-16 px-4">
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
        <div className="flex justify-between items-center w-full font-normal px-4">
          <p>name</p>
          <p>phone</p>
          <p>total dept</p>
        </div>
        {/* <PeopleList /> */}
        <div className="flex justify-between items-center bg-[#D9D9D9] rounded-lg w-full py-2 px-4 mt-8">
          <p>khadar</p>
          <p>khadar</p>
          <p>khadar</p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default page; // export default page;
