const Joi = require("joi");
const {regexpEmail,regexpPhone} = require("./regexps")

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.name": "please enter a valid name",
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().pattern(regexpEmail).required().messages({
    "string.email": "please enter a valid email",
    "any.required": "missing required email field",
  }),
  phone: Joi.string().pattern(regexpPhone).required().messages({
    "string.pattern.base": "please enter a valid phone",
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({
      "string.pattern.base": "please enter a valid favorite",
      "any.required": "missing field favorite",
    })
    .required(),
});

const schemas = {
  contactsAddSchema,
  updateFavoriteSchema,
};

module.exports = schemas;