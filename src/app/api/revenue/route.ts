import { Revenue, connectiondb } from "@/lib/database/models";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectiondb();
    const { amount, date } = await req.json();
    const revenue = new Revenue({
      amount,
      date,
    });
    await revenue.save();
    console.log("Revenue saved successfully");
    revalidateTag("revenue");
    return NextResponse.json({
      message: "Revenue saved successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Error saving revenue",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectiondb();
    const revenues = await Revenue.find().sort({ date: -1 });
    return NextResponse.json({
      revenues,
      status: 200,
      message: "Revenues retrieved successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Error getting revenues",
      status: 500,
    });
  }
}
