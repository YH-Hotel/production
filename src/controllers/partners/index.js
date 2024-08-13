const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Partners = require("../../model/partners.model");

const PartnersPOSTAPI = async (req, res, next) => {
  try {
    let { image } = req.body;

    if (!image) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await Partners.create({
      image,
    });

    return successHandler(res, "Partners created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const PartnersGETAPI = async (req, res, next) => {
  try {
    let findData = await Partners.find({}).sort({ createdAt: -1 });
    return successHandler(res, "Partners fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const PartnersDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    await Partners.findByIdAndDelete({ _id });
    return successHandler(res, "Partners deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  PartnersPOSTAPI,
  PartnersGETAPI,
  PartnersDELETEAPI,
};
