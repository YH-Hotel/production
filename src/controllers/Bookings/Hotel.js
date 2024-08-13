const { successHandler, errorHandler } = require("../../utils/responseHandler");
const BookingHotel = require("../../model/BookingHotel");

const AddBookingHotel = async (req, res, next) => {
  try {
    let {
      hotelName,
      location,
      room_type,
      check_in,
      check_out,
      total_room,
      total_passenger,
      guest_details,
      add_ons,
      total_amount,
      payment_status,
      payment_id,
      mode_of_payment,
      mobileNumber,
      email,
      date_of_booking,
    } = req.body;
    if (
      !hotelName ||
      !location ||
      !room_type ||
      !check_in ||
      !check_out ||
      !total_room ||
      !total_passenger ||
      !guest_details ||
      !add_ons ||
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
    total_room = parseInt(total_room);
    total_passenger = parseInt(total_passenger);
    total_amount = parseInt(total_amount);
    await BookingHotel.create({
      hotelName,
      location,
      room_type,
      check_in,
      check_out,
      total_room,
      total_passenger,
      guest_details,
      add_ons,
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

const getBookingHotel = async (req, res, next) => {
  try {
    const booking = await BookingHotel.find({}).sort({ createdAt: -1 });
    return next(successHandler(res, booking, 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = { AddBookingHotel, getBookingHotel };
