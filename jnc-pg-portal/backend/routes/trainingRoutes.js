import express from "express";
import Training from "../models/trainingModel.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const data = await Training.findOne();
  res.json(data);
});

// CREATE OR UPDATE (single document logic)
router.post("/", async (req, res) => {
  try {
    const existing = await Training.findOne();

    if (existing) {
      const updated = await Training.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const newData = new Training(req.body);
    await newData.save();

    res.json(newData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;