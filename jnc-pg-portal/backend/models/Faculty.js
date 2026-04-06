import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    bio: { type: String },

    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],

    qualifications: [
      {
        degree: String,
        subject: String,
        university: String,
        year: String,
      },
    ],

    academicExperience: String,
    researchExperience: String,

    researchInterests: [String],

    // -----------------------------
    // OLD FIELDS (DO NOT TOUCH)
    // -----------------------------
    publications: [String],
    conferencePublications: [String],
    papersPresented: [String],
    awardsAchievements: [String],
    memberships: [String],

    // =====================================================
    // NEW STRUCTURED OPTIONAL FIELDS (SAFE ADDITION)
    // =====================================================

    structuredPublications: {
      type: [
        {
          title: { type: String },
          journal: { type: String },
          volume: { type: String },
          issue: { type: String },
          pages: { type: String },
          year: { type: Number },
          issn: { type: String },
        },
      ],
      default: [],
    },

    structuredConferencePublications: {
      type: [
        {
          title: { type: String },
          conferenceName: { type: String },
          location: { type: String },
          date: { type: String },
          isbn: { type: String },
        },
      ],
      default: [],
    },

    structuredPapersPresented: {
      type: [
        {
          title: { type: String },
          conferenceName: { type: String },
          venue: { type: String },
          month: { type: String },
          year: { type: Number },
        },
      ],
      default: [],
    },

    structuredAwards: {
      type: [
        {
          description: { type: String },
          organization: { type: String },
          year: { type: Number },
        },
      ],
      default: [],
    },

    structuredMemberships: {
      type: [
        {
          role: { type: String },
          organization: { type: String },
          type: { type: String }, // BoS / Guide / Chairperson
          year: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
