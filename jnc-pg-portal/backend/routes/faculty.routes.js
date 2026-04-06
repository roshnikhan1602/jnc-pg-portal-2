import express from "express";
import upload from "../middleware/upload.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

import {
  adminCreateFaculty,
  adminUpdateFaculty,
  adminDeleteFaculty,
  getAllFaculty,
  getFacultyById,
  getMyFacultyProfile,
  updateMyFacultyProfile,
  linkFacultyProfile,
  fixFacultyUserLinking,
} from "../controllers/facultyController.js";

const router = express.Router();

/* =====================================================
   👩‍🏫 FACULTY SELF ROUTES (AUTH REQUIRED)
===================================================== */

router.get("/me/profile", isAuthenticated, getMyFacultyProfile);

router.put(
  "/me/profile",
  isAuthenticated,
  upload.single("image"),
  updateMyFacultyProfile
);

router.post("/me/link", isAuthenticated, linkFacultyProfile);

/* =====================================================
   🛡️ ADMIN ROUTES
===================================================== */

router.post(
  "/admin/create",
  upload.single("image"),
  adminCreateFaculty
);

router.put(
  "/admin/update/:id",
  upload.single("image"),
  adminUpdateFaculty
);

router.delete(
  "/admin/delete/:id",
  adminDeleteFaculty
);

/* =====================================================
   🛠️ ONE-TIME FIX ROUTE (RUN ONCE ONLY)
   This will create missing users and link them
===================================================== */

router.post("/admin/fix-linking", fixFacultyUserLinking);

/* =====================================================
   🌐 PUBLIC ROUTES
===================================================== */

router.get("/", getAllFaculty);

/* KEEP THIS LAST */
router.get("/:id", getFacultyById);

export default router;
