const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Please provide username and password", 400));
    }

    if (password.length < 6) {
      return next(
        new AppError("Password must be at least 6 characters long", 400),
      );
    }

    const existing = await User.findOne({ username });

    if (existing) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({ username, password });

    generateToken(res, user._id, user.role);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(new AppError("Please provide username and password", 400));
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    generateToken(res, user._id, user.role);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Logged out",
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
};
