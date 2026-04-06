import mongoose from "mongoose";

/* ================= GUIDE SCHEMA ================= */
// const guideSchema = new mongoose.Schema(
//   {
//     name: { type: String, trim: true },
//     slug: { type: String, trim: true },

//     designation: { type: String, trim: true },
//     qualification: { type: String, trim: true },
//     image: { type: String },

//     academicExperience: { type: String },
//     researchExperience: { type: String },
//     email: { type: String, lowercase: true, trim: true },

//     degrees: [
//       {
//         degree: String,
//         subject: String,
//         university: String,
//         year: String,
//       },
//     ],

//     researchInterests: {
//       type: [String],
//       default: [],
//     },

//     publications: {
//       type: [String],
//       default: [],
//     },

//     conferencePublications: {
//       type: [String],
//       default: [],
//     },

//     papersPresented: {
//       type: [String],
//       default: [],
//     },

//     awards: {
//       type: [String],
//       default: [],
//     },

//     memberships: {
//       type: [String],
//       default: [],
//     },
//   },
//   { _id: false } // prevents extra _id for nested docs (cleaner)
// );

/* ================= RESEARCH SCHEMA ================= */

const researchSchema = new mongoose.Schema(
  {
    department: {
      type: String, // slug (important)
      required: true,
      unique: true,
      trim: true,
    },

    intro: String,

    /* 🔥 LINK TO FACULTY */
    guides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
    ],

    scholars: {
      type: [String],
      default: [],
    },

    conclusion: String,
  },
  { timestamps: true }
);



/* ================= EXPORT ================= */
export default mongoose.model("Research", researchSchema, "researches");