import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddPerson() {
  return (
    <div className="bg-blue-300 text-black py-8 px-4 h-screen grid justify-center">
      <div className="flex flex-col justify-center ">
        <h1 className="font-bold text-2xl text-center">
          Please add new Customer
        </h1>
        <form className="flex flex-col items-center justify-center mt-8">
          {/* name */}
          <div className="flex flex-col justify-center w-[80%]">
            <label>name</label>
            <Input type="text" className="self-center " />
          </div>
          {/* phone */}
          <div className="flex flex-col justify-center w-[80%]">
            <label>number</label>
            <Input type="number" className="self-center" />
          </div>
        </form>
        <Button className="mt-4 inline w-32 self-center">Add customer</Button>
      </div>
    </div>
  );
}
