import mongoose from "mongoose";

const coordinatorApplicationSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    name: { type: String, required: true },
    registerNumber: { type: String, required: true },
    year: { type: String, required: true },
    department: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    cgpa: { type: Number, required: true },
    achievements: { type: String, required: true },
    visionForEvent: { type: String, required: true },

    status: { type: String, enum: ["pending_review", "approved", "rejected"], default: "pending_review" },
    rejectionReason: { type: String },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export const CoordinatorApplication = mongoose.model("CoordinatorApplication", coordinatorApplicationSchema);

