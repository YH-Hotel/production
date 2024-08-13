const { successHandler, errorHandler } = require("../../utils/responseHandler");
const TrendingGateway = require("../../model/trendingGateway.model");

const TrendingGatewayPOSTAPI = async (req, res, next) => {
  try {
    let { title, count, image1, image2, image3 } = req.body;
    if (!title || !count || !image1 || !image2 || !image3) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await TrendingGateway.create({
      title,
      description: `${count} properties available`,
      image1,
      image2,
      image3,
    });

    return successHandler(res, "TrendingGateway created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TrendingGatewayGETAPI = async (req, res, next) => {
  try {
    const findData = await TrendingGateway.find()
      .sort({ createdAt: -1 })
      .limit(3);
    return successHandler(res, "TrendingGateway fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TrendingGatewayUPDATEAPI = async (req, res, next) => {
  try {
    let { image1, image2, image3, _id, title, count } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await TrendingGateway.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "TrendingGateway not found", 404));
    }

    await TrendingGateway.findByIdAndUpdate(findData._id, {
      image1,
      image2,
      image3,
      title,
      description: `${count} properties available`,
    });
    return successHandler(res, "TrendingGateway updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TrendingGatewayDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await TrendingGateway.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "TrendingGateway not found", 404));
    }

    await TrendingGateway.findByIdAndDelete(findData._id);
    return successHandler(res, "TrendingGateway deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  TrendingGatewayPOSTAPI,
  TrendingGatewayGETAPI,
  TrendingGatewayUPDATEAPI,
  TrendingGatewayDELETEAPI,
};
