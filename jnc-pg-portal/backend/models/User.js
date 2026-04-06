import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  // ✅ ADD THIS
  role: {
    type: String,
    enum: ["user", "admin","faculty"],
    default: "user",
  },
});

export default mongoose.model("User", userSchema);
