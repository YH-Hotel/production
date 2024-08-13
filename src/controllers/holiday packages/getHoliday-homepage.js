const { successHandler, errorHandler } = require("../../utils/responseHandler");
const TopDestination = require("../../model/topDestination.model");

const TopDestinationPOSTAPI = async (req, res, next) => {
  try {
    let { country, city, image } = req.body;
    if (!country || !city || !image) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await TopDestination.create({
      country,
      city,
      image,
    });
    return successHandler(res, "Top Destination created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TopDestinationGETAPI = async (req, res, next) => {
  try {
    const topDestination = await TopDestination.find().sort({ createdAt: -1 });
    return successHandler(res, "Top Destination fetched successfully", 200, {
      topDestination,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TopDestinationDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await TopDestination.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Data not found", 404));
    }

    await TopDestination.findByIdAndDelete(findData._id);
    return successHandler(res, "Data deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TopDestinationUPDATEAPI = async (req, res, next) => {
  try {
    let { _id, country, city, image } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter ID", 400));
    }

    const findData = await TopDestination.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Data not found", 404));
    }

    await TopDestination.findByIdAndUpdate(findData._id, {
      country,
      city,
      image,
    });
    return successHandler(res, "Data updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  TopDestinationPOSTAPI,
  TopDestinationGETAPI,
  TopDestinationDELETEAPI,
  TopDestinationUPDATEAPI,
};
