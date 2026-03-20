import { userModel } from "@/src/models/userModel";
import { zodSignupSchema } from "@/src/validators/zodAuthSchema";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/db/dbConfig";
import { error } from "console";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const result = zodSignupSchema.safeParse(reqBody);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }
    const { username, email, password } = result.data;
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
    const token = jwt.sign(
      { _id: newUser._id, username: newUser.username },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" },
    );
    const response = NextResponse.json(
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
    response.cookies.set("token", token, { httpOnly: true, secure: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
