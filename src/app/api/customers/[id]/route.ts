import { connectiondb, Customer } from "@/lib/database/models";
import { revalidateTag } from "next/cache";
import { Params } from "next/dist/server/request/params";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectiondb();
    const { id } = await params;
    const customer = await Customer.findById(id);
    if (!customer) {
      notFound();
    }
    return NextResponse.json({
      customer,
      message: "Customer found",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error getting customer" },
      { status: 501 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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
    revalidateTag("customers");
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting customer" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerData = await request.json();
    if (!id) {
      return NextResponse.json(
        { message: "Customer ID is required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectiondb();
    const customer = await Customer.findByIdAndUpdate(id, customerData, {
      new: true,
    });

    revalidateTag("customers");
    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 501, message: "Could not Update user" });
  }
}
