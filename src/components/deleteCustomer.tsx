"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteCustomer = ({ _id }: { _id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/customers/${_id}`);
      // delete this customer based on this id
      console.log(res.data);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="destructive" className="" onClick={handleDelete}>
      <Link href="#">Delete</Link>
    </Button>
  );
};
