import { userModel } from "../models/userModel";
import { zodSignupSchema } from "../validators/zodAuthSchema";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../db/dbConfig";
import { error } from "console";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const result = zodSignupSchema.safeParse(reqBody);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
