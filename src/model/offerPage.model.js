const mongoose = require("mongoose");

const OffersSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    coupen_code: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    validity: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Offers = mongoose.model("Offers", OffersSchema);

module.exports = Offers;
