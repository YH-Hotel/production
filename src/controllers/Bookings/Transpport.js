const { successHandler, errorHandler } = require("../../utils/responseHandler");
const BookingTrans = require("../../model/BookingTrans.model");

const AddBookingTrans = async (req, res, next) => {
  try {
    let {
      to,
      from,
      type,
      departure_date,
      arrival_date,
      departure_date_time,
      arrival_date_time,
      total_passenger,
      guest_details,
      total_amount,
      payment_status,
      payment_id,
      mode_of_payment,
      mobileNumber,
      email,
      date_of_booking,
    } = req.body;
    if (
      !to ||
      !from ||
      !type ||
      !departure_date ||
      !arrival_date ||
      !departure_date_time ||
      !arrival_date_time ||
      !total_passenger ||
      !guest_details ||
      !total_amount ||
      !payment_status ||
      !payment_id ||
      !mode_of_payment ||
      !mobileNumber ||
      !email ||
      !date_of_booking
    ) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    mobileNumber = parseInt(mobileNumber);
    total_passenger = parseInt(total_passenger);
    total_amount = parseInt(total_amount);
    await BookingTrans.create({
      to,
      from,
      type,
      departure_date,
      arrival_date,
      departure_date_time,
      arrival_date_time,
      total_passenger,
      guest_details,
      total_amount,
      payment_status,
      payment_id,
      mode_of_payment,
      mobileNumber,
      email,
      date_of_booking,
    });

    return next(successHandler(res, "Booking created successfully", 201));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

const getBookingTrans = async (req, res, next) => {
  try {
    const booking = await BookingTrans.find({}).sort({ createdAt: -1 });
    return next(successHandler(res, booking, 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = { AddBookingTrans, getBookingTrans };
