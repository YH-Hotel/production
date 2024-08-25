const { successHandler, errorHandler } = require("../../utils/responseHandler");
const HotelListing = require("../../model/hotelListing.model");
const { default: axios } = require("axios");
const https = require("https");
const { constants } = require("crypto");

const agent = new https.Agent({
  secureOptions:
    constants.SSL_OP_LEGACY_SERVER_CONNECT |
    constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
  rejectUnauthorized: false, // Disable certificate validation (not recommended for production)
});

const HotelListingPOSTAPI = async (req, res, next) => {
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

    await HotelListing.create({
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

const HotelListingGETAPI = async (req, res, next) => {
  try {
    let {
      hotelName,
      location,
      price,
      room_avaliable_count,
      recommended,
      guest_rating,
      star_category,
    } = req.query;

    price = price && !isNaN(price) ? parseInt(price) : null;
    room_avaliable_count =
      room_avaliable_count && !isNaN(room_avaliable_count)
        ? parseInt(room_avaliable_count)
        : null;

    let query = {};
    let sortOrder = {};
    // const selectedFields = {
    //   hotelName: 1,
    //   city: 1,
    //   country: 1,
    //   state: 1,
    //   image: 1,
    //   reviews: 1,
    //   price: 1,
    //   room_avaliable_count: 1,
    //   hotel_show: 1,
    //   recommended: 1,
    //   guest_rating: 1,
    //   star_category: 1,
    // };

    if (hotelName) {
      query.hotelName = { $regex: hotelName.toLowerCase(), $options: "i" };
    }

    if (location) {
      query.$or = [
        { city: { $regex: location.toLowerCase(), $options: "i" } },
        { state: { $regex: location.toLowerCase(), $options: "i" } },
        { country: { $regex: location.toLowerCase(), $options: "i" } },
      ];
    }

    if (room_avaliable_count) {
      query.room_avaliable_count = { $gte: room_avaliable_count };
    }

    if (recommended) {
      query.recommended = { $regex: new RegExp(`^${recommended}$`, "i") };
    }

    if (guest_rating) {
      try {
        query.guest_rating = { $in: guest_rating };
      } catch (e) {
        console.log("Error parsing guest_rating", e);
      }
    }

    if (star_category) {
      try {
        query.star_category = { $in: Number(star_category?.split(" ")[0]) };
      } catch (e) {
        console.log("Error parsing star_category", e);
      }
    }

    if (price) {
      if (price.toLowerCase() === "low to high") {
        sortOrder.price = 1;
      } else if (price.toLowerCase() === "high to low") {
        sortOrder.price = -1;
      }
    }

    const findData = await HotelListing.find(query)
      // .select(selectedFields)
      .sort(sortOrder);

    const finalData = findData.filter((hotel) => hotel.hotel_show);

    return successHandler(res, "Hotel listing fetched successfully", 200, {
      findData: finalData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelListingDELETEAPI = async (req, res, next) => {
  try {
    let { _id } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter all fields", 400));
    }
    const findData = await HotelListing.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Hotel listing not found", 404));
    }

    await HotelListing.findByIdAndDelete(findData._id);

    return successHandler(res, "Hotel listing deleted successfully", 200);
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelDescriptionGETAPI = async (req, res, next) => {
  let { _id } = req.query;
  if (!_id) {
    return next(errorHandler(res, "Details not found", 400));
  }
  const findData = await HotelListing.findOne({ _id });
  if (!findData) {
    return next(errorHandler(res, "Incorrect Id", 404));
  }
  return successHandler(res, "Details found successfully", 200, {
    findData,
  });
};

const HotelListingUpdateAPI = async (req, res, next) => {
  try {
    let {
      _id,
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
      descriptionbed,
      descriptionDedicated,
      description_about,
      description_price_breakup_serviceFee,
      description_price_breakup_taxFee,
      description_nonRefundable,
      description_Refundable,
      description_cancellation_before,
      description_cancellation_before_partial,
      description_google_map,
      description_hotel_details,
    } = req.body;
    if (!_id) {
      return next(errorHandler(res, "Please enter Id", 400));
    }

    const findData = await HotelListing.findOne({ _id });
    if (!findData) {
      return next(errorHandler(res, "Hotel listing not found", 404));
    }
    await HotelListing.findByIdAndUpdate(
      findData._id,
      {
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
        descriptionbed,
        descriptionDedicated,
        description_about,
        description_price_breakup_serviceFee,
        description_price_breakup_taxFee,
        description_nonRefundable,
        description_Refundable,
        description_cancellation_before,
        description_cancellation_before_partial,
        description_google_map,
        description_hotel_details,
      },
      { new: true }
    );
    return next(successHandler(res, "Hotel listing updated successfully", 200));
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelListingGETAllAPI = async (req, res, next) => {
  try {
    const findData = await HotelListing.find().sort({ createdAt: -1 });
    return successHandler(res, "Hotel listing fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelListingDescGETAllAPI = async (req, res, next) => {
  try {
    const findData = await HotelListing.findOne({ _id: req.query._id });
    return successHandler(res, "Hotel listing fetched successfully", 200, {
      findData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelData = async (req, res, next) => {
  try {
    let { checkInDate, checkOutDate, noOfRoom, noOfAdt, noOfChd, name } =
      req.query;
    checkInDate = checkInDate.toString();
    checkOutDate = checkOutDate.toString();
    noOfRoom = noOfRoom.toString();
    noOfAdt = noOfAdt.toString();
    noOfChd = noOfChd.toString();
    name = name.toString();

    let payload = {
      id: "-1",
      checkInDate,
      checkOutDate,
      noOfRoom,
      noOfAdt,
      noOfPax: "2",
      noOfChd,
      type: "City",
      affilId: "",
      name: name,
      fullName: name,
    };
    const response = await axios.post(
      "https://www.hotels.irctc.co.in/tourismUser/tourism/hotel/searchhotel",
      { ...payload, limit: 100 },
      { httpsAgent: agent }
    );
    const filterData = response.data.data.hotelDetailsSummary.slice(0, 100);
    return successHandler(res, "Hotel listing fetched successfully", 200, {
      filterData,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

const HotelByID = async (req, res, next) => {
  try {
    let {
      hotelCode,
      checkInDate,
      checkOutDate,
      noOfAdt,
      noOfChd,
      noOfRoom,
      provider,
      fullName,
      name,
    } = req.query;
    hotelCode = hotelCode.toString();
    checkInDate = checkInDate.toString();
    checkOutDate = checkOutDate.toString();
    noOfRoom = noOfRoom.toString();
    noOfAdt = noOfAdt.toString();
    noOfChd = noOfChd.toString();
    provider = provider.toString();
    fullName = fullName.toString();
    name = name.toString();

    let payload = {
      hotelCode,
      checkInDate,
      checkOutDate,
      noOfRoom,
      noOfAdt,
      noOfPax: "2",
      noOfChd,
      type: "Hotel",
      roomTypeId: "",
      hotelStateCode: "",
      passengerStateCode: "",
      provider,
      affilId: "",
      searchKeys: {
        fullName: `${fullName},${fullName}`,
        name,
        type: "Hotel",
      },
    };
    const response = await axios.post(
      "https://www.hotels.irctc.co.in/tourismUser/tourism/hotel/hoteldetails",
      payload,
      { httpsAgent: agent }
    );

    return successHandler(res, "Hotel listing fetched successfully", 200, {
      data: response.data,
    });
  } catch (error) {
    console.log("Error", error);
    return next(errorHandler(res, error.message, 500));
  }
};

module.exports = {
  HotelListingPOSTAPI,
  HotelListingGETAPI,
  HotelListingDELETEAPI,
  HotelDescriptionGETAPI,
  HotelListingUpdateAPI,
  HotelListingGETAllAPI,
  HotelListingDescGETAllAPI,
  HotelData,
  HotelByID
};
