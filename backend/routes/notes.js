const express = require("express");
const fetchUser = require("../middleware/fetch_user");
const Notes = require("../models/Notes");
const router = express.Router();

// --------------Fetch User Notes --------------------
// fetching the user notes associated with a particular user
router.get("/", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    // console.log(notes);
    res.json(notes);
    // res.send('<h1 align = "center">Hi welcome to Jumbo Notes ...</h1>');
  } catch (error) {
    return res.status(500).send("Internal server error occured");
  }
});

// -------------------- Create Notes -----------------------
// creating notes for user associated with user
router.post("/create-note", fetchUser, async (req, res) => {
  try {
    note = await Notes.create({
      user: req.user,
      title: req.body.title,
      note: req.body.note,
      tag: req.body.tag,
    });
    res.send(note);
  } catch (error) {
    return res.status(500).send("Internal server error occured");
  }
});

// -------------------- Update Notes -----------------------
// Updating notes for user associated with that note
router.post("/update/:id", fetchUser, async (req, res) => {
  const { title, note, tag } = req.body;
  const temp_note = {};
  if (title) {
    temp_note.title = title;
  }
  if (note) {
    temp_note.note = note;
  }
  if (tag) {
    temp_note.tag = tag;
  }

  // Find a note which is requested to be updated
  const requested_note = await Notes.findById(req.params.id);
  if (!requested_note) {
    return res.status(404).send("Requested note doesnot exists");
  }
  if (requested_note.user.toString() != req.user) {
    return res.status(404).send("Unautherized");
  }
  const updated_note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: temp_note },
    { new: true }
  );
  res.json(updated_note);
});

// -------------------- Delete Notes -----------------------
// Deleting notes for user associated with that note
router.post("/delete/:id", fetchUser, async (req, res) => {
  // Find a note which is requested to be updated
  const requested_note = await Notes.findById(req.params.id);
  if (!requested_note) {
    return res.status(404).send("Requested note doesnot exists");
  }
  if (requested_note.user.toString() != req.user) {
    return res.status(404).send("Unautherized");
  }
  const deleted_note = await Notes.findByIdAndDelete(req.params.id);
  res.json(deleted_note);
});

module.exports = router;
