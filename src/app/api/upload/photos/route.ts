import mongoose from "mongoose";
import { photoModel } from "@/src/models/photoModel";
import { verifyToken } from "@/src/utils/verifyJwt";
import cloudinary from "@/src/utils/cloudinary";
import { NextResponse, NextRequest } from "next/server";
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

    const formData = await request.formData();
    const file = formData.get("photo") as File;
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 },
      );
    }

    // convert file into binary
    const arrayBuffer = await file.arrayBuffer();
    // convert it into nodejs buffer to work with cloudinary
    const buffer = Buffer.from(arrayBuffer);

    // callback based function, convert it to async/await
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "CloudAuth" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });
    const { secure_url } = uploadResult as { secure_url: string };

    const photo = await photoModel.create({
      user: _id,
      photo: secure_url,
    });

    const response = NextResponse.json(
      { message: "Photo uploaded successfully", photo },
      { status: 201 },
    );
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
