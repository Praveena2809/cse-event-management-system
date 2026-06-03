import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "../src/models/User.js";
import { Venue } from "../src/models/Venue.js";

const connect = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing in environment");
  await mongoose.connect(process.env.MONGO_URI);
};

const upsertUser = async ({ name, email, role, password, extra = {} }) => {
  const existing = await User.findOne({ email }).select("+password");
  if (existing) {
    existing.name = name;
    existing.role = role;
    existing.isEmailVerified = true;
    // reset password to keep sample credentials consistent
    existing.password = password;
    Object.assign(existing, extra);
    await existing.save();
    return existing;
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    isEmailVerified: true,
    ...extra,
  });
  return user;
};

const upsertVenue = async ({ name, location, capacity }) => {
  const existing = await Venue.findOne({ name });
  if (existing) return existing;
  return Venue.create({ name, location, capacity, isActive: true });
};

const run = async () => {
  await connect();

  const password = "Password123!";
  await upsertUser({
    name: "Sample Participant",
    email: "participant@example.com",
    role: "participant",
    password,
    extra: { registerNumber: "CSE001", year: "3", department: "CSE", phone: "9000000001" },
  });
  await upsertUser({
    name: "Sample Coordinator",
    email: "coordinator@example.com",
    role: "coordinator",
    password,
    extra: { phone: "9000000002" },
  });
  await upsertUser({
    name: "Sample HOD",
    email: "hod@example.com",
    role: "hod",
    password,
    extra: { phone: "9000000003" },
  });
  await upsertUser({
    name: "Sample Admin",
    email: "admin@example.com",
    role: "admin",
    password,
    extra: { phone: "9000000004" },
  });

  await upsertVenue({ name: "Main Auditorium", location: "Block A", capacity: 400 });
  await upsertVenue({ name: "CSE Seminar Hall", location: "CSE Department", capacity: 120 });
  await upsertVenue({ name: "Lab 1", location: "CSE Lab", capacity: 60 });

  console.log("✅ Seed complete");
  console.log("Sample logins (password for all): Password123!");
  console.log("- participant@example.com (participant)");
  console.log("- coordinator@example.com (coordinator)");
  console.log("- hod@example.com (hod)");
  console.log("- admin@example.com (admin)");

  await mongoose.disconnect();
};

run().catch(async (e) => {
  console.error("Seed failed:", e);
  try {
    await mongoose.disconnect();
  } catch {
    // ignore
  }
  process.exit(1);
});

