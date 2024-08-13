const { successHandler, errorHandler } = require("../../utils/responseHandler");
const MyService = require("../../model/myservice.model");

const MyServicePOSTAPI = async (req, res, next) => {
  try {
    let {
      title,
      img,
      sub_img1,
      sub_img2,
      description,
      provide_desc,
      service_desc,
    } = req.body;
    if (
      !title ||
      !img ||
      !description ||
      !provide_desc ||
      !service_desc
    ) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await MyService.create({
      title,
      img,
      sub_img1,
      sub_img2,
      description,
      provide_desc,
      service_desc,
    });

    return successHandler(res, "MyService created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const MyServiceGETAPI = async (req, res, next) => {
  try {
    const findData = await MyService.find().sort({ createdAt: -1 });
    return successHandler(res, "MyService fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const MyServiceGETBYIDAPI = async (req, res, next) => {
  try {
    let { _id } = req.query;
    const findData = await MyService.findOne({ _id });
    return successHandler(res, "MyService fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const MyServiceUPDATEAPI = async (req, res, next) => {
  try {
    let {
      _id,
      title,
      img,
      sub_img1,
      sub_img2,
      description,
      provide_desc,
      service_desc,
    } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await MyService.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "MyService not found", 404));
    }

    await MyService.findByIdAndUpdate(findData._id, {
      title,
      img,
      sub_img1,
      sub_img2,
      description,
      provide_desc,
      service_desc,
    });
    return successHandler(res, "MyService updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const MyServiceDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await MyService.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "MyService not found", 404));
    }

    await MyService.findByIdAndDelete(findData._id);
    return successHandler(res, "MyService deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  MyServicePOSTAPI,
  MyServiceGETAPI,
  MyServiceUPDATEAPI,
  MyServiceDELETEAPI,
  MyServiceGETBYIDAPI,
};
