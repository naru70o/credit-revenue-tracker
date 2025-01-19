import { connectiondb, User } from "@/lib/models/debt";
import { NextResponse } from "next/server";
// post using mongoose
export async function POST(request: Request) {
  try {
    await connectiondb();
    const { name, phone } = await request.json();
    const newUser = new User({ name, phone });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

// get all users
export async function GET() {
  try {
    await connectiondb();
    const users = await User.find();
    console.log(users);
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
