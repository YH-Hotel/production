const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Offers = require("../../model/offerPage.model");

const OffersPOSTAPI = async (req, res, next) => {
  try {
    let { validity, type, coupen_code, description } = req.body;
    if (!validity || !type || !coupen_code || !description) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await Offers.create({
      validity,
      type,
      coupen_code,
      description
    });

    return successHandler(res, "Offers created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const OffersGETAPI = async (req, res, next) => {
  try {
    let { type } = req.query;
    if (!type) {
      return next(
        errorHandler(res, "Please provide type in query params", 400)
      );
    }
    const findData = await Offers.find({ type }).sort({ createdAt: -1 });
    return successHandler(res, "Offers fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const OffersUPDATEAPI = async (req, res, next) => {
  try {
    let { validity, _id, coupen_code, description } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Offers.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Offers not found", 404));
    }

    await Offers.findByIdAndUpdate(findData._id, {
      validity,
      coupen_code,
      description,
    });
    return successHandler(res, "Offers updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const OffersDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Offers.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Offers not found", 404));
    }

    await Offers.findByIdAndDelete(findData._id);
    return successHandler(res, "Offers deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  OffersPOSTAPI,
  OffersGETAPI,
  OffersUPDATEAPI,
  OffersDELETEAPI,
};
