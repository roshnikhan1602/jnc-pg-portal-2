import express from "express";
import multer from "multer";
import Recruiter from "../models/Recruiter.js";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/recruiters");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ADD */
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const recruiter = new Recruiter({
      logo: `/uploads/recruiters/${req.file.filename}`, // ✅ FIX
    });

    await recruiter.save();
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET */
router.get("/", async (req, res) => {
  const data = await Recruiter.find();
  res.json(data);
});

/* DELETE */
router.delete("/:id", async (req, res) => {
  await Recruiter.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;