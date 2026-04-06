import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },   // NEW
    department: { type: String, required: true },    // NEW

    company: { type: String, required: true },
    role: { type: String, required: true },
    package: { type: String },
    date: { type: Date },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);
