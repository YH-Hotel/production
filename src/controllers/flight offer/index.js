const { successHandler, errorHandler } = require("../../utils/responseHandler");
const FlightOffer = require("../../model/flightOffer.model");

const flighOfferPOSTAPI = async (req, res, next) => {
  try {
    let { type, title, details, price } = req.body;
    if (!type || !title || !details || !price) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    await FlightOffer.create({
      type,
      title,
      details,
      price,
    });
    return successHandler(res, "Flight offer created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const flighOfferGETAPI = async (req, res, next) => {
  try {
    const flightOffer = await FlightOffer.find().sort({ createdAt: -1 });
    return successHandler(res, "Recent search fetched successfully", 200, {
      flightOffer,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const flighOfferUPDATEAPI = async (req, res, next) => {
  try {
    const { _id, type, title, details, price } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    const findData = await FlightOffer.findById(_id);
    if (!findData) {
      return next(errorHandler(res, "Flight offer not found", 404));
    }
    await FlightOffer.findByIdAndUpdate(_id, {
      type,
      title,
      details,
      price,
    });
    return successHandler(res, "Flight offer updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const flighOfferDELETEAPI = async (req, res, next) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    const findData = await FlightOffer.findById(_id);
    if (!findData) {
      return next(errorHandler(res, "Flight offer not found", 404));
    }
    await FlightOffer.findByIdAndDelete(_id);
    return successHandler(res, "Flight offer deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  flighOfferPOSTAPI,
  flighOfferGETAPI,
  flighOfferDELETEAPI,
  flighOfferUPDATEAPI,
};
