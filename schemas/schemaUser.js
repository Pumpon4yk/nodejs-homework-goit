const Joi = require("joi");
const{regexpEmail} = require("./regexps")


const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpEmail).required(),
  password: Joi.string().min(6).required()
});

const login = Joi.object({
  email: Joi.string().pattern(regexpEmail).required(),
  password: Joi.string().min(6).required()
})

const subscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required()
})

 const schemas = {
  register,
  login,
  subscription
};

module.exports = schemas