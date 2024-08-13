const { successHandler, errorHandler } = require("../../utils/responseHandler");
const TransportService = require("../../model/transportService.model");

const TransportServicePOSTAPI = async (req, res, next) => {
  try {
    let { title, description, image } = req.body;
    if (!title || !description || !image) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await TransportService.create({
      title,
      description,
      image,
    });

    return successHandler(res, "TransportService created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TransportServiceGETAPI = async (req, res, next) => {
  try {
    const findData = await TransportService.find()
      .sort({ createdAt: -1 })
      .limit(4);
    return successHandler(res, "TransportService fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TransportServiceUPDATEAPI = async (req, res, next) => {
  try {
    let { _id, title, description, image } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await TransportService.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "TransportService not found", 404));
    }

    await TransportService.findByIdAndUpdate(findData._id, {
      title,
      description,
      image,
    });
    return successHandler(res, "TransportService updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TransportServiceDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await TransportService.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "TransportService not found", 404));
    }

    await TransportService.findByIdAndDelete(findData._id);
    return successHandler(res, "TransportService deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  TransportServicePOSTAPI,
  TransportServiceGETAPI,
  TransportServiceUPDATEAPI,
  TransportServiceDELETEAPI,
};
