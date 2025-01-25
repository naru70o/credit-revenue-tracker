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
