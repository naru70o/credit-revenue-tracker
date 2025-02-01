"use server";

import axios from "axios";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Customers

export async function getCustomers() {
  try {
    // Using axios to make the GET request
    const response = await axios.get("http://localhost:3000/api/customers");

    // Return the data from the response
    return response.data;
  } catch (error) {
    // Return an error message
    return { error: "Error fetching customers" };
  }
}

// Update Customer 

interface Customer {
  name: string;
  phoneNumber: string;
}

export async function updateCustomerInfo(id: string, data: Customer) {
  try{
    // Using axios to make the PUT request
    await axios.put(`http://localhost:3000/api/customers/${id}`, data);
    revalidateTag("customer");
    // Return a success message
    revalidateTag("customers")
    return { success: "Customer updated successfully" };
  }
  catch(error) {
    // Return an error message
    return { error: "Error updating customer" };
  }
}

// Delete credit
export async function deleteCredit(id: string) {
  try {
    // Using axios to make the DELETE request
    await axios.delete(`http://localhost:3000/api/credits/${id}`);
    revalidateTag("credit");
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
    // Using axios to make the PATCH request with the update payload
    await axios.patch(`http://localhost:3000/api/credits/${id}`, {
      isPaid: true,
    });

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

export async function updateCredit(
  creditId: string,
  updatedData: UpdatedCreditData
) {
  try {
    // Send a PUT request using Axios
    const response = await axios.put(
      `http://localhost:3000/api/credits/${creditId}`,
      updatedData
    );

    // Axios automatically parses the response data
    return response.data;
  } catch (error) {
    console.error("Error updating credit:", error);

    // Something happened in setting up the request
    throw new Error("Error setting up the request.");
  }
}

// HANDLE DELETE Customer
export const DeleteCustomer = async (_id: string) => {
  try {
    // delete this customer based on this id
    await axios.delete(`http://localhost:3000/api/customers/${_id}`);
    revalidateTag("customers");

    return { message: "Customer deleted successfully" };
  } catch (error) {
    return { message: "Customer not found", status: 404 };
  }
};

//////////////////////////////////
// Revenues

// export async function revenueFetcher() {
//   try {
//     const response = await axios.get("http://localhost:3000/api/revenue");
//     const data = response.data;
//     console.log("here is your revenue data", data);
//     return data;
//   } catch (error) {
//     return {message:"Failed to Delete revenue data",status:404};
//   }
// }

// Delete 
export async function deleteRevenue(_id: string) {
  try {
    await axios.delete(`http://localhost:3000/api/revenue/${_id}`);
    
    revalidateTag("revenue");
    return {message: "Revenue deleted successfully"};
  } catch (error) {
   return {message:"Failed to Delete revenue data",status:404}
  }
}