import { userModel } from "@/src/models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { zodLoginSchema } from "@/src/validators/zodAuthSchema";
import { connectDB } from "@/src/db/dbConfig";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const result = zodLoginSchema.safeParse(reqBody);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }
    const { username, password } = result.data;
    const user = await userModel.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 },
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 400 },
      );
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" },
    );
    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
