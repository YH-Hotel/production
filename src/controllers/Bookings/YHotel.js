const { successHandler, errorHandler } = require("../../utils/responseHandler");
const BookingYH = require("../../model/BookingYH");

const AddBookingYH = async (req, res, next) => {
  try {
    let { type, hotelName, mobileNumber, name, price, location } = req.body;
    if (!type || !hotelName || !mobileNumber || !name || !price || !location) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    mobileNumber = parseInt(mobileNumber);
    price = parseInt(price);
    await BookingYH.create({
      type,
      hotelName,
      mobileNumber,
      name,
      price,
      location,
    });

    return next(successHandler(res, "Booking created successfully", 201));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

const getBookingYH = async (req, res, next) => {
  try {
    const booking = await BookingYH.find({ type: req.query.type }).sort({
      createdAt: -1,
    });
    return next(successHandler(res, booking, 200));
  } catch (error) {
    console.log("error", error.message);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = { AddBookingYH, getBookingYH };
