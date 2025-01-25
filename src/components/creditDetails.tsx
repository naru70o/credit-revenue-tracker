import React from "react";
import { Button } from "./ui/button";

export const CreditDetails = () => {
  return (
    <div className="flex flex-col items-center gap-2 mt-8">
      <div className="flex justify-between w-full items-center">
        <div>customer</div>
        <div>kadar</div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div>Amount</div>
        <div>10,000</div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div>product</div>
        <div>cananis</div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div>tooktime</div>
        <div>12/2/2222</div>
      </div>
      <div className="flex justify-between w-full items-center gap-3">
        <Button type="button" variant="outline" className="w-full">
          Edit
        </Button>
        <Button type="button" variant="destructive" className="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
};
