import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, unique: true },
    certificateType: {
      type: String,
      enum: ["attendee", "winner", "runner"],
      default: "attendee",
    },
    position: { type: String }, // winner/runner position text
    issuedAt: { type: Date, default: Date.now },
    pdfUrl: { type: String }, // could be Cloudinary URL or app URL
    verificationToken: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);

