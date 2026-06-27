import express
from "express";
import {
  getParticipantLeaderboard,
  getCoordinatorLeaderboard,
} from "../controllers/leaderboardController.js";

import {
  protect,
  requireRole,
} from "../middleware/authMiddleware.js";

const router =
express.Router();

// Participant Leaderboard
router.get(
  "/participants",
  getParticipantLeaderboard
);

// Coordinator Leaderboard
router.get(
  "/coordinators",
  protect,
  requireRole(
    "coordinator",
    "hod"
  ),
  getCoordinatorLeaderboard
);
export default router;