const { successHandler, errorHandler } = require("../../utils/responseHandler");
const BookingHoliday = require("../../model/BookingHoliday");

const AddBookingHoliday = async (req, res, next) => {
  try {
    let {
      location,
      details,
      price,
      name,
      mobileNumber,
      date_of_travel,
      total_memebers,
      payment_status,
      payment_id,
    } = req.body;
    if (
      !location ||
      !details ||
      !price ||
      !name ||
      !mobileNumber ||
      !date_of_travel ||
      !total_memebers ||
      !payment_status ||
      !payment_id
    ) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    mobileNumber = parseInt(mobileNumber);
    price = parseInt(price);
    total_memebers = parseInt(total_memebers);

    await BookingHoliday.create({
      location,
      details,
      price,
      name,
      mobileNumber,
      date_of_travel,
      total_memebers,
      payment_status,
      payment_id,
    });

    return next(successHandler(res, "Booking created successfully", 201));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

const getBookingHoliday = async (req, res, next) => {
  try {
    const booking = await BookingHoliday.find({}).sort({
      createdAt: -1,
    });
    return next(successHandler(res, booking, 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = { AddBookingHoliday, getBookingHoliday };
