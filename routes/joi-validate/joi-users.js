const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  uname: Joi.error(new Error('Username is required.')).required(),
  uname: Joi.string().min(8).max(30).error(new Error('Username is invalid.')),
  mail: Joi.string().email().error(new Error('Email is invalid.')).required(),
  pass: Joi.string().min(8).error(new Error('Password is invalid.')).required(),
})
