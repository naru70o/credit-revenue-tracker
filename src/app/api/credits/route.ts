import { Credit, connectiondb } from "@/lib/database/models";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectiondb();
    const credits = await Credit.find().sort({
      tookTime: -1,
    });
    revalidateTag("credits");
    return NextResponse.json({
      message: "heres the credits",
      status: 200,
      credits,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Error fetching credits" });
  }
}

export async function POST(request: Request) {
  try {
    await connectiondb();
    const data = await request.json();
    console.log("Credit data was added and here is it --->", data);

    // Create a new credit document with explicit fields
    const credit = new Credit({
      customerId: data.customerId,
      amount: data.amount,
      product: data.product,
      personWhotaken: data.personWhotaken,
      tookTime: data.tookTime || new Date(),
    });

    await credit.save();
    revalidateTag("credit");
    return NextResponse.json({
      message: "Credit added successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Error adding credit",
      status: 401,
    });
  }
}
