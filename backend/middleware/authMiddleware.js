const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) return next(new AppError("Not authorized — no token", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return next(new AppError("Not authorized — user not found", 401));

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError("Token invalid or expired", 401));
  }
};

const protectAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return next(new AppError("Forbidden — admin access only", 403));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.admin) {
      return next(new AppError("Forbidden — admin access only", 403));
    }

    req.isAdmin = true;
    req.user = { role: "admin", username: "admin" };
    next();
  } catch (err) {
    return next(new AppError("Forbidden — admin access only", 403));
  }
};

module.exports = { protect, protectAdmin };
