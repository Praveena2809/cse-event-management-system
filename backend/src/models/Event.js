// import mongoose from "mongoose";

// const eventSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     posterUrl: { type: String },
//     description: { type: String, required: true },
//     date: { type: Date, required: true },
//     budgetEstimate: { type: Number, default: 0 },
//     numberOfSubevents: { type: Number, default: 0 },
//     miscNotesForHod: { type: String },

//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // coordinator

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//       index: true,
//     },
//     rejectionReason: { type: String },
//     approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // HOD
//     approvedAt: { type: Date },
//   },
//   { timestamps: true }
// );

// export const Event = mongoose.model("Event", eventSchema);

// import mongoose from "mongoose";

// const eventSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     posterUrl: {
//       type: String,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     // NEW: workshop or competitive
//     eventType: {
//       type: String,
//       enum: ["competitive", "workshop"],
//       default: "workshop",
//     },

//     // NEW: winner of event
//     winner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },

//     // NEW: runner of event
//     runner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },

//     date: {
//       type: Date,
//       required: true,
//     },

//     budgetEstimate: {
//       type: Number,
//       default: 0,
//     },

//     numberOfSubevents: {
//       type: Number,
//       default: 0,
//     },

//     miscNotesForHod: {
//       type: String,
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     }, // coordinator

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//       index: true,
//     },

//     rejectionReason: {
//       type: String,
//     },

//     approvedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     }, // HOD

//     approvedAt: {
//       type: Date,
//     },
//   },
//   { timestamps: true }
// );

// export const Event = mongoose.model(
//   "Event",
//   eventSchema
// );
// 
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    posterUrl: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    // workshop or competitive
    eventType: {
      type: String,
      enum: ["competitive", "workshop"],
      default: "workshop",
    },

    // winner
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // runner
    runner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    date: {
      type: Date,
      required: true,
    },

    // NEW: time field for rescheduling
    time: {
      type: String,
      default: "",
    },

    // NEW: venue field for rescheduling + emails
    venue: {
      type: String,
      default: "",
    },

    // attendance control
    attendanceEnabled: {
      type: Boolean,
      default: false,
    },

    // attendance opening time
    attendanceStart: {
      type: Date,
      default: null,
    },

    // attendance closing time
    attendanceEnd: {
      type: Date,
      default: null,
    },

    // who opened attendance
    attendanceOpenedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // when attendance was opened
    attendanceOpenedAt: {
      type: Date,
      default: null,
    },

    budgetEstimate: {
      type: Number,
      default: 0,
    },

    numberOfSubevents: {
      type: Number,
      default: 0,
    },

    miscNotesForHod: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // coordinator

    // UPDATED STATUS
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "cancel_requested",
        "cancelled",
        "reschedule_requested",
      ],
      default: "pending",
      index: true,
    },

    rejectionReason: {
      type: String,
    },

    // NEW: cancellation reason
    cancelReason: {
      type: String,
      default: "",
    },

    // NEW: reschedule request data
    rescheduleRequest: {
      requested: {
        type: Boolean,
        default: false,
      },

      oldDate: {
        type: Date,
        default: null,
      },

      newDate: {
        type: Date,
        default: null,
      },

      oldVenue: {
        type: String,
        default: "",
      },

      newVenue: {
        type: String,
        default: "",
      },

      oldTime: {
        type: String,
        default: "",
      },

      newTime: {
        type: String,
        default: "",
      },

      reason: {
        type: String,
        default: "",
      },

      requestedAt: {
        type: Date,
        default: null,
      },
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model(
  "Event",
  eventSchema
);