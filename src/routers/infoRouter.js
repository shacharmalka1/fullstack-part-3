const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('', (req, res, next) => {
  try {
    const phonebookText = `Phonebook has info for ${db.persons.length} people <br/><br/>`;
    const time = new Date();
    const response = phonebookText + time;
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
