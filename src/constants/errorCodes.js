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
  nameMustBeUnique: { message: 'Name must be unique', code: 400 },
};

module.exports = errorCodes;
