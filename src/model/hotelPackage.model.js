const mongoose = require("mongoose");

const HotelPackageSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    sub_desc: {
      type: String,
      required: true,
      trim: true,
    },
    placeData: {
      type: [],
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const HotelPackage = mongoose.model("HotelPackage", HotelPackageSchema);

module.exports = HotelPackage;
