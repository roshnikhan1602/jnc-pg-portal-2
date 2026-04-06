import Faculty from "../models/Faculty.js";
import Department from "../models/Department.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* =====================================================
🔧 UNIVERSAL ARRAY PARSER (FINAL FIX)
===================================================== */
const parseArrayField = (field) => {
if (!field) return [];

if (Array.isArray(field)) {
return field.map((item) => {
if (typeof item === "string") {
try {
return JSON.parse(item);
} catch {
return item;
}
}
return item;
});
}

if (typeof field === "string") {
try {
const parsed = JSON.parse(field);
return Array.isArray(parsed) ? parsed : [parsed];
} catch {
return [];
}
}

return [];
};

/* =====================================================
🛡️ ADMIN CREATE FACULTY
===================================================== */
export const adminCreateFaculty = async (req, res) => {
try {
const {
firstName,
lastName,
email,
phone,
password,
designation,
departments,
bio,
} = req.body;

if (
  !firstName ||
  !lastName ||
  !email ||
  !phone ||
  !password ||
  !designation ||
  !departments
) {
  return res.status(400).json({
    message: "All required fields must be filled",
  });
}

const deptList = parseArrayField(departments);

const validDepts = await Department.find({
  _id: { $in: deptList },
});

if (validDepts.length !== deptList.length) {
  return res.status(400).json({
    message: "Invalid department selected",
  });
}

const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({
    message: "Email already exists",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  firstName,
  lastName,
  email,
  phone,
  password: hashedPassword,
  role: "faculty",
});

const faculty = await Faculty.create({
  user: user._id,
  name: `${firstName} ${lastName}`,
  email,
  designation,
  bio,
  departments: deptList,
  image: req.file ? req.file.filename : "",
});

return res.status(201).json({
  success: true,
  faculty,
});

} catch (error) {
console.error("ADMIN CREATE ERROR:", error);
return res.status(500).json({
message: "Internal Server Error",
error: error.message,
});
}
};

/* =====================================================
🛡️ ADMIN UPDATE FACULTY
===================================================== */
export const adminUpdateFaculty = async (req, res) => {
try {
const {
firstName,
lastName,
email,
phone,
designation,
bio,
departments,
} = req.body;

const deptList = parseArrayField(departments);

const faculty = await Faculty.findById(req.params.id);

if (!faculty) {
  return res.status(404).json({
    message: "Faculty not found",
  });
}

if (faculty.user) {
  const user = await User.findById(faculty.user);
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    await user.save();
  }
}

faculty.name = `${firstName} ${lastName}`;
faculty.email = email;
faculty.designation = designation;
faculty.bio = bio;
faculty.departments = deptList;

if (req.file) {
  faculty.image = req.file.filename;
}

await faculty.save();

const updatedFaculty = await Faculty.findById(req.params.id)
  .populate("departments", "name");

return res.status(200).json({
  success: true,
  faculty: updatedFaculty,
});

} catch (error) {
console.error("ADMIN UPDATE ERROR:", error);
return res.status(500).json({
message: "Internal Server Error",
error: error.message,
});
}
};

/* =====================================================
🛡️ ADMIN DELETE FACULTY (FIXED)
===================================================== */
export const adminDeleteFaculty = async (req, res) => {
try {
const faculty = await Faculty.findById(req.params.id);

if (!faculty) {
  return res.status(404).json({
    message: "Faculty not found",
  });
}

if (faculty.user) {
  await User.findByIdAndDelete(faculty.user);
}

await Faculty.findByIdAndDelete(req.params.id);

return res.status(200).json({
  success: true,
  message: "Faculty deleted successfully",
});

} catch (error) {
console.error("DELETE ERROR:", error);
return res.status(500).json({
message: "Internal Server Error",
error: error.message,
});
}
};

/* =====================================================
🌐 GET ALL FACULTY
===================================================== */
export const getAllFaculty = async (req, res) => {
try {
const faculties = await Faculty.find().populate("departments", "name");
return res.status(200).json({ faculties });
} catch (error) {
return res.status(500).json({ message: error.message });
}
};

/* =====================================================
🌐 GET FACULTY BY ID
===================================================== */
export const getFacultyById = async (req, res) => {
try {
const faculty = await Faculty.findById(req.params.id)
.populate("departments", "name")
.populate("user");

if (!faculty) {
  return res.status(404).json({
    message: "Faculty not found",
  });
}

return res.status(200).json({ faculty });

} catch (error) {
return res.status(500).json({ message: error.message });
}
};

/* =====================================================
👩‍🏫 LINK USER TO FACULTY
===================================================== */
export const linkFacultyProfile = async (req, res) => {
try {
const user = await User.findById(req.user._id);
const faculty = await Faculty.findOne({ email: user.email });

if (!faculty) {
  return res.status(404).json({
    message: "Faculty profile not found",
  });
}

faculty.user = user._id;
await faculty.save();

return res.status(200).json({
  success: true,
  faculty,
});

} catch (error) {
return res.status(500).json({ message: error.message });
}
};

/* =====================================================
👩‍🏫 GET MY PROFILE
===================================================== */
export const getMyFacultyProfile = async (req, res) => {
try {
const faculty = await Faculty.findOne({
user: req.user._id,
}).populate("departments", "name");

if (!faculty) {
  return res.status(404).json({
    message: "Faculty not linked",
  });
}

return res.status(200).json(faculty);

} catch (error) {
return res.status(500).json({ message: error.message });
}
};

/* =====================================================
👩‍🏫 UPDATE MY PROFILE (FINAL FIX)
===================================================== */
export const updateMyFacultyProfile = async (req, res) => {
try {
const updateData = { ...req.body };

const simpleFields = [
  "researchInterests",
  "publications",
  "conferencePublications",
  "papersPresented",
  "awardsAchievements",
  "memberships",
];

simpleFields.forEach((field) => {
  if (updateData[field]) {
    updateData[field] = parseArrayField(updateData[field]);
  }
});

if (updateData.qualifications) {
  updateData.qualifications = parseArrayField(updateData.qualifications);
}

const structuredFields = [
  "structuredPublications",
  "structuredConferencePublications",
  "structuredPapersPresented",
  "structuredAwards",
  "structuredMemberships",
];

structuredFields.forEach((field) => {
  if (updateData[field]) {
    updateData[field] = parseArrayField(updateData[field]);
  }
});

if (req.file) {
  updateData.image = req.file.filename;
}

const faculty = await Faculty.findOneAndUpdate(
  { user: req.user._id },
  updateData,
  { new: true }
);

if (!faculty) {
  return res.status(404).json({
    message: "Faculty not found",
  });
}

return res.status(200).json(faculty);

} catch (error) {
console.error("UPDATE ERROR:", error);
return res.status(500).json({
message: "Internal Server Error",
error: error.message,
});
}
};

/* =====================================================
🛠️ FIX USER LINKING
===================================================== */
export const fixFacultyUserLinking = async (req, res) => {
try {
const faculties = await Faculty.find();

for (const faculty of faculties) {
  if (faculty.user) continue;

  let user = await User.findOne({ email: faculty.email });

  if (!user) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    user = await User.create({
      firstName: faculty.name.split(" ")[0] || "Faculty",
      lastName: faculty.name.split(" ").slice(1).join(" ") || "",
      email: faculty.email,
      phone: "0000000000",
      password: hashedPassword,
      role: "faculty",
    });
  }

  faculty.user = user._id;
  await faculty.save();
}

return res.status(200).json({
  message: "Faculty linking completed",
});

} catch (error) {
return res.status(500).json({ message: error.message });
}
};