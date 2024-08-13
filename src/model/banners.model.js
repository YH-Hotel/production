const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
