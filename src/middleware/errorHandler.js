const errorCodes = require('../constants/errorCodes');

const errorHandler = (err, req, res, next) => {
  //Get error and check what type it is, send response to client
  switch (err) {
    case errorCodes.idParamInvalid:
      res.status(400).json({ error: errorCodes.idParamInvalid });
      break;
    case errorCodes.personNotFound:
      res.status(404).json({ error: errorCodes.personNotFound });
      break;
    case errorCodes.nameOrNumberMissing:
      res.status(400).json({ error: errorCodes.nameOrNumberMissing });
      break;
    case errorCodes.nameMustBeUnique:
      res.status(400).json({ error: errorCodes.nameMustBeUnique });
      break;
    default:
      res.status(500).json({ error: err.message });
  }
};

module.exports = errorHandler;
