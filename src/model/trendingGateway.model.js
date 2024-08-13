const mongoose = require("mongoose");

const TrendingGatewaySchema = new mongoose.Schema(
  {
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
    image1: {
      type: String,
      required: true,
      trim: true,
    },
    image2: {
      type: String,
      required: true,
      trim: true,
    },
    image3: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const TrendingGateway = mongoose.model(
  "TrendingGateway",
  TrendingGatewaySchema
);

module.exports = TrendingGateway;
