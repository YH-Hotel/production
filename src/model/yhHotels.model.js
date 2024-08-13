const mongoose = require("mongoose");

const YhHotelsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    star: {
      type: Number,
      required: true,
      trim: true,
    },
    reviews: {
      type: Number,
      required: true,
      trim: true,
    },
    title: {
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
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const YHHotels = mongoose.model("YHHotels", YhHotelsSchema);

module.exports = YHHotels;
