const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
      trim: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
      trim: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Payments = mongoose.model("Payments", PaymentSchema);

module.exports = Payments;
