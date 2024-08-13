const mongoose = require("mongoose");

const PartnersSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Partners = mongoose.model("Partners", PartnersSchema);

module.exports = Partners;
