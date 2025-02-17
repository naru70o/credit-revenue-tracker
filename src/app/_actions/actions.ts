"use server";

import { PUBLIC_URL } from "@/lib/utils";
import axios from "axios";
import { revalidatePath, revalidateTag } from "next/cache";
import { connectiondb, Credit, Customer } from "@/lib/database/models";
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
    return { success: "Customer updated successfully", status: true };
  } catch (error) {
    console.log(error);

    // Return an error message
    return { message: "Error updating customer", status: false };
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
  } catch (error) {
    console.error("Failed to create customer:", error);
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
    return { message: "Error adding credit", status: false };
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
    return { message: "Error updating credit", status: false };
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
    return { success: true, message: "Credit deleted successfully" };
  } catch (error) {
    console.error(error);
    // Return an error message
    return { success: false, message: "Failed to delete credit" };
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

    return { success: true, message: "Credit updated successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to piad the credit" };
  }
}

// update credit
interface UpdatedCreditData {
  amount: number;
  product: string;
  personWhotaken: string;
  tookTime: string;
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

//////////////////////////////////
// Revenues

// Add Revenue


// Delete
export async function deleteRevenue(id: string) {
  try {
    await axios.delete(`${PUBLIC_URL}/api/revenue/${id}`);

    revalidateTag("revenue");
    return { message: "Revenue deleted successfully" };
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

export async function updateRevenue(id: string, data: Revenue) {
  try {
    await axios.put(`${PUBLIC_URL}/api/revenue/${id}`, data);
    revalidateTag("revenue");
    return { success: true, message: "Revenue updated successfully" };
  } catch (error) {
    console.log(error);

    return { success: false, message: "Failed to update revenue data" };
  }
}

