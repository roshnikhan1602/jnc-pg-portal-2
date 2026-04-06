import Department from "../models/Department.js";

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });

    // FIX: return inside an object
    res.status(200).json({ departments });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch departments",
    });
  }
};

export const addDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;

    const department = await Department.create({ name, code });

    // return with consistent structure
    res.status(201).json({ department });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create department",
    });
  }
};
