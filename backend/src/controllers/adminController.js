import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/email.js";

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ users });
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    res.status(400);
    throw new Error("name, email, role are required");
  }
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const tempPassword = crypto.randomBytes(6).toString("hex");
  const user = await User.create({
    name,
    email,
    password: tempPassword,
    role,
    isEmailVerified: true,
  });

  // Send credentials by email (as requested). In production, send password-reset link instead.
  try {
    await sendEmail({
      to: email,
      subject: "Your CSE Event System account",
      html: `<p>Hello ${name},</p>
        <p>Your account has been created with role <b>${role}</b>.</p>
        <p><b>Login Email:</b> ${email}<br/><b>Temporary Password:</b> ${tempPassword}</p>
        <p>Please login and change your password immediately.</p>`,
    });
  } catch (e) {
    // ignore in dev
  }

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role, isEmailVerified: user.isEmailVerified },
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  user.role = role;
  await user.save();
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ message: "User deleted" });
});

