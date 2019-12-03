const Joi = require('@hapi/joi');

const city = Joi.object({
    cityName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})

module.exports = city;