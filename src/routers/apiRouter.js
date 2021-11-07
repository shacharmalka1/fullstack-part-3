const express = require('express');
const errorCodes = require('../constants/errorCodes');
const db = require('../data/db');
const router = express.Router();

//Get request for all people
router.get('/persons', (req, res) => {
  //Send persons in pretty way
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(db.persons, null, 4));
});

//Get request for specific person
router.get('/persons/:id', (req, res) => {
  //Get id param and check validity
  const id = Number(req.params.id);
  if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
  const person = getPersonByID(id);
  //Return found person in pretty way
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(person, null, 4));
});

router.delete('/persons/:id', (req, res) => {
  //Get id param and check validity
  const id = Number(req.params.id);
  if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
  //Get person
  const person = getPersonByID(id);
  db.persons = db.persons.filter((p) => p != person);
  res.send(`Person with id: ${id} succesfully deleted`);
});

router.post('/persons/', (req, res) => {
  const newID = generateRandomID();
  const { name, number } = req.body;
  if (!name || !number) throw errorCodes.nameOrNumberMissing;
  const nameExists = valueExistsInPersons('name', name);
  if (nameExists) throw errorCodes.nameMustBeUnique;
  const person = { id: newID, name, number };
  db.persons.push(person);
  res.send(`Person was added with id ${newID}`);
});

function getPersonByID(id) {
  //Find person with same id
  const person = db.persons.find((p) => p.id === id);
  //Throw error if person not found
  if (!person) throw errorCodes.personNotFound;
  return person;
}

function generateRandomID() {
  let id;
  do {
    id = Math.floor(Math.random() * (99999999 - 0));
  } while (valueExistsInPersons('id', id));
  return id;
}

function valueExistsInPersons(param, value) {
  const person = db.persons.find((p) => p[param] === value);
  return !!person;
}

module.exports = router;
