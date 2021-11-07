const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('', (req, res) => {
  // Send back new page with amount of numbers in phonebook with curr date
  const phonebookText = `Phonebook has info for ${db.persons.length} people`;
  const time = new Date();
  const response = `
    <html>
        <body>
            <h1>
                ${phonebookText}
                <p>${time}</p>
            </h1>
        </body>
    </html>
      `;
  res.send(response);
});

module.exports = router;
