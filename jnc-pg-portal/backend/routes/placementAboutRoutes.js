import express from "express";
import multer from "multer";
import PlacementAbout from "../models/placementAboutModel.js";

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ==========================
// CREATE
// ==========================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      highlights,
      coordinatorName,
      coordinatorDesignation,
      coordinatorEmail,
      coordinatorPhone,
    } = req.body;

    const newData = new PlacementAbout({
      title,
      description,
      highlights: highlights ? highlights.split(",") : [],
      coordinator: {
        name: coordinatorName,
        designation: coordinatorDesignation,
        email: coordinatorEmail,
        phone: coordinatorPhone,
        image: req.file ? req.file.path : "",
      },
    });

    const saved = await newData.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// GET
// ==========================
router.get("/", async (req, res) => {
  try {
    const data = await PlacementAbout.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// UPDATE
// ==========================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      highlights,
      coordinatorName,
      coordinatorDesignation,
      coordinatorEmail,
      coordinatorPhone,
    } = req.body;

    const updateFields = {
      title,
      description,
      highlights: highlights ? highlights.split(",") : [],
      "coordinator.name": coordinatorName,
      "coordinator.designation": coordinatorDesignation,
      "coordinator.email": coordinatorEmail,
      "coordinator.phone": coordinatorPhone,
    };

    if (req.file) {
      updateFields["coordinator.image"] = req.file.path;
    }

    const updated = await PlacementAbout.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;