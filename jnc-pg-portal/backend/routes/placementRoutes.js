import express from "express";
import * as placementController from "../controllers/placementController.js";
import Placement from "../models/Placement.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  protect,
  allowRoles,
  isOwnerOrAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET
router.get("/", isAuthenticated, protect, placementController.getPlacements);

// CREATE
router.post(
  "/",
  isAuthenticated,
  protect,
  allowRoles("admin", "faculty"),
  placementController.addPlacement
);

// UPDATE
router.put(
  "/:id",
  isAuthenticated,
  protect,
  isOwnerOrAdmin(Placement),
  placementController.updatePlacement
);

// DELETE
router.delete(
  "/:id",
  isAuthenticated,
  protect,
  isOwnerOrAdmin(Placement),
  placementController.deletePlacement
);

export default router;