import express from "express";
import Application from "../models/Application.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================= */
/* CREATE → PUBLIC (students) */
/* ============================= */
router.post("/", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to submit application",
    });
  }
});

/* ============================= */
/* GET ALL → ADMIN ONLY */
/* ============================= */
router.get(
  "/",
  isAuthenticated,
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const apps = await Application.find().sort({ createdAt: -1 });
      res.json(apps);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  }
);

/* ============================= */
/* UPDATE → ADMIN ONLY */
/* ============================= */


router.put(
  "/:id",
  isAuthenticated,
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const updated = await Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Update failed" });
    }
  }
);

/* ============================= */
/* DELETE → ADMIN ONLY */
/* ============================= */
router.delete(
  "/:id",
  isAuthenticated,
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      await Application.findByIdAndDelete(req.params.id);

      res.json({ message: "Application deleted" });
    } catch (err) {
      res.status(500).json({ message: "Delete failed" });
    }
  }
);

export default router;