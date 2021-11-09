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
      console.log(addPerson('Amir', '2432242', 7));
    })
    .catch((error) => {
      console.log(error);
      console.log('connection to database failed');
    });
}

async function addPerson(name, number, id) {
  const newPerson = new Person({ name, number, id });
  try {
    const res = await newPerson.save();
    return res;
  } catch (error) {
    return false;
  }
}

// module.exports = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = { init };
