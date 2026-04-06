import Faculty from "../models/Faculty.js";

export const updateFacultyImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { image: req.file.filename },
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ success: true, faculty });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
