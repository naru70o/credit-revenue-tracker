"use server";

import axios from "axios";

// Delete credit
export async function deleteCredit(id: string) {
  try {
    // Using axios to make the DELETE request
    await axios.delete(`http://localhost:3000/api/credits/${id}`);

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
    const response = await axios.patch(
      `http://localhost:3000/api/credits/${id}`,
      { isPaid: true }
    );

    // Check if the request was successful
    if (response.status === 200) {
      return { success: true, message: "Credit updated successfully" };
    } else {
      // Handle unexpected status codes
      return { success: false, message: "Failed to update credit" };
    }
  } catch (error) {
    console.error(error);

    // Return a meaningful error message
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "An error occurred while updating the credit",
      };
    } else {
      return { success: false, message: "An unexpected error occurred" };
    }
  }
}
