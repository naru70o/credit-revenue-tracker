import { connectiondb, Customer } from "@/lib/database/models";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectiondb();
    const customer = await Customer.findById(params.id);
    if (!customer) {
      notFound();
    }
    return NextResponse.json({
      customer,
      message: "Customer found",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting customer" },
      { status: 501 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate the ID (optional but recommended)
    if (!id) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectiondb();

    // Delete the customer
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    // Return a 204 No Content response
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting customer:", error.message || error);
    return NextResponse.json(
      { message: "Error deleting customer" },
      { status: 500 }
    );
  }
}
