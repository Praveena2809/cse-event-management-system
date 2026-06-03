import express from "express";
import {
  approveEvent,
  approveSubevent,
  createMainEvent,
  createSubevent,
  getEventById,
  listMyEvents,
  listPendingApprovals,
  listPublicEvents,
  rejectEvent,
  rejectSubevent,
  updateWinners,
  updateMainEvent,
} from "../controllers/eventController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

router.get("/public", listPublicEvents);

// Coordinator
router.get("/me/list", protect, requireRole("coordinator"), listMyEvents);
router.post("/", protect, requireRole("coordinator"), upload.single("poster"), createMainEvent);
router.put("/:id", protect, requireRole("coordinator"), upload.single("poster"), updateMainEvent);
router.post(
  "/:eventId/subevents",
  protect,
  requireRole("coordinator"),
  upload.single("poster"),
  createSubevent
);
router.patch(
  "/subevents/:id/winners",
  protect,
  requireRole("coordinator"),
  updateWinners
);

// HOD approvals
router.get("/hod/pending", protect, requireRole("hod"), listPendingApprovals);
router.post("/hod/events/:id/approve", protect, requireRole("hod"), approveEvent);
router.post("/hod/events/:id/reject", protect, requireRole("hod"), rejectEvent);
router.post("/hod/subevents/:id/approve", protect, requireRole("hod"), approveSubevent);
router.post("/hod/subevents/:id/reject", protect, requireRole("hod"), rejectSubevent);

router.get("/:id", getEventById);

export default router;
