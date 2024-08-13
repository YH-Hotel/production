const mongoose = require("mongoose");

const recentSearchSchema = new mongoose.Schema(
  {
    arrival: {
      type: String,
      required: true,
      trim: true,
    },
    departure: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const RecentSearch = mongoose.model("RecentSearch", recentSearchSchema);

module.exports = RecentSearch;
