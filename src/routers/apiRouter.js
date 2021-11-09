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

router.put('/persons/:id', async (req, res, next) => {
  try {
    //Get id param and check validity
    const id = Number(req.params.id);
    if (!id || typeof id != 'number') throw errorCodes.idParamInvalid;
    //Extract name and number and check validity
    const { number } = req.body;
    if (!number) throw errorCodes.nameOrNumberMissing;
    // Request edit
    const person = await mongoDB.editNumberByID(id, number);
    if (!person) throw errorCodes.validationError;
    if (person === errorCodes.notValidMobileNumber)
      throw errorCodes.notValidMobileNumber;
    res.json({ message: `Person was added with nae number ${number}` });
  } catch (error) {
    next(error);
  }
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
    if (!person) throw errorCodes.nameAndNumberMustBeUnique;
    if (person === errorCodes.notValidMobileNumber)
      throw errorCodes.notValidMobileNumber;
    else if (person === errorCodes.validationError)
      throw errorCodes.validationError;
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
