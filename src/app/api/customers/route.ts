import { connectiondb, Customer } from "@/lib/database/models";
import { NextResponse } from "next/server";
// post using mongoose
export async function POST(request: Request) {
  try {
    await connectiondb();
    const { name, phoneNumber } = await request.json();
    const newUser = new Customer({ name, phoneNumber });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

// delete using mongoose
export async function DELETE(request: Request) {
  try {
    await connectiondb();
    const { id } = await request.json();
    const deletedUser = await Customer.findByIdAndDelete(id);
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

// get all users
export async function GET() {
  try {
    await connectiondb();
    const users = await Customer.find();
    console.log(users);
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
