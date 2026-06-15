const jwt = require("jsonwebtoken");

const generateToken = (res, userId, role) => {
  const payload = { userId, role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.cookie("jwt", token, cookieOptions);
  return token;
};

module.exports = generateToken;
