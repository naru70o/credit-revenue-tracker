import { Credit, connectiondb } from "@/lib/database/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectiondb();
    const credits = await Credit.find();
    return NextResponse.json({
      message: "heres the credits",
      status: 200,
      credits: credits,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching credits" });
  }
}

export async function POST(request: Request) {
  try {
    await connectiondb();
    const data = await request.json();
    console.log(data);
    const credit = new Credit(data);
    await credit.save();
    return NextResponse.json({
      message: "Credit added successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Error adding credit",
      error,
      status: 401,
    });
  }
}
