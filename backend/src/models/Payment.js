import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, index: true },
    participant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    status: { type: String, enum: ["created", "paid", "failed"], default: "created", index: true },

    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);

