const mongoose = require("mongoose");

const BookingHotelSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    room_type: {
      type: String,
      required: true,
      trim: true,
    },
    check_in: {
      type: String,
      required: true,
      trim: true,
    },
    check_out: {
      type: String,
      required: true,
      trim: true,
    },
    total_room: {
      type: Number,
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
    add_ons: {
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
      type: Number,
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
    passenger_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const BookingHotel = mongoose.model("BookingHotel", BookingHotelSchema);

module.exports = BookingHotel;
