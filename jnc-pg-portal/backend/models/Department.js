import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    /* ACADEMIC CONTENT */
    vision: {
      type: String,
      trim: true,
    },

    mission: {
      type: String,
      trim: true,
    },

    objectives: {
      type: [String],
      default: [],
    },

    outcomes: {
      type: [String],
      default: [],
    },

    /* ACTIVITY SECTIONS */
    placements: {
      type: [String],
      default: [],
    },

    events: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    internships: {
      type: [String],
      default: [],
    },

    syllabus: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);