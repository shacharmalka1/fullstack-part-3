const errorCodes = require('../constants/errorCodes')

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  //Get error and check what type it is, send response to client
  for (const error in errorCodes) {
    if (errorCodes[error].message === err.message) {
      return res
        .status(errorCodes[error].code)
        .json({ error: errorCodes[error].message })
    }
  }
  res.status(500).json({ error: err.message })
}

module.exports = errorHandler
