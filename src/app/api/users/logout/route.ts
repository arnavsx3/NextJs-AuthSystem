import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "User logged out successfully" },
      { status: 200 },
    );
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
