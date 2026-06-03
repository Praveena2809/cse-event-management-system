import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, unique: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    markedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);

