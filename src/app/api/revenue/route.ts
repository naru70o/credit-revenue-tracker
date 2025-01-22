import { Revenue, connectiondb } from "@/lib/database/models";
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

    return NextResponse.json({
      message: "Revenue saved successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error saving revenue",
      status: 500,
    });
  }
}
