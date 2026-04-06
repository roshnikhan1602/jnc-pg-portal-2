import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    venue: String,
    department: String,
    brochure: String,
    eventDate: {
      type: Date,
      default: null
    },
    postedBy: String,
    createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;