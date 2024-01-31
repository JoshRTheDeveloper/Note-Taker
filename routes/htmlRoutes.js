const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// Route to the notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// If no matching route is found, redirect to the homepage
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
