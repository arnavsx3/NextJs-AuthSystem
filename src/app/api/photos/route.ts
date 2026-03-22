import { verifyToken } from "@/src/utils/verifyJwt";
import { JwtPayload } from "../users/me/route";
import { photoModel } from "@/src/models/photoModel";
import { connectDB } from "@/src/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";

connectDB();

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

    const photos = await photoModel.find({ user: _id });
    const response = NextResponse.json(
      { message: "User photos fetched successfully", photos },
      { status: 200 },
    );
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
