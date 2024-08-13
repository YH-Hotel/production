const mongoose = require("mongoose");

const BookingTransSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    departure_date: {
      type: String,
      required: true,
      trim: true,
    },
    arrival_date: {
      type: String,
      required: true,
      trim: true,
    },
    departure_date_time: {
      type: String,
      required: true,
      trim: true,
    },
    arrival_date_time: {
      type: String,
      required: true,
      trim: true,
    },
    total_passenger: {
      type: Number,
      required: true,
      trim: true,
    },
    guest_details: {
      type: [],
      required: true,
      trim: true,
    },
    total_amount: {
      type: Number,
      required: true,
      trim: true,
    },
    payment_status: {
      type: String,
      required: true,
      trim: true,
    },
    payment_id: {
      type: String,
      required: true,
      trim: true,
    },
    mode_of_payment: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    date_of_booking: {
      type: String,
      required: true,
      trim: true,
    },
    passengerName: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const BookingTrans = mongoose.model("BookingTrans", BookingTransSchema);

module.exports = BookingTrans;
