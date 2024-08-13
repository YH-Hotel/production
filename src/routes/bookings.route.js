const express = require("express");
const {
  AddBookingHotel,
  getBookingHotel,
} = require("../controllers/Bookings/Hotel");
const {
  AddBookingTrans,
  getBookingTrans,
} = require("../controllers/Bookings/Transpport");
const {
  AddBookingHoliday,
  getBookingHoliday,
} = require("../controllers/Bookings/Holiday");
const {
  AddBookingYH,
  getBookingYH,
} = require("../controllers/Bookings/YHotel");
const { AddPayment, getPayment } = require("../controllers/Bookings/PaymentsR");

const booking_router = express.Router();

// Hotel
booking_router.post("/api/v1/post-hotel-booking", AddBookingHotel);
booking_router.get("/api/v1/get-hotel-total", getBookingHotel);

// Transport
booking_router.post("/api/v1/post-trans-booking", AddBookingTrans);
booking_router.get("/api/v1/get-trans-total", getBookingTrans);

// YH Holiday
booking_router.post("/api/v1/post-holiday-booking", AddBookingHoliday);
booking_router.get("/api/v1/get-holiday-total", getBookingHoliday);

// YH Hotel
booking_router.post("/api/v1/post-yh-booking", AddBookingYH);
booking_router.get("/api/v1/get-yh-total", getBookingYH);

// Payments
booking_router.post("/api/v1/post-payment", AddPayment);
booking_router.get("/api/v1/get-payment", getPayment);

module.exports = booking_router;
