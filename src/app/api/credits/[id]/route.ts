import { connectiondb, Credit } from "@/lib/database/models";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("i'm checking if this function runs id");
    await connectiondb();
    const credit = await Credit.findById(id);

    if (!credit) {
      return NextResponse.json(
        { message: "Credit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(credit);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// delete
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("delete credit id", id);
    await connectiondb();

    if (!id) {
      return NextResponse.json({ status: 400, message: "Invalid ID" });
    }

    await Credit.findByIdAndDelete(id);
    revalidateTag("credit");
    return NextResponse.json({
      status: 200,
      message: "Credit deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

// update the paid
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { isPaid } = await request.json();
    await connectiondb();
    const credit = await Credit.findByIdAndUpdate(
      id,
      { isPaid },
      { new: true }
    );
    return NextResponse.json(credit);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

// update whole document
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const credit = await request.json();
    await connectiondb();
    const updatedCredit = await Credit.findByIdAndUpdate(id, credit, {
      new: true,
    });
    return NextResponse.json(updatedCredit);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
