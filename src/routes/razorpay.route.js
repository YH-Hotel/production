const express = require("express");
const {
  addPaymentUser,
  payments,
  getKey,
} = require("../controllers/razor pay");

const razorpay_router = express.Router();

razorpay_router.post("/api/v1/createorder", addPaymentUser);
razorpay_router.post("/api/v1/payments", payments);
razorpay_router.post("/api/v1/getKey", getKey);

module.exports = razorpay_router;
