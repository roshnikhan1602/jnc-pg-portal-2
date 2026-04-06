import mongoose from "mongoose";

const eventGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: [String],
      required: true,
    },
    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
    postedBy: {
      type: String,
      enum: ["admin", "faculty"],
      required: true,
    },
  },
  { timestamps: true }
);

const EventGallery =
  mongoose.models.EventGallery ||
  mongoose.model("EventGallery", eventGallerySchema);

export default EventGallery;