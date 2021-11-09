const mongoose = require('mongoose')
const errorCodes = require('../constants/errorCodes')
const uri = `mongodb+srv://shachar:${process.env.PASSWORD}@cluster0.oriwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const personScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
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
})

const Person = mongoose.model('persons', personScheme)

function init() {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log('connected to database successfully')
    })
    .catch(() => {
      console.log('connection to database failed')
    })
}

async function addPerson(name, number, id) {
  try {
    if (!validatePhoneNumber(number)) return errorCodes.notValidMobileNumber
    const newPerson = new Person({ name, number, id })
    const res = await newPerson.save()
    return res
  } catch (error) {
    if (error._message === 'persons validation failed')
      return errorCodes.validationError
    return false
  }
}

async function getAllPeople() {
  const persons = await Person.find()
  return persons
}

async function getPersonByID(id) {
  try {
    const person = await Person.find({ id })
    if (person.length === 0) return false
    return person[0]
  } catch (error) {
    return false
  }
}

async function deletePersonByID(id) {
  try {
    const res = await Person.deleteOne({ id })
    if (res.deletedCount === 0) return false
    return res
  } catch (error) {
    return false
  }
}

async function editNumberByID(id, number) {
  try {
    if (!validatePhoneNumber(number)) return errorCodes.notValidMobileNumber
    const res = await Person.findOneAndUpdate({ id }, { number }, { new: true })
    return res
  } catch (error) {
    return false
  }
}

function validatePhoneNumber(input_str) {
  // We completely understand what the next line does
  // Wake us up at 3 am and we will tell you (only at 3 am)
  // (Totally not take from stackoverflow)
  // eslint-disable-next-line no-useless-escape
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  return re.test(input_str)
}

module.exports = {
  init,
  getPersonByID,
  getAllPeople,
  addPerson,
  deletePersonByID,
  editNumberByID,
}
