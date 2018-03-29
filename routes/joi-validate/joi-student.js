const baseJoi = require('joi');
const extens = require('joi-date-extensions');
const Joi = baseJoi.extend(extens);

module.exports = Joi.object().keys({
  name: Joi.string().error(new Error('Name is required.')).required(),
  address: Joi.string().error(new Error('address is required.')).required(),
  date_of_birth: Joi.date().format('YYYY-MM-DD').error(new Error('date of birth invalid.')).required(),
  email_student: Joi.string().email().error(new Error('Email invalid.')).required(),
  gender: Joi.required(),
  age: Joi.number().min(18).required().error(new Error('you are is under 18 years old'))
})
