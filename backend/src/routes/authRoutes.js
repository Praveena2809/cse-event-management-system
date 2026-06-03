import express from "express";
import { body } from "express-validator";
import {
  forgotPassword,
  login,
  me,
  registerParticipant,
  resendVerification,
  resetPassword,
  updateMe,
  verifyEmail,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  registerParticipant
);

router.post("/login", login);
router.get("/me", protect, me);
router.put("/me", protect, updateMe);

router.get("/verify-email", verifyEmail); // token in query
router.post("/resend-verification", protect, resendVerification);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
