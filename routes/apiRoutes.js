const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Get end Point to recieve notes from database
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// post to create new note
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notes = readNotes();
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// delete note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  let notes = readNotes();
  notes = notes.filter((note) => note.id !== noteId);
  writeNotes(notes);
  res.json({ msg: 'Note deleted successfully' });
});

// read notes in database
function readNotes() {
  const filePath = path.join(__dirname, '../db/db.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// write notes to database
function writeNotes(notes) {
  const filePath = path.join(__dirname, '../db/db.json');
  fs.writeFileSync(filePath, JSON.stringify(notes));
}

module.exports = router;
