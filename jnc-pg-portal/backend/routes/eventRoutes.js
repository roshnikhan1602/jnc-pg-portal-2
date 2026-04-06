import express from "express";
import Event from "../models/Event.js"; 
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { allowRoles, isOwnerOrAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});
router.post(
  "/",
  isAuthenticated,
  allowRoles("admin", "faculty"),
  async (req, res) => {
    const event = new Event({
      ...req.body,
      createdBy: req.user._id,
    });

    await event.save();
    res.json(event);
  }
);

router.put(
  "/:id",
  isAuthenticated,
  isOwnerOrAdmin(Event),
  async (req, res) => {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  }
);

router.delete(
  "/:id",
  isAuthenticated,
  isOwnerOrAdmin(Event),
  async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  }
);

export default router;
