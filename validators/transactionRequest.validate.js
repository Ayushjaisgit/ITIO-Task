const Joi = require('joi');

const validateRequestSchema = Joi.object({
  reference: Joi.string().optional().label("Order Number"),
  transID: Joi.string().optional().label("Transaction ID"),
}).or('reference', 'transID').label("Validation Request");

module.exports = { validateRequestSchema };
