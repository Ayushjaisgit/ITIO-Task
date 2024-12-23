const axios = require("axios");
require("dotenv").config({ path: ".env" });

const checkout = async (req, res) => {
  const {
    fullname,
    bill_address,
    bill_city,
    bill_state,
    bill_country,
    bill_zip,
    bill_phone,
    bill_email,
    bill_amt,
    bill_currency,
    product_name,
  } = req.body;

  console.log("bill_amt", typeof bill_amt);

  const paymentData = {
    fullname: fullname,
    bill_address: bill_address,
    bill_city: bill_city,
    bill_state: bill_state,
    bill_country: bill_country,
    bill_zip: bill_zip,
    bill_phone: bill_phone,
    bill_email: bill_email,
    bill_amt: bill_amt,
    bill_currency: bill_currency,
    product_name: product_name,
    retrycount: 5,
    source_url: "http://localhost:3000",
    webhook_url: "http://localhost:3000/webhook",
    return_url: "http://localhost:3000/return",
    checkout_url: "http://localhost:3000/checkout",
    public_key: process.env.PAYWB_PUBLIC_KEY,
    terno: process.env.PAYWB_TERMINAL_NUMBER,
  };

  try {
    const response = await axios.post(
      process.env.PAYMENT_API_URL,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    if (response.data.order_status === 1) {
      res.redirect(response.data.checkout_url);
    } else {
      res.redirect(response.data.return_url);
    }
  } catch (error) {
    console.error(
      "Payment API Error Response:",
      error.response?.data || error.message
    );
    res.status(500).send("Payment processing failed");
  }
};
exports.checkout = checkout;

const validateTransaction = async (req, res) => {
  const { reference, transID } = req.data;

  try {
    let paymentData = {
      public_key: process.env.PAYWB_PUBLIC_KEY,
    };
    if (reference !== "") {
      paymentData.reference = reference;
    } else {
      paymentData.transID = transID;
    }

    const response = await axios.get(
      process.env.REQUEST_TRANSACTION_API_URL,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `API Error: ${error.response.data.message || error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error("No response received from the external API");
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
};
exports.validateTransaction = validateTransaction;
