import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
  
    sessionNumber: {
      type: Number,
      required: true,
      default: 1,
    },
  
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    markedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
  );
  attendanceSchema.index(
    {
      registration: 1,
      sessionNumber: 1,
    },
    {
      unique: true,
    }
  );

export const Attendance = mongoose.model("Attendance", attendanceSchema);

