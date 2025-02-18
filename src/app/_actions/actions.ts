"use server";

import { PUBLIC_URL } from "@/lib/utils";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";
import { connectiondb, Credit, Customer, Revenue } from "@/lib/database/models";
import { NextResponse } from "next/server";

// Customers

export async function getCustomers() {
  try {
    // Using axios to make the GET request
    const response = await axios.get(`${PUBLIC_URL}/api/customers`);

    // Return the data from the response
    return response.data;
  } catch (error) {
    console.log(error);

    // Return an error message
    return { error: "Error fetching customers" };
  }
}

// HANDLE DELETE Customer
export const DeleteCustomer = async (id: string) => {
  try {
    await connectiondb();

    if (!id) {
      return { status: false, message: "Customer not found" };
    }

    await Customer.findByIdAndDelete(id);
    revalidatePath("/customers");
    return { status: true, message: "Customer deleted successfully" };
  } catch (error) {
    console.log(error);
    return { message: "Customer not found", status: false };
  }
};

// Update Customer

interface Customer {
  name: string | undefined;
  phoneNumber: string | undefined;
}

export async function updateCustomerInfo(
  formData: FormData,
  _id: string | undefined
) {
  try {
    const updateData = {
      name: formData.get("personName"),
      phoneNumber: formData.get("phoneNumber"),
    };

    await connectiondb();
    await Customer.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    // Return a success message
    revalidatePath("/customers");
    return { message: "Customer updated successfully", status: true };
  } catch (error) {
    console.log(error);

    // Return an error message
    return { message: "Failed updating customer", status: false };
  }
}

// add new customer
export async function createCustomer(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      phoneNumber: formData.get("phoneNumber") as string,
    };

    // Replace with your actual DB call

    await connectiondb();
    await Customer.create(rawData);

    revalidateTag("customers");
    return { message: "Customer added successfully", status: true };
  } catch (error) {
    console.error("Failed to create customer:", error);
    return { message: "Failed adding customer", status: false };
  }
}

///////////////// Credits

//  New credit
export async function createCredit(formData: FormData, customerId: string) {
  try {
    const rawData = {
      customerId,
      personWhotaken: formData.get("personWhotaken") as string,
      product: formData.get("product") as string,
      amount: formData.get("amount") as string,
      tookTime: formData.get("tookTime") as string,
    };
    await connectiondb();
    await Credit.create(rawData);
    revalidateTag("credits");
    return {
      message: "Credit added successfully",
      status: true,
    };
  } catch (error) {
    return { message: "Failed adding credit", status: false };
  }
}

// update credit
export async function updateCredit(formData: FormData, id: string) {
  try {
    const rawData = {
      amount: formData.get("amount") as string,
      product: formData.get("product") as string,
      personWhotaken: formData.get("personWhotaken") as string,
      tookTime: formData.get("tookTime") as string,
    };
    await connectiondb();
    await Credit.findByIdAndUpdate(id, rawData, {
      new: true,
    });
    revalidateTag("credits");
    return {
      message: "Credit updated successfully",
      status: true,
    };
  } catch (error) {
    return { message: "Failed updating credit", status: false };
  }
}

// Delete credit
export async function deleteCredit(id: string) {
  try {
    if (!id) {
      return { success: false, message: "Credit id is required" };
    }

    await connectiondb();
    await Credit.findByIdAndDelete(id);
    revalidateTag("credits");

    // Return a success message
    return { status: true, message: "Credit deleted successfully" };
  } catch (error) {
    console.error(error);
    // Return an error message
    return { status: false, message: "Failed to delete credit" };
  }
}

// Update credit set to paid
export async function setCreditToPaid(id: string) {
  try {
    await connectiondb();
    await Credit.findByIdAndUpdate(
      id,
      { isPaid: true },
      {
        new: true,
      }
    );

    revalidateTag("credits");

    return { status: true, message: "Credit paided successfully" };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Failed to paid the credit" };
  }
}

// update credit
interface UpdatedCreditData {
  amount: number;
  product: string;
  personWhotaken: string;
  tookTime: string;
}


//////////////////////////////////
// Revenues

// Add Revenue

export async function addRevenue(formData: FormData) {
  try {
    await connectiondb();
    const rowData = {
      amount: Number(formData.get("amount")),
      date: formData.get("date") as string,
    };

    await Revenue.create(rowData);
    revalidateTag("revenues");
    return { message: "Revenue added successfully" ,status: true };
  } catch (error) {
    console.error(error);
    return { status: false, message: "Failed to add the revenue" };
  }
}

// Delete
export async function deleteRevenue(id: string) {
  try {
    if (!id) {
      return { message: "Revenue not found", status: false };
    }
    await connectiondb();
    await Revenue.findByIdAndDelete(id);

    revalidateTag("revenues");
    return { message: "Revenue deleted successfully", status: true };
  } catch (error) {
    console.log(error);

    return { message: "Failed to Delete revenue data", status: 404 };
  }
}

// Update
interface Revenue {
  amount: number;
  date: string;
}

export async function updateRevenue(fromDate: FormData, id: string) {
  try {
    await connectiondb();
    const rowData = {
      amount: Number(fromDate.get("amount")),
      date: fromDate.get("date") as string,
    };

    await Revenue.findByIdAndUpdate(id, rowData, {
      new: true,
    });
    revalidateTag("revenues");
    return { status: true, message: "Revenue updated successfully" };
  } catch (error) {
    console.log(error);

    return { status: false, message: "Failed to update Revenue" };
  }
}

