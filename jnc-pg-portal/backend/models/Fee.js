import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
      unique: true,
    },

    courses: {
      type: Object, // flexible structure
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);