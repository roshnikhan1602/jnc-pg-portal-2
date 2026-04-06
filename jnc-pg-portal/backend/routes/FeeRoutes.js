import express from "express";
import Fee from "../models/Fee.js";

const router = express.Router();

/* ================= SAVE / UPDATE ================= */
router.post("/fees", async (req, res) => {
  try {
    const { department, courses } = req.body;

    if (!department) {
      return res.status(400).json({ message: "Department required" });
    }

    const updated = await Fee.findOneAndUpdate(
      { department },
      { courses },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Save failed" });
  }
});

/* ================= GET ================= */
router.get("/fees/:dept", async (req, res) => {
  try {
    const data = await Fee.findOne({ department: req.params.dept });
    res.json(data || {});
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
});

export default router;