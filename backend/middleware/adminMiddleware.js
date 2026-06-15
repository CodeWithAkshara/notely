const AppError = require("../utils/AppError");

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("Admin access only", 403));
  }
  next();
};

module.exports = { adminOnly };
