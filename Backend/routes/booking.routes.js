import express from "express";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  getEmployeeBookings,
  updateBookingStatus,
  deleteBooking
} from "../controllers/booking.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * All booking routes require authentication
 */
router.use(authMiddleware);

/**
 * USER ROUTES
 */
router.post("/", authorizeRoles("user"), createBooking);
router.get("/my", authorizeRoles("user"), getMyBookings);

/**
 * ADMIN ROUTES
 */
router.get("/", authorizeRoles("admin"), getAllBookings);

/**
 * EMPLOYEE ROUTES
 */
router.get("/employee/assigned", authorizeRoles("employee"), getEmployeeBookings);
router.patch("/:id/status", authorizeRoles("employee", "admin"), updateBookingStatus);

/**
 * SHARED ROUTES (with access control in controller)
 */
router.get("/:id", getBookingById);
router.delete("/:id", deleteBooking);

export default router;
