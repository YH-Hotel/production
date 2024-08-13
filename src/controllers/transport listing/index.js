const { successHandler, errorHandler } = require("../../utils/responseHandler");
const TransportListing = require("../../model/transportlist.model");

const TransportListingPOSTAPI = async (req, res, next) => {
  try {
    let {
      type,
      from,
      to,
      startTime,
      endTime,
      date,
      price,
      day,
      duration,
      month,
      year,
      service_fee
    } = req.body;

    if (
      !type ||
      !from ||
      !to ||
      !startTime ||
      !endTime ||
      !date ||
      !price ||
      !day ||
      !duration ||
      !month ||
      !year ||
      !service_fee
    ) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    price = price && !isNaN(price) ? parseInt(price) : null;
    service_fee = parseInt(service_fee);
    await TransportListing.create({
      type: type.toLowerCase(),
      from: from.toLowerCase(),
      to: to.toLowerCase(),
      startTime,
      endTime,
      date,
      price,
      day,
      duration,
      month: month.toLowerCase(),
      year,
      service_fee
    });

    return successHandler(res, "Transport listing created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TransportListingGETAPI = async (req, res, next) => {
  try {
    let { type, from, to, date, month, year } = req.query;
    const findData = await TransportListing.find({
      type,
      from: from.toLowerCase(),
      to: to.toLowerCase(),
      date,
      month: month.toLowerCase(),
      year,
    }).sort({ createdAt: -1 });

    return successHandler(res, "Transport listing fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TransportListingGETAllAPI = async (req, res, next) => {
  try {
    const findData = await TransportListing.find({}).sort({ createdAt: -1 });
    return successHandler(res, "Transport listing fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
}

const TransportListingDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    const findData = await TransportListing.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Transport listing not found", 404));
    }

    await TransportListing.findByIdAndDelete(findData._id);
    return successHandler(res, "Transport listing deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TransportListingUpdateAPI = async (req, res, next) => {
  try {
    let {
      _id,
      type,
      from,
      to,
      startTime,
      endTime,
      date,
      price,
      day,
      duration,
      month,
      year,
      service_fee
    } = req.body;
    let findData = await TransportListing.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Transport listing not found", 404));
    }

    await TransportListing.findByIdAndUpdate(findData._id, {
      type,
      from,
      to,
      startTime,
      endTime,
      date,
      price,
      day,
      duration,
      month,
      year,
      service_fee
    });
    return successHandler(res, "Transport listing updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  TransportListingPOSTAPI,
  TransportListingGETAPI,
  TransportListingDELETEAPI,
  TransportListingUpdateAPI,
  TransportListingGETAllAPI
};
