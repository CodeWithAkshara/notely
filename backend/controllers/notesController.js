const Note = require("../models/Note");
const AppError = require("../utils/AppError");

const getNotes = async (req, res, next) => {
  try {
    const { search, status, color, isPinned, isFavorite } = req.query;
    const filter = {};

    if (req.user.role === "admin" && req.query.userId) {
      filter.userId = req.query.userId;
    } else {
      filter.userId = req.user._id;
    }

    if (status && ["active", "archived", "trash"].includes(status))
      filter.status = status;

    if (color) filter.color = color;

    if (typeof isPinned !== "undefined") {
      if (isPinned === "true") filter.isPinned = true;
      else if (isPinned === "false") filter.isPinned = false;
    }

    if (typeof isFavorite !== "undefined") {
      if (isFavorite === "true") filter.isFavorite = true;
      else if (isFavorite === "false") filter.isFavorite = false;
    }

    if (search) {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "i");
      filter.$or = [{ title: regex }, { content: regex }];
    }

    const notes = await Note.find(filter)
      .sort({ isPinned: -1, isFavorite: -1, updatedAt: -1 })
      .lean();

    res.json({ count: notes.length, notes });
  } catch (error) {
    next(error);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { title, content, color } = req.body;

    const note = await Note.create({
      title,
      content,
      color,
      userId: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const allowed = [
      "title",
      "content",
      "isPinned",
      "isFavorite",
      "status",
      "color",
    ];

    const updates = {};

    allowed.forEach((k) => {
      if (k in req.body) updates[k] = req.body[k];
    });

    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return next(new AppError("Note not found", 404));
    }

    Object.assign(note, updates);
    await note.save();

    res.json(note);
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return next(new AppError("Note not found", 404));
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    next(error);
  }
};

const deleteAllTrashNotes = async (req, res, next) => {
  try {
    await Note.deleteMany({
      userId: req.user._id,
      status: "trash",
    });

    res.json({
      message: "All trash notes deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  deleteAllTrashNotes,
};
