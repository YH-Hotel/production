const mongoose = require("mongoose");

const YhHotelsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      trim: true,
      default: false,
    },
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    room_avaliable_count: {
      type: Number,
      required: true,
      trim: true,
    },
    recommended: {
      type: String,
      required: true,
      trim: true,
    },
    guest_rating: {
      type: String,
      required: true,
      trim: true,
    },
    star_category: {
      type: Number,
      required: true,
      trim: true,
    },
    descriptionImages: {
      type: [],
      required: true,
      trim: true,
    },
    description_about: {
      type: String,
      required: true,
      trim: true,
    },
    description_amentities: {
      type: [],
      required: false,
      trim: true,
    },
    description_price_breakup_serviceFee: {
      type: Number,
      required: true,
      trim: true,
    },
    description_price_breakup_taxFee: {
      type: Number,
      required: true,
      trim: true,
    },
    description_nonRefundable: {
      type: Number,
      required: true,
      trim: true,
    },
    description_Refundable: {
      type: Number,
      required: true,
      trim: true,
    },
    description_google_map: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const YHHotels = mongoose.model("YHHotels", YhHotelsSchema);

module.exports = YHHotels;
