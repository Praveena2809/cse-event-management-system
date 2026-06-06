// import mongoose from "mongoose";

// const feedbackSchema = new mongoose.Schema(
//   {
//     registration: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true, unique: true },
//     rating: { type: Number, min: 1, max: 5, required: true },
//     comment: { type: String },
//   },
//   { timestamps: true }
// );

// export const Feedback = mongoose.model("Feedback", feedbackSchema);

import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
      unique: true,
    },

    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subevent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subevent",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    organizationRating: {
      type: Number,
      min: 1,
      max: 5,
    },

    contentRating: {
      type: Number,
      min: 1,
      max: 5,
    },

    venueRating: {
      type: Number,
      min: 1,
      max: 5,
    },

    likedMost: {
      type: String,
      trim: true,
    },

    suggestions: {
      type: String,
      trim: true,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Feedback =
  mongoose.model(
    "Feedback",
    feedbackSchema
  );