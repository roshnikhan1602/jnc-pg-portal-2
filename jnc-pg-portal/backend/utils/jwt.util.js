import jwt from "jsonwebtoken";

export const sendTokenResponse = (res, user, message) => {
  // Create JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );

  // Cookie options
  const options = {
    httpOnly: true, // JS can't access
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  // Send cookie + response
  res
    .status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
};