const errorCodes = require('../constants/errorCodes');
const express = require('express');
const router = express.Router();

router.use((req, res, next, err) => {
  //Get error and check what type it is, send response to client
  console.log('An error has occured');
  switch (err.message) {
    case errorCodes.idParamInvalid:
      res.status(400).json({ message: errorCodes.idParamInvalid });
      break;
    case errorCodes.personNotFound:
      res.status(404).json({ message: errorCodes.personNotFound });
    default:
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
