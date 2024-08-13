const mongoose = require("mongoose");

const topDestinationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const TopDestination = mongoose.model("TopDestination", topDestinationSchema);

module.exports = TopDestination;
