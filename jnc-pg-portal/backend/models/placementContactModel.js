import mongoose from "mongoose";

const placementContactSchema = new mongoose.Schema({
  name: String,
  designation: String,
  department: String,
  address: String,
  email: String,
  phone: String,
  extension: String
}, { timestamps: true });

export default mongoose.model("PlacementContact", placementContactSchema);
