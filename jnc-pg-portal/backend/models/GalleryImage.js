import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
  {
filename: { type: String, default: "image.jpg" },
path: { type: String, required: true },
    caption: { type: String },
    company: { type: String },
    year: { type: String },
    uploadedBy: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("GalleryImage", galleryImageSchema);