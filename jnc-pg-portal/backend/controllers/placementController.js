import Placement from "../models/Placement.js";

// CREATE
export const addPlacement = async (req, res) => {
  try {
    const placement = new Placement({
      ...req.body,
      createdBy: req.user._id,
    });

    await placement.save();
    res.status(201).json(placement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.json(placements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updatePlacement = async (req, res) => {
  try {
    const updated = await Placement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deletePlacement = async (req, res) => {
  try {
    await Placement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};