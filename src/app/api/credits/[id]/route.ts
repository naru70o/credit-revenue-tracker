import { connectiondb, Credit } from "@/lib/database/models";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await connectiondb();
    const credit = await Credit.findById(id);
    return NextResponse.json(credit);
  } catch (error) {
    NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

// delete
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    console.log("delete credit id", id);
    await connectiondb();

    if (!id) {
      return NextResponse.json({ status: 400, message: "Invalid ID" });
    }

    const credit = await Credit.findByIdAndDelete(id);
    return NextResponse.json(credit);
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

// update the paid
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { isPaid } = await request.json();
    await connectiondb();
    const credit = await Credit.findByIdAndUpdate(
      id,
      { isPaid },
      { new: true }
    );
    return NextResponse.json(credit);
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

// update whole document
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const credit = await request.json();
    await connectiondb();
    const updatedCredit = await Credit.findByIdAndUpdate(id, credit, {
      new: true,
    });
    return NextResponse.json(updatedCredit);
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
