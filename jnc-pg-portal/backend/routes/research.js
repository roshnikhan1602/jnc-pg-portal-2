import express from "express";
import Research from "../models/Research.js";
import Faculty from "../models/Faculty.js";

const router = express.Router();

/* ================= GET ================= */
router.get("/:dept", async (req, res) => {
  try {
    const data = await Research.findOne({
      department: req.params.dept,
    }).populate({
      path: "guides",
      populate: {
        path: "user",
        select: "firstName lastName email role",
      },
    });

    res.json(data || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= CREATE / UPDATE ================= */
router.post("/", async (req, res) => {
  try {
    const { department, intro, guides, scholars, conclusion } = req.body;

    // 🔥 Validate faculty IDs
    const validGuides = await Faculty.find({
      _id: { $in: guides },
    });

    if (validGuides.length !== guides.length) {
      return res.status(400).json({ message: "Invalid faculty IDs" });
    }

    const updated = await Research.findOneAndUpdate(
      { department },
      {
        department,
        intro,
        guides,
        scholars,
        conclusion,
      },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= GET FACULTY FOR DROPDOWN ================= */
router.get("/faculty/list", async (req, res) => {
  try {
    const faculty = await Faculty.find()
      .populate("user", "firstName lastName role")
      .select("name designation email image");

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;