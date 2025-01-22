import { connectiondb, Customer } from "@/lib/database/models";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectiondb();
    const customer = await Customer.findById(id);
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 400 }
      );
    }
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting customer" },
      { status: 500 }
    );
  }
}

// DELETE route
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await connectiondb();

    // Validate the ID (optional but recommended)
    if (!id) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 }
      );
    }

    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { message: "Error deleting customer" },
      { status: 500 }
    );
  }
}
