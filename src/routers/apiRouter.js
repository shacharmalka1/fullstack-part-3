const express = require('express');
const errorCodes = require('../constants/errorCodes');
const mongoDB = require('../data/mongodb');
const router = express.Router();

//Get request for all people
router.get('/persons', async (req, res) => {
  //Send persons in pretty way
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(await mongoDB.getAllPeople(), null, 4));
});

//Get request for specific person
router.get('/persons/:id', async (req, res) => {
  //Get id param and check validity
  const id = Number(req.params.id);
  if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
  const person = await mongoDB.getPersonByID(id);
  //Return found person in pretty way
  res.header('Content-Type', 'application/json');
  res.send(JSON.stringify(person, null, 4));
});

router.delete('/persons/:id', async (req, res) => {
  //Get id param and check validity
  const id = Number(req.params.id);
  if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
  //Get person
  const resp = await mongoDB.deletePersonByID(id);
  const message = !!resp
    ? `Person with id: ${id} succesfully deleted`
    : `Could not delete person`;
  res.json({ message });
});

router.post('/persons/', async (req, res, next) => {
  try {
    //Generate new unique ID
    const newID = generateRandomID();
    //Extract name and number and check validity
    const { name, number } = req.body;
    if (!name || !number) throw errorCodes.nameOrNumberMissing;
    //Add new person
    const person = await mongoDB.addPerson(name, number, newID);
    if (!person) throw errorCodes.nameMustBeUnique;
    res.json({ message: `Person was added with id ${newID}` });
  } catch (error) {
    next(error);
  }
});

function generateRandomID() {
  // Generate random ID
  let id;
  id = Math.floor(Math.random() * (99999999 - 0));
  return id;
}

module.exports = router;
