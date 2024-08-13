const { successHandler, errorHandler } = require("../../utils/responseHandler");
const HotelWithDeal = require("../../model/hoteslwithDeal.model");

const HotelWithDealPOSTAPI = async (req, res, next) => {
  try {
    let {
      hotelName,
      city,
      country,
      state,
      image,
      reviews,
      price,
      room_avaliable_count,
      hotel_show,
      recommended,
      guest_rating,
      star_category,
      descriptionImages,
      descriptionbed,
      descriptionDedicated,
      description_reviews_data,
      description_about,
      description_amentities,
      description_price_breakup_serviceFee,
      description_price_breakup_taxFee,
      description_nonRefundable,
      description_Refundable,
      description_cancellation_before,
      description_cancellation_before_partial,
      description_google_map,
      description_hotel_details,
    } = req.body;
    if (
      !hotelName ||
      !city ||
      !country ||
      !state ||
      !image ||
      !reviews ||
      !price ||
      !room_avaliable_count ||
      !hotel_show ||
      !recommended ||
      !guest_rating ||
      !star_category ||
      !descriptionImages ||
      !descriptionbed ||
      !descriptionDedicated ||
      !description_reviews_data ||
      !description_about ||
      !description_amentities ||
      !description_price_breakup_serviceFee ||
      !description_price_breakup_taxFee ||
      !description_nonRefundable ||
      !description_Refundable ||
      !description_cancellation_before ||
      !description_cancellation_before_partial ||
      !description_google_map ||
      !description_hotel_details
    ) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    reviews = parseInt(reviews);
    price = parseInt(price);
    room_avaliable_count = parseInt(room_avaliable_count);
    star_category = parseInt(star_category);
    description_price_breakup_serviceFee = parseInt(
      description_price_breakup_serviceFee
    );
    description_price_breakup_taxFee = parseInt(
      description_price_breakup_taxFee
    );
    description_nonRefundable = parseInt(description_nonRefundable);
    description_Refundable = parseInt(description_Refundable);
    descriptionbed = parseInt(descriptionbed);

    await HotelWithDeal.create({
      hotelName,
      city,
      country,
      state,
      image,
      reviews,
      price,
      room_avaliable_count,
      hotel_show,
      recommended,
      guest_rating,
      star_category,
      descriptionImages,
      descriptionbed,
      descriptionDedicated,
      description_reviews_data,
      description_about,
      description_amentities,
      description_price_breakup_serviceFee,
      description_price_breakup_taxFee,
      description_nonRefundable,
      description_Refundable,
      description_cancellation_before,
      description_cancellation_before_partial,
      description_google_map,
      description_hotel_details,
    });
    return successHandler(res, "Hotel listing created successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelWithDealGETAPI = async (req, res, next) => {
  try {
    const findData = await HotelWithDeal.find()
      .sort({ createdAt: -1 })
      .limit(8);
    return successHandler(res, "HotelWithDeal fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelWithDealGETByIDAPI = async (req, res, next) => {
  try {
    const findData = await HotelWithDeal.findOne({ _id: req.query._id });
    return successHandler(res, "HotelWithDeal fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelWithDealUPDATEAPI = async (req, res, next) => {
  try {
    let { img, stars, reviews_count, title, city, country, price, _id } =
      req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await HotelWithDeal.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "HotelWithDeal not found", 404));
    }

    await HotelWithDeal.findByIdAndUpdate(findData._id, {
      img,
      stars,
      reviews_count,
      title,
      city,
      country,
      price,
    });
    return successHandler(res, "HotelWithDeal updated successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelWithDealDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }

    const findData = await HotelWithDeal.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "HotelWithDeal not found", 404));
    }

    await HotelWithDeal.findByIdAndDelete(findData._id);
    return successHandler(res, "HotelWithDeal deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  HotelWithDealPOSTAPI,
  HotelWithDealGETAPI,
  HotelWithDealUPDATEAPI,
  HotelWithDealDELETEAPI,
  HotelWithDealGETByIDAPI,
};
