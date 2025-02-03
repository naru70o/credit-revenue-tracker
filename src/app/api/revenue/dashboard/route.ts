import { Revenue, connectiondb } from "@/lib/database/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectiondb();
    const revenues = await Revenue.find().sort({ date: 1 });
    return NextResponse.json({
      revenues,
      status: 200,
      message: "Revenues retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error getting revenues",
      status: 500,
    });
  }
}
