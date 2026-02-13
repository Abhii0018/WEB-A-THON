import express from "express";
import {
  initiateSignup,
  verifySignupOtp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
// OTP-based signup
router.post("/signup/initiate", initiateSignup);
router.post("/signup/verify", verifySignupOtp);

// Authentication
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

/**
 * PRIVATE ROUTES
 */
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getMe);

export default router;
