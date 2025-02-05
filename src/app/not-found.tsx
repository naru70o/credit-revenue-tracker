"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <div className="grid grid-cols-1 h-[80vh] justify-center content-center px-4 align-center">
      <h1 className="font-bold text-2xl mb-4 text-center">
        Oops! This page Couldnt be found.
      </h1>
      <div className="flex justify-center">
        <Link href="/dashboard/revenue">
          <Button variant="destructive">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
