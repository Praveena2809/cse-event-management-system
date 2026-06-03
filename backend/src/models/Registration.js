import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    participant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subevent: { type: mongoose.Schema.Types.ObjectId, ref: "Subevent", required: true, index: true },

    status: {
      type: String,
      enum: ["registered", "payment_pending", "paid", "attended", "cancelled"],
      default: "registered",
      index: true,
    },

    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },

    qrToken: { type: String, required: true, unique: true, index: true },
    qrPngDataUrl: { type: String }, // convenient for quick rendering; optional

    attendedAt: { type: Date },
    checkedInBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // coordinator

    certificate: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate" },
  },
  { timestamps: true }
);

registrationSchema.index({ participant: 1, subevent: 1 }, { unique: true });

export const Registration = mongoose.model("Registration", registrationSchema);

