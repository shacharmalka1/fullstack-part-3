const mongoose = require('mongoose');
const uri = `mongodb+srv://amirmongo:${process.env.PASSWORD}@cluster0.usl1e.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

const Person = mongoose.model('persons', personScheme);

function init() {
  console.log(uri);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log('connected to database successfully');
    })
    .catch((error) => {
      console.log(error);
      console.log('connection to database failed');
    });
}

async function addPerson(name, number, id) {
  try {
    // if (await checkName(name)) return false;
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

// module.exports = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = {
  init,
  getPersonByID,
  getAllPeople,
  addPerson,
  deletePersonByID,
};
