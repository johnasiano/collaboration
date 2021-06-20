const { Joi } = require('celebrate');

exports.signin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  })
}

exports.googleSignin = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
    content: Joi.object().required(),
  })
}

exports.signup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
  })
}

exports.googleSignup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
    content: Joi.object().required(),
  })
}