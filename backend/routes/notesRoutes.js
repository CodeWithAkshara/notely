const express = require("express");
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  deleteAllTrashNotes,
} = require("../controllers/notesController");
const { protect } = require("../middleware/authMiddleware");
const { verifyCsrf } = require("../middleware/csrfMiddleware");

router.use(protect);
router.get("/", getNotes);
router.post("/", verifyCsrf, createNote);
router.put("/:id", verifyCsrf, updateNote);
router.delete("/trash/all", verifyCsrf, deleteAllTrashNotes);
router.delete("/:id", verifyCsrf, deleteNote);

module.exports = router;
