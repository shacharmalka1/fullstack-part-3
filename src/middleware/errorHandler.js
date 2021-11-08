const errorCodes = require('../constants/errorCodes');

const errorHandler = (err, req, res, next) => {
  //Get error and check what type it is, send response to client
  for (const error in errorCodes) {
    if (error === err)
      return res.status(error.code).json({ error: error.message });
  }
  res.status(500).json({ error: err.message });
};

module.exports = errorHandler;
