import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  signupUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// ✅ VALIDATE + SEND ROLE
router.get("/validate", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "email role"
    );

    return res.status(200).json({
      authenticated: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
});

export default router;
