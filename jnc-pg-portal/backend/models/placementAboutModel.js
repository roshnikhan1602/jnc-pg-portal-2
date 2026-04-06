import mongoose from "mongoose";

const placementAboutSchema = new mongoose.Schema(
  {
    title: { type: String },              // ⭐ ADD THIS
    description: { type: String },        // ⭐ ADD THIS

    highlights: [String],

    coordinator: {
      name: { type: String },             // optional but useful
      designation: { type: String },      // optional
      email: { type: String },
      phone: { type: String },
      image: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("PlacementAbout", placementAboutSchema);
