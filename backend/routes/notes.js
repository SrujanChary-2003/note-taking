const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { content } = req.body;
  const note = new Note({ content, userId: req.user.id });
  await note.save();
  res.json(note);
});

router.get("/", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id }).populate();
  res.json(notes);
});
router.get("/:id", authMiddleware, async (req, res) => {
  const notes = await Note.findById(req.params.id);
  res.json(notes);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { content } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { content },
      { new: true }
    );

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
