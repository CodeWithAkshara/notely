const crypto = require("crypto");
const AppError = require("../utils/AppError");

const generateCsrfToken = (req, res) => {
  const token = crypto.randomBytes(32).toString("hex");
  const cookieOptions = {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.cookie("csrf-token", token, cookieOptions);
  res.json({ csrfToken: token });
};

const verifyCsrf = (req, res, next) => {
  const method = req.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) return next();
  const headerToken = req.headers["x-csrf-token"];
  const cookieToken = req.cookies["csrf-token"];
  if (!headerToken || !cookieToken)
    return next(new AppError("CSRF token missing", 403));
  try {
    const a = Buffer.from(headerToken);
    const b = Buffer.from(cookieToken);
    if (a.length !== b.length)
      return next(new AppError("CSRF token invalid", 403));
    if (!crypto.timingSafeEqual(a, b))
      return next(new AppError("CSRF token invalid", 403));
    next();
  } catch (err) {
    return next(new AppError("CSRF token invalid", 403));
  }
};

const verifyAdminCsrf = (req, res, next) => {
  const headerToken = req.headers["x-csrf-token"];
  const cookieToken = req.cookies["csrf-token"];
  if (!headerToken || !cookieToken)
    return next(new AppError("CSRF token missing", 403));
  try {
    const a = Buffer.from(headerToken);
    const b = Buffer.from(cookieToken);
    if (a.length !== b.length)
      return next(new AppError("CSRF token invalid", 403));
    if (!crypto.timingSafeEqual(a, b))
      return next(new AppError("CSRF token invalid", 403));
    next();
  } catch (err) {
    return next(new AppError("CSRF token invalid", 403));
  }
};

module.exports = { generateCsrfToken, verifyCsrf, verifyAdminCsrf };
