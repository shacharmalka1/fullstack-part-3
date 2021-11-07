const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/persons', (req, res, next) => {
  try {
    //Send persons in pretty way
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(db.persons, null, 4));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
