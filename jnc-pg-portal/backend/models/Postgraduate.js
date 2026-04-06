import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      trim: true,
    },

    vision: {
      type: String,
      trim: true,
    },

    mission: {
      type: String,
      trim: true,
    },

    objectives: {
      type: String,
      trim: true,
    },

    outcomes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Postgraduate", pgSchema);