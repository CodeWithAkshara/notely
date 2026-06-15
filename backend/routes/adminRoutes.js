const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { protect, protectAdmin } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { generateCsrfToken, verifyAdminCsrf } = require("../middleware/csrfMiddleware");
const User = require("../models/User");
const Note = require("../models/Note");
const AppError = require("../utils/AppError");

router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Please provide username and password", 400));
    }

    const configUsername = process.env.ADMIN_USERNAME || "admin";
    const configPassword = process.env.ADMIN_PASSWORD || "adminpassword123";

    if (username !== configUsername || password !== configPassword) {
      return next(new AppError("Invalid admin credentials", 401));
    }

    // Generate JWT token for admin
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("jwt", token, cookieOptions);

    // Generate CSRF token specifically for admin session
    const csrfToken = crypto.randomBytes(32).toString("hex");
    const csrfCookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("csrf-token", csrfToken, csrfCookieOptions);

    res.status(200).json({
      message: "Admin logged in successfully",
      csrfToken,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/csrf-token", protectAdmin, generateCsrfToken);

router.get("/all-notes", protectAdmin, verifyAdminCsrf, async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 }).lean();
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
