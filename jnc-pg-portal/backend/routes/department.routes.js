import express from "express";
import Department from "../models/Department.js";
import Fee from "../models/Fee.js";

import {
  getDepartments,
  addDepartment,
} from "../controllers/departmentController.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===================================== */
/* BASIC DEPARTMENT ROUTES (CONTROLLER) */
/* ===================================== */

// GET all departments
router.get("/", getDepartments);

// ADD new department (ADMIN ONLY)
router.post(
  "/",
  isAuthenticated,
  protect,
  allowRoles("admin"),
  addDepartment
);

/* ===================================== */
/* FEES ROUTES */
/* ===================================== */

// GET all fees
router.get("/fees", async (req, res) => {
  try {
    const fees = await Fee.find({});
    const result = {};

    fees.forEach((f) => {
      result[f.department] = f.courses;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch fees" });
  }
});

// UPDATE fees (ADMIN ONLY)
router.put(
  "/fees",
  isAuthenticated,
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { department, fees } = req.body;

      if (!department || !fees) {
        return res.status(400).json({ message: "Invalid data" });
      }

      await Fee.findOneAndUpdate(
        { department },
        { courses: fees },
        { upsert: true, new: true }
      );

      res.json({ message: "Fee updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Fee update failed" });
    }
  }
);

/* ===================================== */
/* GET SINGLE DEPARTMENT */
/* ===================================== */

router.get("/:name", async (req, res) => {
  try {
    const dept = await Department.findOne({
      name: req.params.name,
    });

    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* ===================================== */
/* UPDATE POSTGRADUATE DETAILS */
/* ===================================== */

router.put(
  "/postgraduate",
  isAuthenticated,
  protect,
  allowRoles("admin", "faculty"),
  async (req, res) => {
    try {
      const { department, data } = req.body;

      if (!department || !data) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const updated = await Department.findOneAndUpdate(
        { name: department },
        {
          vision: data.vision || "",
          mission: data.mission || "",
          objectives: data.objectives || [],
          outcomes: data.outcomes || [],
          placements: data.placements || [],
          events: data.events || [],
          achievements: data.achievements || [],
          internships: data.internships || [],
          syllabus: data.syllabus || "",
        },
        { upsert: true, new: true }
      );

      res.json({
        message: "Department updated successfully",
        data: updated,
      });
    } catch (err) {
      res.status(500).json({ message: "Update failed" });
    }
  }
);

export default router;