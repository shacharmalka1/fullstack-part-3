const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('', (req, res, next) => {
  try {
    // Send back amount of numbers in phonebook with curr date
    const phonebookText = `Phonebook has info for ${db.persons.length} people <br/><br/>`; // <br/> for indentation
    const time = new Date();
    const response = phonebookText + time;
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
