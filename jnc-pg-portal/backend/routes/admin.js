import express from "express";

const router = express.Router();

// TEMP in-memory storage (replace with DB later)
let feesData = [];

/* ============================= */
/* SAVE FULL FEES */
/* ============================= */
router.post("/fees", (req, res) => {
  try {
    const { department, courses } = req.body;

    if (!department || !courses) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // replace existing department
    feesData = feesData.filter((d) => d.department !== department);
    feesData.push({ department, courses });

    res.json({
      message: "Saved Successfully",
      feesData,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to save fees" });
  }
});

/* ============================= */
/* GET FEES */
/* ============================= */
router.get("/fees", (req, res) => {
  try {
    res.json(feesData);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch fees" });
  }
});

export default router;