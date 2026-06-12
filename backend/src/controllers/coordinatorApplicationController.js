import { asyncHandler } from "../utils/asyncHandler.js";
import { CoordinatorApplication } from "../models/CoordinatorApplication.js";
import { User } from "../models/User.js";
import { sendEmail } from "../utils/email.js";

export const submitCoordinatorApplication = asyncHandler(async (req, res) => {
  const existing = await CoordinatorApplication.findOne({ applicant: req.user._id });
  if (existing && existing.status === "pending_review") {
    res.status(400);
    throw new Error("Application already submitted and pending");
  }

  const payload = {
    applicant: req.user._id,
    name: req.body.name || req.user.name,
    registerNumber: req.body.registerNumber || req.user.registerNumber,
    year: req.body.year || req.user.year,
    department: req.body.department || req.user.department,
    phone: req.body.phone || req.user.phone,
    email: req.body.email || req.user.email,
    cgpa: req.body.cgpa,
    achievements: req.body.achievements,
    visionForEvent: req.body.visionForEvent,
    status: "pending_review",
    rejectionReason: undefined,
  };

  const app = await CoordinatorApplication.findOneAndUpdate(
    { applicant: req.user._id },
    payload,
    { upsert: true, new: true }
  );

  res.status(201).json({ application: app });
});

export const myCoordinatorApplication = asyncHandler(async (req, res) => {
  const app = await CoordinatorApplication.findOne({ applicant: req.user._id });
  res.json({ application: app });
});

// HOD
export const listApplications = asyncHandler(async (req, res) => {
  const apps = await CoordinatorApplication.find().sort({ createdAt: -1 }).populate("applicant", "name email");
  res.json({ applications: apps });
});

export const approveApplication = asyncHandler(async (req, res) => {
  const app = await CoordinatorApplication.findById(req.params.id).populate("applicant");
  if (!app) {
    res.status(404);
    throw new Error("Application not found");
  }

  app.status = "approved";
  app.rejectionReason = undefined;
  app.reviewedBy = req.user._id;
  app.reviewedAt = new Date();
  await app.save();

  // Promote user to coordinator
  const user = await User.findById(app.applicant._id);
  user.role = "coordinator";
  await user.save();

  // Email automation: send coordinator access info
  try {
    await sendEmail({
      to: user.email,
      subject: "Coordinator Access Approved - CSE Event System",
      html: `<p>Hello ${user.name},</p>
        <p>Your Coordinator application has been approved by HOD.</p>
        <p>You can now login with your <b>existing email and password</b> and access the Coordinator dashboard.</p>`,
    });
  } catch (e) {
    // ignore in dev
  }

  res.json({ application: app });
});

export const rejectApplication = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  if (!reason) {
    res.status(400);
    throw new Error("Rejection reason is required");
  }

  const app = await CoordinatorApplication.findById(req.params.id);
  if (!app) {
    res.status(404);
    throw new Error("Application not found");
  }

  app.status = "rejected";
  app.rejectionReason = reason;
  app.reviewedBy = req.user._id;
  app.reviewedAt = new Date();
  await app.save();

  res.json({ application: app });
});

