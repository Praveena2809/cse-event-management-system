import express from "express";
import { createUser, deleteUser, listUsers, updateUserRole } from "../controllers/adminController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, requireRole("admin"), listUsers);
router.post("/users", protect, requireRole("admin"), createUser);
router.patch("/users/:id/role", protect, requireRole("admin"), updateUserRole);
router.delete("/users/:id", protect, requireRole("admin"), deleteUser);

export default router;

