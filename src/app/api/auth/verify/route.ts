import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/src/db/dbConfig";
import { userModel } from "@/src/models/userModel";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 },
      );
    }
    const user = await userModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 },
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    const response = NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 },
    );
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
