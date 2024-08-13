const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true }
);

const Social = mongoose.model("Social", SocialSchema);

module.exports = Social;
