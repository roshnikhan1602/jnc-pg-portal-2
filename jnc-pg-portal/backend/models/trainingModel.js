import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema({
  semester: String,
  focus: String,
  topics: [String]
});

const trainingSchema = new mongoose.Schema({
  introduction: String,
  skillsCovered: [String],
  technicalDomains: [String],
  yearlyPlan: [semesterSchema]
}, { timestamps: true });

export default mongoose.model("Training", trainingSchema);
