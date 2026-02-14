import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  respondToContact,
  updateContactStatus,
  deleteContact
} from "../controllers/contact.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";

const router = express.Router();

// Public route - anyone can submit contact form
router.post("/", createContact);

// Admin only routes
router.get("/", protect, restrictTo("admin"), getAllContacts);
router.get("/:id", protect, restrictTo("admin"), getContactById);
router.patch("/:id/respond", protect, restrictTo("admin"), respondToContact);
router.patch("/:id/status", protect, restrictTo("admin"), updateContactStatus);
router.delete("/:id", protect, restrictTo("admin"), deleteContact);

export default router;
