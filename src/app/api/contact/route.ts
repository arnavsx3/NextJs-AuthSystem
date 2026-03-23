import { NextResponse, NextRequest } from "next/server";
import { sendMail } from "@/src/utils/mailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    await sendMail(
      `${email}`,
      "admin@cloudauth.com",
      `CloudAuth Contact: ${name}`,
      `${message}`,
    );
    const response = NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
