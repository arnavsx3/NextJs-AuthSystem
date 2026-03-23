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
      process.env.MAILTRAP_USER!,
      `CloudAuth Contact: ${name}`,
      `From ${email} \n\n${message}`,
    );
    const response = NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
