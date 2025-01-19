import PeopleList from "@/components/peopleList";
import React from "react";

const page = async () => {
  //   const response = await axios.get("/api/customers");
  //   console.log(response);

  return (
    <div className=" text-black py-8 px-4 grid justify-center">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-2xl text-center">
          Please add new Customer
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="flex justify-between items-center w-full">
          <p>name</p>
          <p>phone</p>
        </div>
        <PeopleList />
      </div>
    </div>
  );
};

export default page; // export default page;
