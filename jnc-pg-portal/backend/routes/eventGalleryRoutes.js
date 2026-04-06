import express from "express";
import EventGallery from "../models/EventGallery.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { allowRoles, isOwnerOrAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= GET ================= */
router.get("/", async (req, res) => {
  try {
    const data = await EventGallery.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
});

/* ================= CREATE ================= */
router.post(
  "/",
  isAuthenticated,
  allowRoles("admin", "faculty"),
  async (req, res) => {
    try {
      const { title, description, images } = req.body;

      if (!images || images.length === 0) {
        return res.status(400).json({ message: "Images required" });
      }

      const newGallery = new EventGallery({
        title,
        description,
        images,
        createdBy: req.user._id,
        postedBy: req.user.role,
      });

      await newGallery.save();

      res.json(newGallery);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Create failed" });
    }
  }
);

/* ================= DELETE ================= */
router.delete(
  "/:id",
  isAuthenticated,
  isOwnerOrAdmin(EventGallery),
  async (req, res) => {
    await EventGallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  }
);

export default router;