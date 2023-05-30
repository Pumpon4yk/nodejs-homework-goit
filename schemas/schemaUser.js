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

const email = Joi.object({
  email: Joi.string()
  .pattern(regexpEmail)
  .messages({
    "string.email": "please enter a valid email",
    "any.required": "missing required field email",
  })
  .required()
})

 const schemas = {
  register,
  login,
  subscription,
  email
};

module.exports = schemas