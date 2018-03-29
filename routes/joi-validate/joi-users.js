const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  uname: Joi.string().min(8).max(30).error(new Error('Username is Not Valid.')).required(),
  pass: Joi.string().min(8).regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('Password is Not Valid.')).required(),
  mail: Joi.string().email().error(new Error('Email is Not Valid.')).required()
})
