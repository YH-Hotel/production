const { successHandler, errorHandler } = require("../../utils/responseHandler");
const YhHotelsSchema = require("../../model/yhHotels.model");

const YHHotelsPOSTAPI = async (req, res, next) => {
  try {
    let {
      type,
      hotelName,
      city,
      country,
      state,
      image,
      reviews,
      price,
      room_avaliable_count,
      recommended,
      guest_rating,
      star_category,
      descriptionImages,
      description_about,
      description_amentities,
      description_price_breakup_serviceFee,
      description_price_breakup_taxFee,
      description_nonRefundable,
      description_Refundable,
      description_google_map,
    } = req.body;

    reviews = parseInt(reviews);
    price = parseInt(price);
    star_category = parseInt(star_category);

    await YhHotelsSchema.create({
      type,
      hotelName,
      city,
      country,
      state,
      image,
      reviews,
      price,
      room_avaliable_count,
      recommended,
      guest_rating,
      star_category,
      descriptionImages,
      description_about,
      description_amentities,
      description_price_breakup_serviceFee,
      description_price_breakup_taxFee,
      description_nonRefundable,
      description_Refundable,
      description_google_map,
    });
    return successHandler(res, "Created successfully", 200);
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
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter id", 400));
    }

    const findData = await YhHotelsSchema.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Data not found", 404));
    }

    await YhHotelsSchema.findByIdAndUpdate(findData._id, {
      active: true,
    });
    return next(successHandler(res, "Updated successfully", 200));
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

const getbyId = async (req, res, next) => {
  try {
    let { _id } = req.query;
    if (!_id) {
      return next(errorHandler(res, "Please enter id", 400));
    }

    const findData = await YhHotelsSchema.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Data not found", 404));
    }

    return successHandler(res, "Data fetched successfully", 200, { findData });
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
  getbyId
};
