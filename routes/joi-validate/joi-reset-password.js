const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  pass: Joi.string().min(8).error(new Error('Password is invalid.')).required(),
  confirm: Joi.string().min(8).error(new Error('Confirm password is invalid')).required()
})
