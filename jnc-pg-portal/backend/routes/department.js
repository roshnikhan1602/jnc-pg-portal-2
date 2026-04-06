import express from "express";
import Department from "../models/Department.js";
import Fee from "../models/Fee.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";


import multer from "multer";
import path from "path";


const router = express.Router();

/* ============================= */
/* GET ALL FEES */
/* ============================= */
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

/* ============================= */
/* UPDATE FEES (ADMIN ONLY) */
/* ============================= */
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

      res.json({ message: "Fee updated" });
    } catch (err) {
      res.status(500).json({ message: "Fee update failed" });
    }
  }
);

/* ============================= */
/* GET DEPARTMENT DETAILS */
/* ============================= */
router.get("/:name", async (req, res) => {
  try {
    const dept = await Department.findOne({
      name: req.params.name,
    });

    if (!dept) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(dept);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* ============================= */
/* UPDATE DEPARTMENT (ADMIN/FACULTY) */
/* ============================= */
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
          vision: data.vision,
          mission: data.mission,
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

/* STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* UPLOAD SYLLABUS */
router.post("/syllabus", upload.single("syllabus"), async (req, res) => {
  try {
    const { department } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File missing" });
    }

    const updated = await Department.findOneAndUpdate(
      { name: department },
      { syllabus: `/uploads/${req.file.filename}` },
      { new: true }
    );

    res.json({
      message: "Uploaded successfully",
      data: updated,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});


export default router;