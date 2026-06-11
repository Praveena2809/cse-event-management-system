// // 
// import crypto from "crypto";
// import { validationResult } from "express-validator";

// import { asyncHandler } from "../utils/asyncHandler.js";
// import { signToken } from "../utils/token.js";
// import { sendEmail } from "../utils/email.js";

// const buildClientUrl = (path = "/") => {
//   const base =
//     process.env.CLIENT_URL ||
//     "http://localhost:5173";

//   return `${base}${path}`;
// };

// const okUser = (user) => ({
//   id: user._id,
//   name: user.name,
//   email: user.email,
//   role: user.role,
//   phone: user.phone,
//   registerNumber: user.registerNumber,
//   year: user.year,
//   department: user.department,
//   collegeName: user.collegeName,
//   isEmailVerified: user.isEmailVerified,
// });

// export const registerParticipant =
//   asyncHandler(async (req, res) => {
//     const errors =
//       validationResult(req);

//     if (!errors.isEmpty()) {
//       res.status(400);
//       throw new Error(
//         errors.array()[0].msg
//       );
//     }

//     const {
//       name,
//       email,
//       password,
//       registerNumber,
//       year,
//       department,
//       phone,
//       collegeName,
//     } = req.body;

//     const exists =
//       await User.findOne({ email });

//     if (exists) {
//       res.status(400);
//       throw new Error(
//         "Email already registered"
//       );
//     }

//     const emailVerificationToken =
//       crypto
//         .randomBytes(20)
//         .toString("hex");

//     const emailVerificationExpires =
//       new Date(
//         Date.now() +
//           24 * 60 * 60 * 1000
//       );

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role: "participant",
//       registerNumber,
//       year,
//       department,
//       phone,
//       collegeName,
//       emailVerificationToken,
//       emailVerificationExpires,
//     });

//     try {
//       const verifyUrl =
//         buildClientUrl(
//           `/verify-email?token=${emailVerificationToken}`
//         );

//       await sendEmail({
//         to: user.email,
//         subject:
//           "Verify your email - CSE Event System",
//         html: `
//           <p>Hello ${user.name},</p>
//           <p>Please verify your email:</p>
//           <p>
//             <a href="${verifyUrl}">
//               Verify Email
//             </a>
//           </p>
//         `,
//       });
//     } catch (e) {
//       console.log(
//         "Verification email failed:",
//         e.message
//       );
//     }

//     const token = signToken({
//       id: user._id,
//       role: user.role,
//     });

//     res.status(201).json({
//       user: okUser(user),
//       token,
//     });
//   });

// export const login =
//   asyncHandler(async (req, res) => {
//     const {
//       email,
//       password,
//       role,
//     } = req.body;

//     if (!email || !password) {
//       res.status(400);
//       throw new Error(
//         "Email and password are required"
//       );
//     }

//     const user =
//       await User.findOne({
//         email,
//       }).select("+password");

//     if (!user) {
//       res.status(401);
//       throw new Error(
//         "Invalid credentials"
//       );
//     }

//     const match =
//       await user.matchPassword(
//         password
//       );

//     if (!match) {
//       res.status(401);
//       throw new Error(
//         "Invalid credentials"
//       );
//     }

//     // Role-based login check
//     if (
//       role &&
//       user.role.toLowerCase() !==
//         role.toLowerCase()
//     ) {
//       res.status(403);
//       throw new Error(
//         `This login page is only for ${role}s`
//       );
//     }

//     const token = signToken({
//       id: user._id,
//       role: user.role,
//     });

//     res.json({
//       user: okUser(user),
//       token,
//     });
//   });

// export const me =
//   asyncHandler(async (req, res) => {
//     res.json({
//       user: okUser(req.user),
//     });
//   });

// export const updateMe =
//   asyncHandler(async (req, res) => {
//     const user =
//       await User.findById(
//         req.user._id
//       ).select("-password");

//     if (!user) {
//       res.status(404);
//       throw new Error(
//         "User not found"
//       );
//     }

//     const allowed = [
//       "name",
//       "phone",
//       "year",
//       "department",
//       "collegeName",
//     ];

//     for (const key of allowed) {
//       if (
//         req.body[key] !== undefined
//       ) {
//         user[key] = req.body[key];
//       }
//     }

//     await user.save();

//     res.json({
//       user: okUser(user),
//     });
//   });

// export const resendVerification =
//   asyncHandler(async (req, res) => {
//     const user =
//       await User.findById(
//         req.user._id
//       );

//     if (!user) {
//       res.status(404);
//       throw new Error(
//         "User not found"
//       );
//     }

