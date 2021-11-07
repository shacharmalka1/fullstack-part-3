const errorCodes = require('../constants/errorCodes');

const errorHandler = (err, req, res, next) => {
  //Get error and check what type it is, send response to client
  console.log('An error has occured');
  switch (err) {
    case errorCodes.idParamInvalid:
      res.status(400).send(errorCodes.idParamInvalid);
      break;
    case errorCodes.personNotFound:
      res.status(404).send(errorCodes.personNotFound);
      break;
    default:
      res.status(500).send(err.message);
  }
};

module.exports = errorHandler;
