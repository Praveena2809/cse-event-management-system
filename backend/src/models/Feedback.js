import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, unique: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);

