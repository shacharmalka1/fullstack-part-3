const express = require('express')
const db = require('../data/mongodb')
const router = express.Router()

router.get('', async (req, res) => {
  const persons = await db.getAllPeople()
  // Send back new page with amount of numbers in phonebook with curr date
  const phonebookText = `Phonebook has info for ${persons.length} people`
  const time = new Date()
  const response = `
    <html>
        <body>
            <h1>
                ${phonebookText}
                <p>${time}</p>
            </h1>
        </body>
    </html>
      `
  res.send(response)
})

module.exports = router
