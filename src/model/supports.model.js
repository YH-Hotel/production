const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    query: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      default: "Pending",
    }
  },
  { timestamps: true }
);

const Supports = mongoose.model("Support", SupportSchema);

module.exports = Supports;
