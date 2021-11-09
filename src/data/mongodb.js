const mongoose = require('mongoose');
const errorCodes = require('../constants/errorCodes');
const uri = `mongodb+srv://amirmongo:${process.env.PASSWORD}@cluster0.usl1e.mongodb.net/phonebook?retryWrites=true&w=majority`;
const personScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Person = mongoose.model('persons', personScheme);

function init() {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log('connected to database successfully');
    })
    .catch((error) => {
      console.log('connection to database failed');
    });
}

async function addPerson(name, number, id) {
  try {
    if (!validatePhoneNumber(number)) return errorCodes.notValidMobileNumber;
    const newPerson = new Person({ name, number, id });
    const res = await newPerson.save();
    return res;
  } catch (error) {
    return false;
  }
}

async function getAllPeople() {
  const persons = await Person.find();
  return persons;
}

async function getPersonByID(id) {
  try {
    const person = await Person.find({ id });
    if (person.length === 0) return false;
    return person[0];
  } catch (error) {
    return false;
  }
}

async function deletePersonByID(id) {
  try {
    const res = await Person.deleteOne({ id });
    if (res.deletedCount === 0) return false;
    return res;
  } catch (error) {
    return false;
  }
}

function validatePhoneNumber(input_str) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(input_str);
}
// module.exports = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = {
  init,
  getPersonByID,
  getAllPeople,
  addPerson,
  deletePersonByID,
};
