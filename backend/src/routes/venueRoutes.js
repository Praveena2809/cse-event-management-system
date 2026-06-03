import express from "express";
import { checkAvailability, createVenue, listVenues } from "../controllers/venueController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listVenues);
router.get("/availability", protect, requireRole("coordinator", "admin", "hod"), checkAvailability);

router.post("/", protect, requireRole("admin"), createVenue);

export default router;

