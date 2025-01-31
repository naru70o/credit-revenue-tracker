"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="grid grid-cols-1 h-[80vh] justify-center content-center px-4">
      <h1 className="font-bold text-2xl mb-4 text-center">
        Oops! Something went wrong.
      </h1>
      <p className="text-center mb-8">{error.message}</p>
      <Button variant="destructive" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
