const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Banner = require("../../model/banners.model");

const BannerPOSTAPI = async (req, res, next) => {
  try {
    let { type, url } = req.body;
    if (!type || !url) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await Banner.create({
      type,
      url,
    });

    return successHandler(res, "Banner created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const BannerGETAPI = async (req, res, next) => {
  try {
    let { type } = req.query;
    const findData = await Banner.find({ type }).sort({ createdAt: -1 });
    return successHandler(res, "Banner fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const BannerUPDATEAPI = async (req, res, next) => {
  try {
    let { url, _id } = req.body;
    if (!url || !_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Banner.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Banner not found", 404));
    }

    await Banner.findByIdAndUpdate(findData._id, {
      url,
    });
    return successHandler(res, "Banner updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const BannerDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Banner.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Banner not found", 404));
    }

    await Banner.findByIdAndDelete(findData._id);
    return successHandler(res, "Banner deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  BannerPOSTAPI,
  BannerGETAPI,
  BannerUPDATEAPI,
  BannerDELETEAPI,
};
