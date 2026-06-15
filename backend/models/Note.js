const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, default: "" },
    isPinned: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "archived", "trash"],
      default: "active",
    },
    color: {
      type: String,
      enum: [
        "default",
        "pastel-yellow",
        "pastel-blue",
        "pastel-green",
        "pastel-pink",
        "pastel-purple",
        "pastel-orange",
      ],
      default: "default",
    },
  },
  { timestamps: true },
);

noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);
