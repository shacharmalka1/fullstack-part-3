const express = require('express');
const router = express.Router();

const errorCodes = {};
router.use((req, res, next, err) => {
  //Get error and check what type it is, send response to client
  console.log('An error has occured');
  switch (err) {
    default:
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
