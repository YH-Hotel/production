const { successHandler, errorHandler } = require("../../utils/responseHandler");
const MyTrip = require("../../model/myTrip.model");

const MyTripPOSTAPI = async (req, res, next) => {
  try {
    let {
      to,
      from,
      dateOfBooking,
      serviceType,
      amount,
      passengerName,
      mobileNumber,
      email,
      transactionId,
      modeofPayment,
    } = req.body;

    if (
      !to ||
      !from ||
      !dateOfBooking ||
      !serviceType ||
      !amount ||
      !passengerName ||
      !mobileNumber ||
      !email ||
      !transactionId ||
      !modeofPayment
    ) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    mobileNumber = parseInt(mobileNumber);

    await MyTrip.create({
      to,
      from,
      dateOfBooking,
      serviceType,
      amount,
      passengerName,
      mobileNumber,
      email,
      transactionId,
      modeofPayment,
    });

    return successHandler(res, "MyTrip created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const MyTripGETAPI = async (req, res, next) => {
  try {
    let { email } = req.query;
    if (!email) {
      return next(errorHandler(res, "Please enter email", 400));
    }
    const findData = await MyTrip.find({ email }).sort({
      createdAt: -1,
    });
    return successHandler(res, "MyTrip fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  MyTripPOSTAPI,
  MyTripGETAPI,
};
