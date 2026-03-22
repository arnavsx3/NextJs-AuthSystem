import { verifyToken } from "@/src/utils/verifyJwt";
import { userModel } from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/db/dbConfig";
import { JwtPayload } from "../../users/me/route";

connectDB();

export async function POST(request: NextRequest) {
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

    const { photoUrl } = await request.json();
    if (!photoUrl) {
      return NextResponse.json(
        { message: "No photo URL provided" },
        { status: 400 },
      );
    }

    const user = await userModel
      .findByIdAndUpdate(_id, { profilePicture: photoUrl }, { new: true })
      .select("-password");

    const response = NextResponse.json(
      { message: "Profile photo updated", user },
      { status: 200 },
    );
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
