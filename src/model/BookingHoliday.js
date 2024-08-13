const mongoose = require("mongoose");

const BookingHolidaySchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    date_of_travel: {
      type: String,
      required: true,
      trim: true,
    },
    total_memebers: {
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
  },
  { timestamps: true }
);

const BookingHoliday = mongoose.model("BookingHoliday", BookingHolidaySchema);

module.exports = BookingHoliday;
