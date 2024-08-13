const { successHandler, errorHandler } = require("../../utils/responseHandler");
const YhHotelsSchema = require("../../model/yhHotels.model");

const YHHotelsPOSTAPI = async (req, res, next) => {
  try {
    let { type, star, reviews, title, city, country, image, price } = req.body;
    if (
      !type ||
      !star ||
      !reviews ||
      !title ||
      !city ||
      !country ||
      !image ||
      !price
    ) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    reviews = parseInt(reviews);
    price = parseInt(price);
    star = parseInt(star);

    await YhHotelsSchema.create({
      type,
      star,
      reviews,
      title,
      city,
      country,
      image,
      price,
    });
    return successHandler(res, "Hotel listing created successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const YHHotelsGETAPI = async (req, res, next) => {
  try {
    const { type, location } = req.query;

    if (!type) {
      return next(
        errorHandler(res, "Please provide type in query params", 400)
      );
    }

    const query = { type: type.toLowerCase() };

    if (location) {
      query.$or = [
        { city: { $regex: location.toLowerCase(), $options: "i" } },
        { state: { $regex: location.toLowerCase(), $options: "i" } },
        { country: { $regex: location.toLowerCase(), $options: "i" } },
      ];
    }
    const findData = await YhHotelsSchema.find(query).sort({
      createdAt: -1,
    });

    return successHandler(res, "Data fetched successfully", 200, { findData });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const YHHotelsUPDATEAPI = async (req, res, next) => {
  try {
    let { _id, type, star, reviews, title, city, country, image, price } =
      req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter id", 400));
    }

    const findData = await YhHotelsSchema.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Data not found", 404));
    }

    await YhHotelsSchema.findByIdAndUpdate(findData._id, {
      type,
      star,
      reviews,
      title,
      city,
      country,
      image,
      price,
    });
    return next(successHandler(res, "Hotel listing updated successfully", 200));
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const YHHotelsDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter id", 400));
    }

    const findData = await YhHotelsSchema.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Data not found", 404));
    }

    await YhHotelsSchema.findByIdAndDelete(findData._id);
    return successHandler(res, "Data deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  YHHotelsPOSTAPI,
  YHHotelsGETAPI,
  YHHotelsUPDATEAPI,
  YHHotelsDELETEAPI,
};
