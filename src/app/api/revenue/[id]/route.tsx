import { Revenue, connectiondb } from "@/lib/database/models";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate the ID (optional but recommended)
    if (!id) {
      return NextResponse.json(
        { message: "Revenue ID is required" },
        { status: 400 }
      );
    }

    await connectiondb();
    const revenue = await Revenue.findByIdAndDelete(id);

    if (!revenue) {
      return NextResponse.json(
        { message: "Revenue not found" },
        { status: 404 }
      );
    }

    console.log("This revenue has been deleted", revenue);

    revalidateTag("revenue");
    return NextResponse.json(
      { message: "Revenue deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updatedRevenue = await req.json();

    await connectiondb();
    const revenue = await Revenue.findByIdAndUpdate(id, updatedRevenue, {
      new: true,
    });

    if (!revenue) {
      return NextResponse.json(
        { message: "Revenue not found" },
        { status: 404 }
      );
    }

    console.log("This revenue has been updated", revenue);

    revalidateTag("revenue");
    return NextResponse.json(revenue, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Couldn't update revenue" },
      { status: 501 }
    );
  }
}