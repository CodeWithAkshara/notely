const mongoose = require("mongoose");
const Note = require("../models/Note");
require("dotenv").config();

async function migrateIsFavorite() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Initialize isFavorite from isPinned for all existing notes
    const result = await Note.updateMany({ isFavorite: { $exists: false } }, [
      { $set: { isFavorite: { $ifNull: ["$isPinned", false] } } },
    ]);

    console.log(
      `Migration complete. Modified: ${result.modifiedCount} documents`,
    );
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrateIsFavorite();
