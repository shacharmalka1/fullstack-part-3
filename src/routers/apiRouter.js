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
    //Get id param and check validity
    const id = Number(req.params.id);
    if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
    const person = getPersonByID(id);
    //Return found person in pretty way
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(person, null, 4));
  } catch (error) {
    next(error);
  }
});

router.delete('/persons/:id', (req, res, next) => {
  //Get id param and check validity
  const id = Number(req.params.id);
  if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
  //Get person
  const person = getPersonByID(id);
  db.persons = db.persons.filter((p) => p != person);
  res.send(`Person with id: ${id} succesfully deleted`);
});

function getPersonByID(id) {
  //Find person with same id
  const person = db.persons.find((p) => p.id === id);
  //Throw error if person not found
  if (!person) throw errorCodes.personNotFound;
  return person;
}

module.exports = router;
