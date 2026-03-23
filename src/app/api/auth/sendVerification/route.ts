import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/src/utils/verifyJwt";
import { sendMail } from "@/src/utils/mailer";
import { JwtPayload } from "../../users/me/route";
import { connectDB } from "@/src/db/dbConfig";
import { userModel } from "@/src/models/userModel";
import crypto from "crypto";

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

    const user = await userModel.findById(_id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (user.isVerified) {
      return NextResponse.json(
        { message: "User is already verified" },
        { status: 400 },
      );
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);
    user.verifyToken = verificationToken;
    user.verifyTokenExpiry = verificationTokenExpiry;
    await user.save();

    const verifyUrl = `${process.env.DOMAIN}/verify?token=${verificationToken}`;

    await sendMail(
      "noreply@cloudAuth.com",
      user.email,
      "Verify your CloudAuth email",
      `Click the link to verify your email: ${verifyUrl}\n\nThis link expires in 1 hour.`,
    );

    const response = NextResponse.json(
      { message: "Verification email sent" },
      { status: 200 },
    );
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
