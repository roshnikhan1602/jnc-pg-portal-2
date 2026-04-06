import express from "express";
import PlacementContact from "../models/placementContactModel.js";

const router = express.Router();

// CREATE / UPDATE
router.post("/", async (req, res) => {
  try {
    const existing = await PlacementContact.findOne();

    if (existing) {
      const updated = await PlacementContact.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.json(updated);
    }

    const contact = new PlacementContact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const contact = await PlacementContact.findOne();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;