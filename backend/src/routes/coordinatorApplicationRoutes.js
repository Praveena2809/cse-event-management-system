import express from "express";
import {
  approveApplication,
  listApplications,
  myCoordinatorApplication,
  rejectApplication,
  submitCoordinatorApplication,
} from "../controllers/coordinatorApplicationController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Participant
router.get("/me", protect, requireRole("participant"), myCoordinatorApplication);
router.post("/", protect, requireRole("participant"), submitCoordinatorApplication);

// HOD
router.get("/", protect, requireRole("hod"), listApplications);
router.post("/:id/approve", protect, requireRole("hod"), approveApplication);
router.post("/:id/reject", protect, requireRole("hod"), rejectApplication);

export default router;

