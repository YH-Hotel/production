const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Description = require("../../model/description.model");

const DescriptionPOSTAPI = async (req, res, next) => {
  try {
    const { data } = req.body;
    if (!data) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    await Description.create({
      data,
    });
    return successHandler(res, "Description created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const DescriptionGETAPI = async (req, res, next) => {
  try {
    const topDestination = await Description.find();
    return successHandler(res, "Description fetched successfully", 200, {
      topDestination,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const DescriptionUpdateAPI = async (req, res, next) => {
  try {
    const { data, _id } = req.body;
    if (!data) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    await Description.findByIdAndUpdate(_id, {
      data,
    });
    return successHandler(res, "Description updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};
module.exports = {
  DescriptionPOSTAPI,
  DescriptionGETAPI,
  DescriptionUpdateAPI
};
