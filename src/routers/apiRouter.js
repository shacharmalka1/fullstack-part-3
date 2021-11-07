const express = require('express');
const errorCodes = require('../constants/errorCodes');
const db = require('../data/db');
const router = express.Router();

//Get request for all people
router.get('/persons', (req, res, next) => {
  try {
    //Send persons in pretty way
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(db.persons, null, 4));
  } catch (error) {
    next(error);
  }
});

//Get request for specific person
router.get('/persons/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
    const person = db.persons.find((p) => p.id === id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
