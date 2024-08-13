const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Offers = require("../../model/offerPage.model");

const VerifyPOSTAPI = async (req, res, next) => {
  try {
    let { coupen_code, type } = req.body;
    if (!coupen_code || !type) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    const findData = await Offers.findOne({ coupen_code, type });
    if (!findData) {
      return next(errorHandler(res, "Coupen code not found", 404));
    }
    let coupen_data = parseInt(coupen_code.match(/\d+/)[0], 10);
    return successHandler(res, "Coupen code verified successfully", 200, coupen_data);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  VerifyPOSTAPI,
};
