const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Gallery = require("../../model/gallery.model");

const GalleryPOSTAPI = async (req, res, next) => {
  try {
    let { title, img, description } = req.body;
    if (!title || !img || !description) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await Gallery.create({
      title,
      img,
      description,
    });

    return successHandler(res, "Gallery created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const GalleryGETAPI = async (req, res, next) => {
  try {
    const findData = await Gallery.find();
    return successHandler(res, "Gallery fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const GalleryDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Gallery.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Gallery not found", 404));
    }

    await Gallery.findByIdAndDelete(findData._id);
    return successHandler(res, "Gallery deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  GalleryPOSTAPI,
  GalleryGETAPI,
  GalleryDELETEAPI,
};
