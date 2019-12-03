const Joi = require('@hapi/joi');

const user = Joi.object({
    login: Joi.string()
        .required(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    surname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .required(),
    cityId: Joi.required()
})

module.exports = user;