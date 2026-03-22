import mongoose, { Schema } from "mongoose";

const photoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    photo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const photoModel =
  mongoose.models.photos || mongoose.model("photos", photoSchema);
