const { Joi } = require('celebrate');

exports.create = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    cost: Joi.number().required(),
    qty_to_add: Joi.number().required(),  
    categoryId: Joi.number().required(),
  }),
}

exports.update = {
  body: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
}
exports.delete = {
  body: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
}

exports.suggestion = {
  query: Joi.object().keys({
    suggestion: Joi.string().required(),
  })
}
