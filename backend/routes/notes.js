const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/notes");
const { query, validationResult, body } = require("express-validator");

//ROUTE 1: get all notes using: GET "api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id }); //fetch all notes where user = current logged in user
  res.json(notes);
});

//ROUTE 2: add notes using: POST "api/notes/addnotes". Login required
router.post(
  "/addnotes",
  fetchuser,
  [
    //validate using express validator so no one can store empty notes in the server
    body("title", "please enter title").exists(),
    body("description", "Content cannot be empty").exists(),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body; //deconstructing the body and storing the data in their respective variables
    const errors = validationResult(req);
    //check if there are errors with the fields
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error occured");
    }
  }
);

//ROUTE 3: update note using: POST "api/notes/updatenote". Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "please enter title").exists(),
    body("description", "Content cannot be empty").exists(),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //destructuring

      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      //create a newNote object which will store the new note's data
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      let note = await Notes.findById(req.params.id); //id of the current note that we get from /updatenote/:id
      if (!note)
        // if the current note doesn't exist
        return res.status(404).send("note not found");
      if (note.user.toString() !== req.user.id)
        // if the current user is not the owner of the note
        return res.status(401).send("not allowed");

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error occured");
    }
  }
);

//ROUTE 4: delete note using: POST "api/notes/deletenote". Login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  [
    body("title", "please enter title").exists(),
    body("description", "Content cannot be empty").exists(),
  ],
  async (req, res) => {
    try {

      // find the note to be deleted and delete it
      let note = await Notes.findById(req.params.id); //id of the current note that we get from /updatenote/:id
      if (!note)
        // if the current note doesn't exist
        return res.status(404).send("not found");
      // allow deletetion if only the user is the owner of the
      if (note.user.toString() !== req.user.id)
        return res.status(401).send("not allowed");

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ success: "note has been deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error occured");
    }
  }
);
module.exports = router;
