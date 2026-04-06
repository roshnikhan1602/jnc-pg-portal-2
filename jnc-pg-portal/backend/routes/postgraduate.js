import express from "express";
import PG from "../models/Postgraduate.js";

const router = express.Router();

/* ================= GET PG ================= */
router.get("/:dept", async (req, res) => {
  try {
    const data = await PG.findOne({ department: req.params.dept });
    res.json(data || {});
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= SAVE / UPDATE PG ================= */
router.post("/", async (req, res) => {
  try {
    // ✅ FIX: include outcomes
    const { department, vision, mission, objectives, outcomes } = req.body;

    if (!department) {
      return res.status(400).json({ message: "Department required" });
    }

    // ✅ convert string → array
    const formattedOutcomes = outcomes
      ? outcomes.split(",").map((o) => o.trim())
      : [];

    let existing = await PG.findOne({ department });

    if (existing) {
      // UPDATE
      existing.vision = vision;
      existing.mission = mission;
      existing.objectives = objectives;
      existing.outcomes = formattedOutcomes;

      await existing.save();
      return res.json(existing);
    } else {
      // CREATE
      const newPG = new PG({
        department,
        vision,
        mission,
        objectives,
        outcomes: formattedOutcomes, // ✅ FIX
      });

      await newPG.save();
      return res.json(newPG);
    }

  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ message: err.message }); // show actual error
  }
});

export default router;