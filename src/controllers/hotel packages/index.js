const { successHandler, errorHandler } = require("../../utils/responseHandler");
const HotelPackage = require("../../model/hotelPackage.model");

const HotelPackagePOSTAPI = async (req, res, next) => {
  try {
    let { img, title, description, price, sub_desc, placeData } = req.body;
    if (!img || !title || !description || !price || !sub_desc || !placeData) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await HotelPackage.create({
      img,
      title,
      description,
      price,
      sub_desc,
      placeData,
    });

    return successHandler(res, "HotelPackage created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelPackageGETAPI = async (req, res, next) => {
  try {
    const findData = await HotelPackage.find().sort({ createdAt: -1 });
    return successHandler(res, "HotelPackage fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelPackageGETByIdAPI = async (req, res, next) => {
  try {
    const findData = await HotelPackage.findOne({ _id: req.query._id });
    return successHandler(res, "HotelPackage fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelPackageUPDATEAPI = async (req, res, next) => {
  try {
    let { _id, img, title, description, price, sub_desc } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await HotelPackage.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "HotelPackage not found", 404));
    }

    await HotelPackage.findByIdAndUpdate(findData._id, {
      img,
      title,
      description,
      price,
      sub_desc
    });
    return successHandler(res, "HotelPackage updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelPackageDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await HotelPackage.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "HotelPackage not found", 404));
    }

    await HotelPackage.findByIdAndDelete(findData._id);
    return successHandler(res, "HotelPackage deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  HotelPackagePOSTAPI,
  HotelPackageGETAPI,
  HotelPackageUPDATEAPI,
  HotelPackageDELETEAPI,
  HotelPackageGETByIdAPI
};
