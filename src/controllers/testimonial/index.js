const { successHandler, errorHandler } = require("../../utils/responseHandler");
const Testimonial = require("../../model/testimonial.model");

const TestimonialPOSTAPI = async (req, res, next) => {
  try {
    let { type, title, description, image } = req.body;
    if (!type || !title || !description || !image) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    await Testimonial.create({
      type,
      title,
      description,
      image,
    });

    return successHandler(res, "Testimonial created successfully", 201);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TestimonialGETAPI = async (req, res, next) => {
  try {
    let { type } = req.query;
    const findData = await Testimonial.find({ type })
      .sort({ createdAt: -1 })
      .limit(3);
    return successHandler(res, "Testimonial fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TestimonialUPDATEAPI = async (req, res, next) => {
  try {
    let { url, _id, title, description } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Testimonial.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Testimonial not found", 404));
    }

    await Testimonial.findByIdAndUpdate(findData._id, {
      url,
      title,
      description,
    });
    return successHandler(res, "Testimonial updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const TestimonialDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await Testimonial.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Testimonial not found", 404));
    }

    await Testimonial.findByIdAndDelete(findData._id);
    return successHandler(res, "Testimonial deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  TestimonialPOSTAPI,
  TestimonialGETAPI,
  TestimonialUPDATEAPI,
  TestimonialDELETEAPI,
};
