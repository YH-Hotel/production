const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Supports = require("../../model/supports.model");

const SupportsPOSTAPI = async (req, res, next) => {
  try {
    let { name, email, mobileNumber, query } = req.body;
    if (!name || !email || !mobileNumber || !query) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    mobileNumber = parseInt(mobileNumber);
    await Supports.create({
      name,
      email,
      mobileNumber,
      query,
    });

    return successHandler(res, "Supports created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const SupportsGETAPI = async (req, res, next) => {
  try {
    let { status } = req.query;
    if (!status) {
      return next(errorHandler(res, "Please enter status", 400));
    }
    const findData = await Supports.find({ status }).sort({ createdAt: -1 });
    return successHandler(res, "Supports fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const SupportsUPDATEAPI = async (req, res, next) => {
  try {
    let { _id, status } = req.body;
    if (!_id || !status) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Supports.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Supports not found", 404));
    }

    await Supports.findByIdAndUpdate(findData._id, {
      status,
    });
    return successHandler(res, "Supports updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const SupportsDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Supports.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Supports not found", 404));
    }

    await Supports.findByIdAndDelete(findData._id);
    return successHandler(res, "Supports deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  SupportsPOSTAPI,
  SupportsGETAPI,
  SupportsUPDATEAPI,
  SupportsDELETEAPI,
};
