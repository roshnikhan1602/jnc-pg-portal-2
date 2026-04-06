import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    postedBy: {
      type: String,
      enum: ["admin", "faculty"],
      required: true,
    },
    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ✅ ES MODULE EXPORT
const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);

export default Announcement;