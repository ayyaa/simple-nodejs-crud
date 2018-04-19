const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  email: Joi.string().email().error(new Error('Email is Not Valid.')).required()
})
