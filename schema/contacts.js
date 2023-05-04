const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string()
    .required()
    .messages({
        'string.name':'please enter a valid name',
        'any.required':'missing required name field',
    }),
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'please enter a valid email',
        'any.required': 'missing required email field',
    }),
    phone: Joi.string().pattern(/^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/)
    .required()
    .messages({
        'string.pattern.base': 'please enter a valid phone',
        'any.required': 'missing required phone field',
    }),
})

module.exports = contactsSchema;