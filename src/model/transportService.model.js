const mongoose = require("mongoose");

const TransportServiceSchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const TransportService = mongoose.model(
  "TransportService",
  TransportServiceSchema
);

module.exports = TransportService;
