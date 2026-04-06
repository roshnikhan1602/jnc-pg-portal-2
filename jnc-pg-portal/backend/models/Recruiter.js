import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  logo: {
    type: String,
    required: true
  }
});

export default mongoose.model("Recruiter", recruiterSchema);
