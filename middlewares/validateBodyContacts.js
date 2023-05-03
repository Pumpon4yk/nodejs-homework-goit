const { HttpError } = require('../helpers');

const validateBodyContacts = schema => (req, res, next) => {
  const {body} = req;

  if(Object.keys(body).length === 0) next(HttpError(400, "missing fields")); 
  
  const { error } = schema.validate(body);

  if(error) next(HttpError(400, error.message));

  next()
}

module.exports = validateBodyContacts;