//     if (user.isEmailVerified) {
//       return res.json({
//         message:
//           "Already verified",
//       });
//     }

//     user.emailVerificationToken =
//       crypto
//         .randomBytes(20)
//         .toString("hex");

//     user.emailVerificationExpires =
//       new Date(
//         Date.now() +
//           24 * 60 * 60 * 1000
//       );

//     await user.save();

//     const verifyUrl =
//       buildClientUrl(
//         `/verify-email?token=${user.emailVerificationToken}`
//       );

//     await sendEmail({
//       to: user.email,
//       subject:
//         "Verify your email - CSE Event System",
//       html: `
//         <p>Hello ${user.name},</p>
//         <p>Please verify your email:</p>
//         <p>
//           <a href="${verifyUrl}">
//             Verify Email
//           </a>
//         </p>
//       `,
//     });

//     res.json({
//       message:
//         "Verification email sent",
//     });
//   });

// export const verifyEmail =
//   asyncHandler(async (req, res) => {
//     const { token } =
//       req.query;

//     if (!token) {
//       res.status(400);
//       throw new Error(
//         "Token missing"
//       );
//     }

//     const user =
//       await User.findOne({
//         emailVerificationToken:
//           token,
//         emailVerificationExpires:
//           { $gt: new Date() },
//       });

//     if (!user) {
//       res.status(400);
//       throw new Error(
//         "Invalid/expired verification token"
//       );
//     }

//     user.isEmailVerified =
//       true;
//     user.emailVerificationToken =
//       undefined;
//     user.emailVerificationExpires =
//       undefined;

//     await user.save();

//     res.json({
//       message:
//         "Email verified successfully",
//     });
//   });

// export const forgotPassword =
//   asyncHandler(async (req, res) => {
//     const { email } =
//       req.body;

//     if (!email) {
//       res.status(400);
//       throw new Error(
//         "Email required"
//       );
//     }

//     const user =
//       await User.findOne({
//         email,
//       });

//     if (!user) {
//       return res.json({
//         message:
//           "If that email exists, we sent a reset link",
//       });
//     }

//     const resetToken =
//       crypto
//         .randomBytes(20)
//         .toString("hex");

//     user.resetPasswordToken =
//       crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     user.resetPasswordExpires =
//       new Date(
//         Date.now() +
//           30 * 60 * 1000
//       );

//     await user.save();

//     const resetUrl =
//       buildClientUrl(
//         `/reset-password?token=${resetToken}&email=${encodeURIComponent(
//           email
//         )}`
//       );

//     await sendEmail({
//       to: user.email,
//       subject:
//         "Reset password - CSE Event System",
//       html: `
//         <p>Reset your password:</p>
//         <p>
//           <a href="${resetUrl}">
//             Reset Password
//           </a>
//         </p>
//       `,
//     });

//     res.json({
//       message:
//         "Reset link sent",
//     });
//   });

// export const resetPassword =
//   asyncHandler(async (req, res) => {
//     const {
//       token,
//       email,
//       password,
//     } = req.body;

//     if (
//       !token ||
//       !email ||
//       !password
//     ) {
//       res.status(400);
//       throw new Error(
//         "token, email and new password are required"
//       );
//     }

//     const hashed =
//       crypto
//         .createHash("sha256")
//         .update(token)
//         .digest("hex");

//     const user =
//       await User.findOne({
//         email,
//         resetPasswordToken:
//           hashed,
//         resetPasswordExpires:
//           { $gt: new Date() },
//       }).select("+password");

//     if (!user) {
//       res.status(400);
//       throw new Error(
//         "Invalid/expired reset token"
//       );
//     }

//     user.password =
//       password;
//     user.resetPasswordToken =
//       undefined;
//     user.resetPasswordExpires =
//       undefined;

//     await user.save();

//     res.json({
//       message:
//         "Password reset successful",
//     });
//   });
//   export const User = mongoose.model(
//     "User",
//     userSchema
//   );
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const roles = [
  "participant",
  "coordinator",
  "hod",
  "admin",
];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: roles,
      default: "participant",
    },

    phone: {
      type: String,
    },

    // Participant fields
    registerNumber: {
      type: String,
    },

    year: {
      type: String,
    },

    department: {
      type: String,
      default: "CSE",
    },

    collegeName: {
      type: String,
    },

    // Leaderboard / Participation Points
    points: {
      type: Number,
      default: 0,
    },

    // Coordinator profile
    cgpa: {
      type: Number,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpires: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(
    this.password,
    salt
  );
});

// Compare passwords
userSchema.methods.matchPassword =
  async function (enteredPassword) {
    return bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

export const User = mongoose.model(
  "User",
  userSchema
);