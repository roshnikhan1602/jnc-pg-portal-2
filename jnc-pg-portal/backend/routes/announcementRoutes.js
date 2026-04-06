import express from "express";
import Announcement from "../models/Announcement.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { allowRoles, isOwnerOrAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE → ADMIN + FACULTY */
router.post(
  "/",
  isAuthenticated,
  allowRoles("admin", "faculty"),
  async (req, res) => {
    try {
      const ann = new Announcement({
        ...req.body,
        createdBy: req.user._id,
        postedBy: req.user.role,
      });

      await ann.save();
      res.status(201).json(ann);
    } catch (err) {
      res.status(500).json({ message: "Creation failed" });
    }
  }
);

/* READ → ALL USERS */
router.get("/", async (req, res) => {
  const data = await Announcement.find().sort({ createdAt: -1 });
  res.json(data);
});

/* UPDATE → OWNER (faculty) OR ADMIN */
router.put(
  "/:id",
  isAuthenticated,
  isOwnerOrAdmin(Announcement),
  async (req, res) => {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  }
);

/* DELETE → OWNER OR ADMIN */
router.delete(
  "/:id",
  isAuthenticated,
  isOwnerOrAdmin(Announcement),
  async (req, res) => {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  }
);

export default router;