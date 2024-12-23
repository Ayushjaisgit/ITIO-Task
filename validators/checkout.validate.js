const Joi = require('joi');

const checkoutDataSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  bill_address: Joi.string().min(5).max(100).required(),
  bill_city: Joi.string().min(2).max(50).required(),
  bill_state: Joi.string().min(2).max(50).required(),
  bill_country: Joi.string().min(2).max(10).required(),
  bill_zip: Joi.string().pattern(/^\d{6,}$/).required(),
  bill_phone: Joi.string().pattern(/^\+?\d{10,15}$/).required(),
  bill_email: Joi.string().email().required(),
  bill_amt: Joi.number().positive().required(),
  bill_currency: Joi.string().length(3).required(),
  product_name: Joi.string().min(2).max(100).required(),
});

module.exports = { checkoutDataSchema };
