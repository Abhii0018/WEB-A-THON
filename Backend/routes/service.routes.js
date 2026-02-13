import express from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from "../controllers/service.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
router.get("/", getAllServices);
router.get("/:id", getServiceById);

/**
 * ADMIN ONLY ROUTES
 */
router.post("/", authMiddleware, authorizeRoles("admin"), createService);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateService);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteService);

export default router;
