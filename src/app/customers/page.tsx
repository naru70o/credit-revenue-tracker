import CustomersList from "@/components/customersList";
import { AddCustomerButton } from "@/components/ui/AddCustomerButton";

const page = async () => {
  const response = await fetch("http://localhost:3000/api/customers", {
    next: { tags: ["customers"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  const customersData = await response.json();
  return (
    <>
      <div className="text-gray-700 py-16 px-4">
        <div className="flex flex-col justify-center">
          <div className="w-full rounded-xl bg-gradient-to-r from-[#160078] to-[#7226ff] mb-2 p-4 text-gray-300">
            <h1 className="font-bold text-2xl text-start w-[60%]">
              Please add new Customer
            </h1>
          </div>
          <div className="inline-block self-end">
            <AddCustomerButton />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          {/* customers List */}
          <div className="mt-4 w-full flex flex-col gap-4">
            <CustomersList customersData={customersData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default page; // export default page;
