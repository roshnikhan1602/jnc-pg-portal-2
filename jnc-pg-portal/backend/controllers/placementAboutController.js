import PlacementAbout from "../models/placementAboutModel.js";

export const updatePlacementAbout = async (req, res) => {
  try {
    const {
      title,
      description,
      coordinatorName,
      coordinatorDesignation,
      coordinatorEmail,
      coordinatorPhone,
      highlights
    } = req.body;

    const data = {
      title,
      description,
      highlights: highlights ? highlights.split(",") : [],
      coordinator: {
        name: coordinatorName,
        designation: coordinatorDesignation,
        email: coordinatorEmail,
        phone: coordinatorPhone,
      },
    };


    if (req.file) {
      data.coordinator.image = req.file.path;
    }

    const about = await PlacementAbout.findOneAndUpdate({}, data, {
      new: true,
      upsert: true,
    });

    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};