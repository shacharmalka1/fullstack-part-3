//Stores all error codes
const errorCodes = {
  idParamInvalid: {
    message: 'The ID param was not found or invalid',
    code: 400,
  },
  personNotFound: {
    message: 'The person with the given ID was not found',
    code: 404,
  },
  nameOrNumberMissing: { message: 'The name or number is missing', code: 400 },
  nameAndNumberMustBeUnique: {
    message: 'Name and Number must be unique',
    code: 400,
  },
  notValidMobileNumber: { message: 'Mobile number must be valid', code: 404 },
  validationError: {
    message: 'Validation error - name must be more than 3 letters',
    code: 400,
  },
}

module.exports = errorCodes
