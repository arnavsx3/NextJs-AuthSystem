import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { userModel } from "@/src/models/userModel";
import { connectDB } from "@/src/db/dbConfig";
import { verifyToken } from "@/src/utils/verifyJwt";

connectDB();

interface JwtPayload {
  _id: string;
  username: string;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized access" },
        { status: 401 },
      );
    }
    const decoded = verifyToken(token) as JwtPayload;
    const { _id } = decoded;
    const user = await userModel.findById(_id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const response = NextResponse.json({ user }, { status: 200 });
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
