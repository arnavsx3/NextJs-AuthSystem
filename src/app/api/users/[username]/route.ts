import { NextResponse, NextRequest } from "next/server";
import { userModel } from "@/src/models/userModel";
import { connectDB } from "@/src/db/dbConfig";

connectDB();

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { username } = await params;
    const user = await userModel.findOne({ username }).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "User could not be found" },
        { status: 404 },
      );
    }
    const response = NextResponse.json(
      { message: "User fetched successfully", user },
      { status: 200 },
    );
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
