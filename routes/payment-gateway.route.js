const express = require('express');
const { checkoutDataSchema } = require('../validators/checkout.validate');
const validate = require('../middleware/validator');
const router = express.Router();
const {checkout, validateTransaction} = require('../services/payment-gateway.service');
const { validateRequestSchema } = require('../validators/transactionRequest.validate');

router.post('/checkout', validate(checkoutDataSchema), checkout);

router.post('/validate-transaction', validate(validateRequestSchema), validateTransaction);

router.get('/webhook', (req, res) => {
  const paymentResult = req.body;

  console.log('Payment Notification:', paymentResult);

  res.status(200).send('OK');
});
module.exports = router;